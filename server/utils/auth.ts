import crypto from 'crypto';
import { storage } from '../storage';

// Secret key for JWT signing - in production, this should be an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'SECURE_JWT_SECRET_CHANGE_THIS_IN_PRODUCTION';

// JWT token expiration time (30 days in seconds)
const JWT_EXPIRATION = 30 * 24 * 60 * 60;

// Generate a JWT token
export function generateJWT(payload: Record<string, any>): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + JWT_EXPIRATION;

  // Add standard JWT claims
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: expiresAt,
    jti: crypto.randomBytes(16).toString('hex')
  };

  // Base64 encode the header and payload
  const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64url');
  const payloadBase64 = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');

  // Create the signature
  const signature = crypto.createHmac('sha256', JWT_SECRET)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest('base64url');

  // Return the complete JWT
  return `${headerBase64}.${payloadBase64}.${signature}`;
}

// Verify a JWT token
export function verifyJWT(token: string): Record<string, any> | null {
  try {
    const [headerBase64, payloadBase64, signatureBase64] = token.split('.');

    // Verify the signature
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest('base64url');

    if (expectedSignature !== signatureBase64) {
      return null; // Invalid signature
    }

    // Decode the payload
    const payloadString = Buffer.from(payloadBase64, 'base64url').toString();
    const payload = JSON.parse(payloadString);

    // Check if token has expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }

    return payload;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

// Create a session and return the token
export async function createSession(
  userId: string,
  deviceFingerprint?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  // Create the session in database
  const session = await storage.createSession(
    userId,
    deviceFingerprint,
    ipAddress,
    userAgent
  );

  // Generate a JWT with session info
  const token = generateJWT({
    sub: userId,
    sessionId: session.sessionId,
    deviceFingerprint
  });

  return token;
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
