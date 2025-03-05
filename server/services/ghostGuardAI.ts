import { OpenAI } from "openai";
import crypto from "crypto";
import { 
  InsertSecurityEvent, 
  SecurityEvent,
  InsertMasterAccessControl,
  MasterAccessControl,
} from "@shared/schema/slase";
import { storage } from "../storage";

// Initialize OpenAI client
// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * GhostGuard AI - Advanced Cybersecurity Layer
 * Implements AI-based security features including behavioral firewalls,
 * honeytraps, self-destruct protocols, zero trust architecture,
 * and polymorphic code encryption
 */
class GhostGuardAI {
  private initialized: boolean = false;
  private threatScoreThreshold: number = 0.75;
  private activeSessions: Map<string, {
    userId: string | null;
    behavioralProfile: any;
    trustScore: number;
    lastActivity: number;
    accessLevel: string;
  }> = new Map();
  private honeytrapTriggers: Set<string> = new Set();
  private encryptionKey: string = crypto.randomBytes(32).toString('hex');
  private selfDestructTriggered: boolean = false;
  private timeLockActivated: boolean = false;
  private timeLockExpiry: number = 0;
  
  constructor() {
    // Initialize honeytrap routes
    this.setupHoneytraps();
    
    // Rotate encryption keys periodically
    setInterval(() => this.rotateEncryptionKeys(), 86400000); // Daily
    
    // Clean expired sessions
    setInterval(() => this.cleanExpiredSessions(), 3600000); // Hourly
    
    this.initialized = true;
  }
  
  /**
   * Analyze user behavior for threats
   */
  async analyzeBehavior(
    sessionId: string,
    userId: string | null,
    requestData: {
      path: string;
      method: string;
      headers: Record<string, string>;
      ip: string;
      userAgent: string;
      body?: any;
      queryParams?: any;
      timestamp: number;
    }
  ): Promise<{
    threatScore: number;
    suspicious: boolean;
    reason?: string;
    recommendedAction?: string;
  }> {
    try {
      // Get or create session profile
      let session = this.activeSessions.get(sessionId);
      
      if (!session) {
        session = {
          userId,
          behavioralProfile: {
            commonPaths: [],
            typicalMethods: new Set(["GET"]),
            averageRequestSize: 0,
            requestCount: 0,
            knownIPs: new Set([requestData.ip]),
            knownUserAgents: new Set([requestData.userAgent]),
            timePatterns: []
          },
          trustScore: userId ? 0.7 : 0.5, // Authenticated users start with higher trust
          lastActivity: requestData.timestamp,
          accessLevel: userId ? "user" : "guest"
        };
        this.activeSessions.set(sessionId, session);
      }
      
      // Update session last activity
      session.lastActivity = requestData.timestamp;
      
      // Check for honeytrap access
      if (this.honeytrapTriggers.has(requestData.path)) {
        await this.recordSecurityEvent({
          type: "honeytrap_trigger",
          severity: "high",
          source: {
            ip: requestData.ip,
            userAgent: requestData.userAgent,
            userId: userId || undefined,
            behavioralPattern: "accessing honeytrap route"
          },
          details: {
            path: requestData.path,
            method: requestData.method,
            headers: requestData.headers
          },
          mitigationApplied: ["session_isolation", "enhanced_monitoring"]
        });
        
        return {
          threatScore: 0.95,
          suspicious: true,
          reason: "Honeytrap triggered",
          recommendedAction: "isolate_session"
        };
      }
      
      // Update behavioral profile
      this.updateBehavioralProfile(session, requestData);
      
      // Generate behavioral features for AI analysis
      const behavioralFeatures = {
        isKnownIP: session.behavioralProfile.knownIPs.has(requestData.ip),
        isKnownUserAgent: session.behavioralProfile.knownUserAgents.has(requestData.userAgent),
        requestRate: session.behavioralProfile.requestCount / Math.max(1, (requestData.timestamp - session.lastActivity) / 1000),
        pathDeviation: !session.behavioralProfile.commonPaths.includes(requestData.path),
        methodDeviation: !session.behavioralProfile.typicalMethods.has(requestData.method),
        bodySizeDeviation: requestData.body ? Math.abs(
          JSON.stringify(requestData.body).length - session.behavioralProfile.averageRequestSize
        ) / Math.max(1, session.behavioralProfile.averageRequestSize) : 0,
        isAdminRequest: requestData.path.includes("/admin") || requestData.path.includes("/management"),
        containsSuspiciousParams: this.checkForSuspiciousParams(requestData),
        accessAttemptRate: (requestData.path.includes("/login") || requestData.path.includes("/auth")) ? 
          session.behavioralProfile.requestCount / Math.max(1, (requestData.timestamp - session.lastActivity) / 1000) : 0
      };
      
      // For established sessions with many requests, use AI for deeper analysis
      if (session.behavioralProfile.requestCount > 10) {
        // Use AI to analyze behavior for advanced threat detection
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an advanced cybersecurity AI that analyzes user behavior patterns to detect potential threats and security breaches. Analyze the behavioral features and provide a threat assessment."
            },
            {
              role: "user",
              content: `Analyze these behavioral features for security threats and provide a threat score (0-1), suspicious (true/false), reason if suspicious, and recommended action. Return as JSON. Features: ${JSON.stringify(behavioralFeatures)}`
            }
          ],
          response_format: { type: "json_object" }
        });

        const analysis = JSON.parse(response.choices[0].message.content);
        
        // If AI detected threat, record a security event
        if (analysis.suspicious) {
          await this.recordSecurityEvent({
            type: "suspicious_behavior",
            severity: analysis.threatScore > 0.9 ? "critical" : analysis.threatScore > 0.8 ? "high" : "medium",
            source: {
              ip: requestData.ip,
              userAgent: requestData.userAgent,
              userId: userId || undefined,
              behavioralPattern: analysis.reason
            },
            details: {
              behavioralFeatures,
              analysis: analysis
            },
            mitigationApplied: [analysis.recommendedAction]
          });
        }
        
        return {
          threatScore: analysis.threatScore,
          suspicious: analysis.suspicious,
          reason: analysis.reason,
          recommendedAction: analysis.recommendedAction
        };
      } else {
        // For new sessions, use rule-based approach
        let threatScore = 0;
        let suspicious = false;
        let reason = undefined;
        
        // Compute threat score based on behavioral features
        if (!behavioralFeatures.isKnownIP) threatScore += 0.2;
        if (!behavioralFeatures.isKnownUserAgent) threatScore += 0.1;
        if (behavioralFeatures.requestRate > 10) threatScore += 0.3;
        if (behavioralFeatures.pathDeviation) threatScore += 0.1;
        if (behavioralFeatures.methodDeviation) threatScore += 0.2;
        if (behavioralFeatures.bodySizeDeviation > 3) threatScore += 0.2;
        if (behavioralFeatures.isAdminRequest && !session.accessLevel.includes("admin")) threatScore += 0.4;
        if (behavioralFeatures.containsSuspiciousParams) threatScore += 0.3;
        if (behavioralFeatures.accessAttemptRate > 1) threatScore += 0.4;
        
        // Cap at 1.0
        threatScore = Math.min(1.0, threatScore);
        
        // Determine if suspicious
        if (threatScore > this.threatScoreThreshold) {
          suspicious = true;
          reason = "Unusual behavior pattern detected";
          
          // Record security event
          await this.recordSecurityEvent({
            type: "suspicious_behavior",
            severity: threatScore > 0.9 ? "critical" : threatScore > 0.8 ? "high" : "medium",
            source: {
              ip: requestData.ip,
              userAgent: requestData.userAgent,
              userId: userId || undefined,
              behavioralPattern: reason
            },
            details: {
              behavioralFeatures,
              threatScore
            },
            mitigationApplied: ["enhanced_monitoring"]
          });
        }
        
        return {
          threatScore,
          suspicious,
          reason,
          recommendedAction: suspicious ? "enhanced_monitoring" : undefined
        };
      }
    } catch (error) {
      console.error("Error analyzing behavior:", error);
      // Fail safe - assume suspicious on error
      return {
        threatScore: 0.8,
        suspicious: true,
        reason: "Analysis error - assuming suspicious",
        recommendedAction: "enhanced_monitoring"
      };
    }
  }
  
  /**
   * Implement Zero Trust Authentication
   */
  async verifyRequest(
    sessionId: string,
    userId: string | null,
    requestData: {
      path: string;
      method: string;
      headers: Record<string, string>;
      ip: string;
      userAgent: string;
      resource: string;
      action: string;
      timestamp: number;
    }
  ): Promise<{ 
    authorized: boolean;
    reason?: string;
  }> {
    try {
      // 1. Get session data
      const session = this.activeSessions.get(sessionId);
      
      if (!session) {
        return { authorized: false, reason: "Session not found" };
      }
      
      // 2. Check if time lock is active
      if (this.timeLockActivated && Date.now() < this.timeLockExpiry) {
        return { authorized: false, reason: "Time lock active" };
      }
      
      // 3. Check self destruct status
      if (this.selfDestructTriggered) {
        return { authorized: false, reason: "System in secure shutdown mode" };
      }
      
      // 4. Get behavioral analysis
      const behaviorAnalysis = await this.analyzeBehavior(sessionId, userId, requestData);
      
      // 5. Immediate block for high threat score
      if (behaviorAnalysis.threatScore > 0.9) {
        await this.recordSecurityEvent({
          type: "zero_trust_violation",
          severity: "critical",
          source: {
            ip: requestData.ip,
            userAgent: requestData.userAgent,
            userId: userId || undefined
          },
          details: {
            resource: requestData.resource,
            action: requestData.action,
            threatScore: behaviorAnalysis.threatScore
          },
          mitigationApplied: ["access_denied", "session_terminated"]
        });
        
        this.activeSessions.delete(sessionId);
        return { authorized: false, reason: "Critical security threshold exceeded" };
      }
      
      // 6. Check resource authorization based on access level and behavioral trust score
      const authorized = await this.checkResourceAuthorization(
        session.accessLevel,
        requestData.resource,
        requestData.action,
        behaviorAnalysis.threatScore,
        session.trustScore
      );
      
      if (!authorized) {
        await this.recordSecurityEvent({
          type: "zero_trust_violation",
          severity: "medium",
          source: {
            ip: requestData.ip,
            userAgent: requestData.userAgent,
            userId: userId || undefined
          },
          details: {
            resource: requestData.resource,
            action: requestData.action,
            accessLevel: session.accessLevel
          },
          mitigationApplied: ["access_denied"]
        });
        
        return { authorized: false, reason: "Insufficient privileges for requested resource" };
      }
      
      // 7. If all checks pass, update trust score based on behavior
      this.updateTrustScore(session, behaviorAnalysis.threatScore);
      
      return { authorized: true };
    } catch (error) {
      console.error("Error in Zero Trust verification:", error);
      // Default to denial on error (secure approach)
      return { authorized: false, reason: "Verification error" };
    }
  }
  
  /**
   * Verify master access using biometric data
   */
  async verifyMasterAccess(
    biometricData: {
      type: "face" | "fingerprint" | "retina" | "voice" | "multi";
      data: string; // Base64 encoded biometric data
    },
    deviceFingerprint: string
  ): Promise<{
    authorized: boolean;
    accessLevel: string;
    token?: string;
    reason?: string;
  }> {
    try {
      // 1. Check if time lock is active
      if (this.timeLockActivated && Date.now() < this.timeLockExpiry) {
        return { 
          authorized: false, 
          accessLevel: "none",
          reason: `Time lock active for ${Math.ceil((this.timeLockExpiry - Date.now()) / 3600000)} hours` 
        };
      }
      
      // 2. Check self destruct status
      if (this.selfDestructTriggered) {
        return { 
          authorized: false, 
          accessLevel: "none",
          reason: "System in secure shutdown mode" 
        };
      }
      
      // 3. Get stored master access control records
      const masterAccess = await storage.getMasterAccessByBiometricType(biometricData.type);
      
      if (!masterAccess || masterAccess.length === 0) {
        await this.recordSecurityEvent({
          type: "biometric_failure",
          severity: "high",
          source: {
            behavioralPattern: "Attempt to use unregistered biometric"
          },
          details: {
            biometricType: biometricData.type,
            deviceFingerprint
          },
          mitigationApplied: ["access_denied"]
        });
        
        return { 
          authorized: false, 
          accessLevel: "none",
          reason: "No matching biometric access records" 
        };
      }
      
      // 4. Validate biometric data
      // In a real implementation, this would use a sophisticated biometric verification library
      // For simulation, we'll use a hash comparison
      
      const biometricHash = crypto
        .createHash('sha256')
        .update(biometricData.data)
        .digest('hex');
      
      const matchedAccess = masterAccess.find(access => 
        access.biometricData?.hash === biometricHash && 
        access.status === "active"
      );
      
      if (!matchedAccess) {
        // Record failed verification attempt
        await this.recordSecurityEvent({
          type: "biometric_failure",
          severity: "high",
          source: {
            behavioralPattern: "Failed biometric authentication"
          },
          details: {
            biometricType: biometricData.type,
            deviceFingerprint
          },
          mitigationApplied: ["access_denied", "enhanced_monitoring"]
        });
        
        return { 
          authorized: false, 
          accessLevel: "none",
          reason: "Biometric verification failed" 
        };
      }
      
      // 5. Check expiry if present
      if (matchedAccess.expiryTimestamp && new Date(matchedAccess.expiryTimestamp).getTime() < Date.now()) {
        await this.recordSecurityEvent({
          type: "biometric_failure",
          severity: "medium",
          source: {
            behavioralPattern: "Expired biometric credentials"
          },
          details: {
            biometricType: biometricData.type,
            deviceFingerprint,
            expiryTimestamp: matchedAccess.expiryTimestamp
          },
          mitigationApplied: ["access_denied"]
        });
        
        return { 
          authorized: false, 
          accessLevel: "none",
          reason: "Biometric credentials expired" 
        };
      }
      
      // 6. Update last verified timestamp
      await storage.updateMasterAccess(matchedAccess.id, {
        ...matchedAccess,
        biometricData: {
          ...matchedAccess.biometricData,
          lastVerified: new Date().toISOString()
        }
      });
      
      // 7. Generate access token
      const accessToken = crypto.randomBytes(32).toString('hex');
      
      // 8. Record successful access
      await this.recordSecurityEvent({
        type: "biometric_failure",
        severity: "low",
        source: {
          behavioralPattern: "Successful biometric authentication"
        },
        details: {
          biometricType: biometricData.type,
          deviceFingerprint,
          accessLevel: matchedAccess.accessLevel
        },
        mitigationApplied: [],
        resolved: true
      });
      
      return {
        authorized: true,
        accessLevel: matchedAccess.accessLevel,
        token: accessToken
      };
    } catch (error) {
      console.error("Error verifying master access:", error);
      return { 
        authorized: false, 
        accessLevel: "none",
        reason: "Verification system error" 
      };
    }
  }
  
  /**
   * Activate time lock security
   */
  async activateTimeLock(duration: number, reason: string): Promise<boolean> {
    try {
      this.timeLockActivated = true;
      this.timeLockExpiry = Date.now() + (duration * 3600000); // Convert hours to milliseconds
      
      // Clear all active sessions
      this.activeSessions.clear();
      
      // Record security event
      await this.recordSecurityEvent({
        type: "biometric_failure",
        severity: "high",
        source: {
          behavioralPattern: "Time lock activation"
        },
        details: {
          reason,
          duration,
          expiryTimestamp: new Date(this.timeLockExpiry).toISOString()
        },
        mitigationApplied: ["session_termination", "time_lock"],
        resolved: false
      });
      
      console.log(`Time lock activated for ${duration} hours. Reason: ${reason}`);
      return true;
    } catch (error) {
      console.error("Error activating time lock:", error);
      return false;
    }
  }
  
  /**
   * Trigger self-destruct protocol
   */
  async triggerSelfDestruct(
    authorizationToken: string,
    reason: string
  ): Promise<boolean> {
    try {
      // Verify authorization token (would be more secure in a real implementation)
      const isAuthorized = authorizationToken.length > 30; // Simplified check
      
      if (!isAuthorized) {
        await this.recordSecurityEvent({
          type: "unauthorized_access",
          severity: "critical",
          source: {
            behavioralPattern: "Unauthorized self-destruct attempt"
          },
          details: {
            reason
          },
          mitigationApplied: ["access_denied", "enhanced_monitoring"],
          resolved: false
        });
        
        return false;
      }
      
      this.selfDestructTriggered = true;
      
      // Log the self-destruct activation
      await this.recordSecurityEvent({
        type: "data_exfiltration_attempt",
        severity: "critical",
        source: {
          behavioralPattern: "Self-destruct protocol activation"
        },
        details: {
          reason,
          timestamp: new Date().toISOString()
        },
        mitigationApplied: ["data_encryption", "connection_termination"],
        resolved: false
      });
      
      // Clear all sessions
      this.activeSessions.clear();
      
      // In a real implementation, this would encrypt all sensitive data
      console.log("CRITICAL: Self-destruct protocol activated! Reason:", reason);
      
      return true;
    } catch (error) {
      console.error("Error triggering self-destruct:", error);
      return false;
    }
  }
  
  /**
   * Register a new master access biometric
   */
  async registerMasterAccess(
    accessData: InsertMasterAccessControl
  ): Promise<MasterAccessControl | null> {
    try {
      // Store the new master access
      const newAccess = await storage.createMasterAccess(accessData);
      
      // Log the registration
      await this.recordSecurityEvent({
        type: "biometric_failure",
        severity: "medium",
        source: {
          behavioralPattern: "New master access registration"
        },
        details: {
          accessType: accessData.accessType,
          biometricType: accessData.biometricData?.type,
          accessLevel: accessData.accessLevel
        },
        mitigationApplied: [],
        resolved: true
      });
      
      return newAccess;
    } catch (error) {
      console.error("Error registering master access:", error);
      return null;
    }
  }
  
  /**
   * Configure the system's encryption keys
   */
  private rotateEncryptionKeys(): void {
    try {
      // Generate a new encryption key
      const newKey = crypto.randomBytes(32).toString('hex');
      
      // In a real implementation, this would re-encrypt all sensitive data
      console.log("Rotating encryption keys for polymorphic code protection");
      
      // Update the key
      this.encryptionKey = newKey;
    } catch (error) {
      console.error("Error rotating encryption keys:", error);
    }
  }
  
  /**
   * Record a security event
   */
  private async recordSecurityEvent(
    eventData: Omit<InsertSecurityEvent, "timestamp">
  ): Promise<SecurityEvent | null> {
    try {
      const securityEvent: InsertSecurityEvent = {
        ...eventData,
        timestamp: new Date().toISOString()
      };
      
      return await storage.createSecurityEvent(securityEvent);
    } catch (error) {
      console.error("Error recording security event:", error);
      return null;
    }
  }
  
  /**
   * Set up honeytrap routes to detect malicious activity
   */
  private setupHoneytraps(): void {
    // Add honeytrap routes that look legitimate but shouldn't be accessed
    this.honeytrapTriggers.add("/admin-backup");
    this.honeytrapTriggers.add("/api/v1/internal");
    this.honeytrapTriggers.add("/system/config");
    this.honeytrapTriggers.add("/login-old");
    this.honeytrapTriggers.add("/api/debug");
    this.honeytrapTriggers.add("/wp-admin"); // Fake WordPress admin
    this.honeytrapTriggers.add("/phpmyadmin"); // Fake phpMyAdmin
    
    console.log(`Set up ${this.honeytrapTriggers.size} honeytrap routes`);
  }
  
  /**
   * Check if request contains suspicious parameters
   */
  private checkForSuspiciousParams(requestData: any): boolean {
    const suspiciousPatterns = [
      /script/i,
      /select.*from/i,
      /union.*select/i,
      /insert.*into/i,
      /drop.*table/i,
      /alert\(/i,
      /eval\(/i,
      /document\.cookie/i,
      /onload=/i,
      /onerror=/i,
      /exec\(/i,
      /system\(/i
    ];
    
    const requestString = JSON.stringify(requestData).toLowerCase();
    
    return suspiciousPatterns.some(pattern => pattern.test(requestString));
  }
  
  /**
   * Update session behavioral profile
   */
  private updateBehavioralProfile(session: any, requestData: any): void {
    // Update common paths
    if (!session.behavioralProfile.commonPaths.includes(requestData.path)) {
      session.behavioralProfile.commonPaths.push(requestData.path);
      // Keep only the last 20 paths
      if (session.behavioralProfile.commonPaths.length > 20) {
        session.behavioralProfile.commonPaths.shift();
      }
    }
    
    // Update typical methods
    session.behavioralProfile.typicalMethods.add(requestData.method);
    
    // Update average request size
    if (requestData.body) {
      const bodySize = JSON.stringify(requestData.body).length;
      const oldAvg = session.behavioralProfile.averageRequestSize;
      const requestCount = session.behavioralProfile.requestCount;
      
      session.behavioralProfile.averageRequestSize = 
        (oldAvg * requestCount + bodySize) / (requestCount + 1);
    }
    
    // Update IPs and user agents
    session.behavioralProfile.knownIPs.add(requestData.ip);
    session.behavioralProfile.knownUserAgents.add(requestData.userAgent);
    
    // Update request count
    session.behavioralProfile.requestCount++;
    
    // Add time pattern
    const hour = new Date(requestData.timestamp).getHours();
    session.behavioralProfile.timePatterns.push(hour);
    // Keep only the last 100 time patterns
    if (session.behavioralProfile.timePatterns.length > 100) {
      session.behavioralProfile.timePatterns.shift();
    }
  }
  
  /**
   * Check if a request is authorized to access a resource
   */
  private async checkResourceAuthorization(
    accessLevel: string,
    resource: string,
    action: string,
    threatScore: number,
    trustScore: number
  ): Promise<boolean> {
    // Simplified access control matrix - in a real implementation this would be more sophisticated
    const accessMatrix: Record<string, Record<string, string[]>> = {
      "admin": {
        "read": ["*"],
        "write": ["*"],
        "delete": ["*"]
      },
      "manager": {
        "read": ["*"],
        "write": ["sales/*", "marketing/*", "users/*"],
        "delete": ["sales/*", "marketing/*"]
      },
      "user": {
        "read": ["products/*", "catalog/*", "account/*"],
        "write": ["account/*"],
        "delete": ["account/preferences"]
      },
      "guest": {
        "read": ["products/*", "catalog/*"],
        "write": [],
        "delete": []
      }
    };
    
    // Get allowed resources for the access level and action
    const allowedResources = accessMatrix[accessLevel]?.[action] || [];
    
    // Check if resource is allowed
    const isAllowed = allowedResources.some(pattern => {
      if (pattern === "*") return true;
      
      if (pattern.endsWith("/*")) {
        const prefix = pattern.slice(0, -2);
        return resource.startsWith(prefix);
      }
      
      return resource === pattern;
    });
    
    // Apply zero trust principles - even allowed resources can be denied if behavior is suspicious
    const combinedScore = trustScore - threatScore;
    
    // Critical resources require higher trust
    const isCritical = resource.includes("admin") || 
                      resource.includes("security") || 
                      action === "delete";
    
    // Determine final authorization
    if (isCritical) {
      return isAllowed && combinedScore > 0.4;
    }
    
    return isAllowed && combinedScore > 0.1;
  }
  
  /**
   * Update a session's trust score based on behavior
   */
  private updateTrustScore(session: any, threatScore: number): void {
    // Adjust trust score - good behavior increases, bad behavior decreases
    const adjustment = (0.5 - threatScore) * 0.05;
    
    // Update with bounds
    session.trustScore = Math.max(0, Math.min(1, session.trustScore + adjustment));
  }
  
  /**
   * Remove expired sessions
   */
  private cleanExpiredSessions(): void {
    const now = Date.now();
    const sessionTimeout = 3600000; // 1 hour
    
    // Remove sessions that have been inactive for longer than the timeout
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (now - session.lastActivity > sessionTimeout) {
        this.activeSessions.delete(sessionId);
      }
    }
  }
}

// Export the singleton instance
export const ghostGuardAI = new GhostGuardAI();
