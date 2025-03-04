import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import axios from "axios";
import * as FingerprintJS from '@fingerprintjs/fingerprintjs';

// Define user types and interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  requestLoginToken: (email: string) => Promise<{ success: boolean; message?: string; expiresAt?: Date }>;
  validateLoginToken: (email: string, token: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkPermission: (requiredRole: string) => boolean;
}

// Define role hierarchy for permission checks
const ROLE_HIERARCHY: Record<string, string[]> = {
  admin: ["admin", "manager", "rep", "user"],  // Admin can access all roles
  manager: ["manager", "rep", "user"],         // Manager can access manager, rep and user roles
  rep: ["rep", "user"],                        // Rep can access rep and user roles
  user: ["user"]                               // User can only access user role
};

// Initialize the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get device fingerprint
const getDeviceFingerprint = async (): Promise<string> => {
  try {
    // Load FingerprintJS
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;

    // Get the visitor identifier
    const result = await fp.get();

    return result.visitorId;
  } catch (error) {
    console.error("Error generating device fingerprint:", error);
    // Return a fallback hash if fingerprinting fails
    return Math.random().toString(36).substring(2);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string | null>(null);

  // Initialize deviceFingerprint
  useEffect(() => {
    const initializeFingerprint = async () => {
      const fingerprint = await getDeviceFingerprint();
      setDeviceFingerprint(fingerprint);

      // Store fingerprint in localStorage for consistency
      localStorage.setItem("sb_device_fingerprint", fingerprint);
    };

    // Try to get fingerprint from localStorage first for consistency
    const savedFingerprint = localStorage.getItem("sb_device_fingerprint");
    if (savedFingerprint) {
      setDeviceFingerprint(savedFingerprint);
    } else {
      initializeFingerprint();
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for session token in localStorage
        const token = localStorage.getItem("sb_session_token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Set up axios headers
        const headers: Record<string, string> = {
          'Authorization': `Bearer ${token}`
        };

        if (deviceFingerprint) {
          headers['X-Device-Fingerprint'] = deviceFingerprint;
        }

        // Validate session with backend
        const response = await axios.get('/api/auth/session', { headers });

        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          setSessionToken(token);
        } else {
          // Clear invalid session
          localStorage.removeItem("sb_session_token");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        // Clear invalid session
        localStorage.removeItem("sb_session_token");
      } finally {
        setIsLoading(false);
      }
    };

    // Only check auth if fingerprint is available
    if (deviceFingerprint) {
      checkAuth();
    }
  }, [deviceFingerprint]);

  // Request a login token
  const requestLoginToken = async (email: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/auth/request-token', {
        email: email.toLowerCase().trim(),
        deviceFingerprint,
        userAgent: navigator.userAgent
      });

      if (response.data.success) {
        return { 
          success: true, 
          message: response.data.message,
          expiresAt: new Date(response.data.expiresAt)
        };
      } else {
        return { 
          success: false, 
          message: response.data.error 
        };
      }
    } catch (error: any) {
      console.error("Error requesting login token:", error);
      return { 
        success: false, 
        message: error.response?.data?.error || "Failed to request login token" 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Validate a login token
  const validateLoginToken = async (email: string, token: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/auth/validate-token', {
        email: email.toLowerCase().trim(),
        token,
        deviceFingerprint
      });

      if (response.data.success) {
        // Save user info
        setUser(response.data.user);

        // Save session token
        const token = response.data.sessionToken;
        setSessionToken(token);
        localStorage.setItem("sb_session_token", token);

        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.data.error 
        };
      }
    } catch (error: any) {
      console.error("Error validating login token:", error);
      return { 
        success: false, 
        message: error.response?.data?.error || "Invalid or expired token" 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);

      if (sessionToken) {
        // Call logout API to invalidate session
        await axios.post('/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        });
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // Clear local state regardless of API success
      setUser(null);
      setSessionToken(null);
      localStorage.removeItem("sb_session_token");
      setIsLoading(false);
      setLocation("/login");
    }
  };

  // Check if user has permission for a specific role
  const checkPermission = (requiredRole: string): boolean => {
    if (!user) return false;

    const userRole = user.role.toLowerCase();
    const allowedRoles = ROLE_HIERARCHY[userRole] || [];

    return allowedRoles.includes(requiredRole.toLowerCase());
  };

  // Check if user is an admin
  const isAdmin = !!user && user.role.toLowerCase() === 'admin';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        isAdmin,
        requestLoginToken,
        validateLoginToken,
        logout,
        checkPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}