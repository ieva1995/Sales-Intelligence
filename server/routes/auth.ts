import express from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import crypto from 'crypto';
import { createSession, generateJWT, verifyJWT } from '../utils/auth';

const router = express.Router();

// Schema for request token payload
const requestTokenSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  deviceFingerprint: z.string().optional(),
  userAgent: z.string().optional(),
});

// Schema for validate token payload
const validateTokenSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  token: z.string().min(6, "Token must be at least 6 characters"),
  deviceFingerprint: z.string().optional(),
});

// Helper to get client IP
const getClientIp = (req: express.Request): string => {
  return req.headers['x-forwarded-for'] as string || 
         req.socket.remoteAddress || 
         'unknown';
};

// Helper to calculate request checksum for tampering detection
const calculateRequestChecksum = (payload: any, timestamp: number, secret: string): string => {
  const data = JSON.stringify(payload) + timestamp + secret;
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Request a login token
router.post('/api/auth/request-token', async (req, res) => {
  try {
    // Validate the request body
    const result = requestTokenSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid request data",
        details: result.error.flatten()
      });
    }

    const { email, deviceFingerprint, userAgent } = result.data;
    const ipAddress = getClientIp(req);

    // Find user by email
    const user = await storage.getUserByEmail(email);
    if (!user) {
      // For security reasons, we don't reveal that the user doesn't exist
      // Just pretend we sent the token
      console.log(`Token requested for non-existent user: ${email}`);
      return res.json({
        success: true,
        message: "If the email exists, a token has been sent",
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
      });
    }

    // Check if the user account is active
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        error: "Account is not active",
        code: "ACCOUNT_INACTIVE"
      });
    }

    // Generate token
    const { token, expiresAt } = await storage.generateLoginToken(
      user.id,
      deviceFingerprint,
      ipAddress
    );

    // In a real application, you would send the token via email
    // For our demo, we'll return it directly (NOT SECURE for production)
    console.log(`Token for ${email}: ${token}`);

    return res.json({
      success: true,
      message: "Login token has been sent",
      // For demo purposes only - IN PRODUCTION THIS SHOULD NEVER BE RETURNED
      // Included for testing convenience only
      _devToken: token,
      expiresAt
    });
  } catch (error) {
    console.error('Error requesting token:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to process request"
    });
  }
});

// Validate a login token and create a session
router.post('/api/auth/validate-token', async (req, res) => {
  try {
    // Validate the request body
    const result = validateTokenSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid request data",
        details: result.error.flatten()
      });
    }

    const { email, token, deviceFingerprint } = result.data;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    // Verify token
    const user = await storage.validateLoginToken(token, deviceFingerprint);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token"
      });
    }

    // Double check email matches (extra security)
    if (user.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(401).json({
        success: false,
        error: "Email mismatch with token"
      });
    }

    // Create session
    const session = await storage.createSession(
      user.id,
      deviceFingerprint,
      ipAddress,
      userAgent
    );

    // In a real application, you might set a secure, HttpOnly cookie here.
    // For our demo, we'll return the token in the response.
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      sessionToken: session.token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to process login"
    });
  }
});

// Get current user session
router.get('/api/auth/session', async (req, res) => {
  try {
    // Get session token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "No session token provided"
      });
    }

    const token = authHeader.substring(7);
    const deviceFingerprint = req.headers['x-device-fingerprint'] as string | undefined;

    // Validate session
    const user = await storage.validateSession(token, deviceFingerprint);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired session"
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    console.error('Error getting session:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to get session"
    });
  }
});

// Logout (revoke session)
router.post('/api/auth/logout', async (req, res) => {
  try {
    // Get session token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: "No session token provided"
      });
    }

    const token = authHeader.substring(7);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Delete the session
    await storage.revokeAllUserSessions(tokenHash);

    return res.json({
      success: true,
      message: "Successfully logged out"
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to logout"
    });
  }
});

export default router;
