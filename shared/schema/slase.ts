import { z } from "zod";

// Self-Learning Autonomous Sales Engine Schema

// Customer Behavior Schema
export const customerBehaviorSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string(),
  pageViews: z.array(z.object({
    url: z.string(),
    duration: z.number(),
    timestamp: z.string(),
    interactions: z.array(z.object({
      type: z.enum(["click", "hover", "scroll", "form_input", "selection"]),
      elementId: z.string().optional(),
      value: z.string().optional(),
      timestamp: z.number()
    })).optional()
  })),
  searchQueries: z.array(z.object({
    term: z.string(),
    timestamp: z.number(),
    source: z.string().optional(),
  })).optional(),
  emotionalSentiment: z.object({
    primary: z.enum(["positive", "negative", "neutral", "curious", "hesitant", "excited"]),
    confidence: z.number().min(0).max(1),
    triggers: z.array(z.string()).optional(),
  }).optional(),
  conversionEvents: z.array(z.object({
    type: z.enum(["add_to_cart", "checkout_start", "purchase", "abandon", "return_visit"]),
    productIds: z.array(z.string()).optional(),
    timestamp: z.number(),
    value: z.number().optional(),
  })).optional(),
});

export type CustomerBehavior = z.infer<typeof customerBehaviorSchema>;

// Sales Strategy Schema
export const salesStrategySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  targetAudience: z.array(z.string()),
  triggerConditions: z.array(z.object({
    type: z.enum(["behavior", "time", "segment", "competitor", "market", "sentiment"]),
    parameter: z.string(),
    operator: z.enum(["equals", "contains", "greater_than", "less_than", "between", "not_equals"]),
    value: z.union([z.string(), z.number(), z.array(z.any())]),
    confidence: z.number().min(0).max(1).optional(),
  })),
  actions: z.array(z.object({
    type: z.enum([
      "price_adjustment", 
      "content_personalization", 
      "offer_generation", 
      "email_campaign", 
      "checkout_modification",
      "product_recommendation",
      "copy_optimization"
    ]),
    parameters: z.record(z.any()).optional(),
    priority: z.number().min(1).max(10).optional(),
    maxExecutions: z.number().optional(),
  })),
  performance: z.object({
    conversions: z.number().optional(),
    revenue: z.number().optional(),
    impressions: z.number().optional(),
    roi: z.number().optional(),
    lastUpdated: z.string().optional(),
  }).optional(),
  isActive: z.boolean().default(true),
  isAutonomous: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  aiGenerated: z.boolean().optional(),
});

export type SalesStrategy = z.infer<typeof salesStrategySchema>;

// Market Intelligence Schema 
export const marketIntelligenceSchema = z.object({
  id: z.string(),
  type: z.enum(["competitor", "trend", "market"]),
  source: z.string(),
  data: z.record(z.any()),
  relevanceScore: z.number().min(0).max(1),
  actionRecommendations: z.array(z.string()).optional(),
  timestamp: z.string(),
  processed: z.boolean().default(false),
});

export type MarketIntelligence = z.infer<typeof marketIntelligenceSchema>;

// Neural Copywriting Schema
export const neuralCopywritingSchema = z.object({
  id: z.string(),
  originalText: z.string(),
  optimizedText: z.string(),
  targetAudience: z.array(z.string()).optional(),
  optimizationGoal: z.enum(["conversion", "engagement", "clarity", "seo", "emotion"]),
  performanceMetrics: z.object({
    clickThroughRate: z.number().optional(),
    conversionRate: z.number().optional(),
    engagement: z.number().optional(),
    impressions: z.number().optional(),
  }).optional(),
  aiConfidence: z.number().min(0).max(1),
  created: z.string(),
  lastTested: z.string().optional(),
  status: z.enum(["draft", "testing", "active", "archived"]),
});

export type NeuralCopywriting = z.infer<typeof neuralCopywritingSchema>;

// Security Events Schema (For GhostGuard AI)
export const securityEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    "unauthorized_access", 
    "suspicious_behavior", 
    "honeytrap_trigger", 
    "zero_trust_violation",
    "code_tampering",
    "data_exfiltration_attempt",
    "biometric_failure"
  ]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  source: z.object({
    ip: z.string().optional(),
    userAgent: z.string().optional(),
    location: z.string().optional(),
    userId: z.string().optional(),
    behavioralPattern: z.string().optional(),
  }),
  timestamp: z.string(),
  details: z.record(z.any()),
  mitigationApplied: z.array(z.string()).optional(),
  resolved: z.boolean().default(false),
  aiAnalysis: z.string().optional(),
});

export type SecurityEvent = z.infer<typeof securityEventSchema>;

// Master Access Control Schema
export const masterAccessControlSchema = z.object({
  id: z.string(),
  accessType: z.enum(["biometric", "emergency", "dead_man_switch", "time_lock"]),
  biometricData: z.object({
    type: z.enum(["face", "fingerprint", "retina", "voice", "multi"]),
    hash: z.string(),
    lastVerified: z.string().optional(),
  }).optional(),
  accessTimestamp: z.string(),
  expiryTimestamp: z.string().optional(),
  accessLevel: z.enum(["read", "write", "admin", "emergency", "full"]),
  accessGrantedBy: z.string().optional(),
  deviceFingerprint: z.string().optional(),
  encryptionKeys: z.array(z.string()).optional(),
  status: z.enum(["active", "pending", "revoked", "locked"]),
});

export type MasterAccessControl = z.infer<typeof masterAccessControlSchema>;

// Create insert schemas using zod for database operations
export const createInsertCustomerBehaviorSchema = customerBehaviorSchema;
export const createInsertSalesStrategySchema = salesStrategySchema.omit({ id: true, createdAt: true, updatedAt: true });
export const createInsertMarketIntelligenceSchema = marketIntelligenceSchema.omit({ id: true, timestamp: true });
export const createInsertNeuralCopywritingSchema = neuralCopywritingSchema.omit({ id: true, created: true });
export const createInsertSecurityEventSchema = securityEventSchema.omit({ id: true, timestamp: true });
export const createInsertMasterAccessControlSchema = masterAccessControlSchema.omit({ id: true, accessTimestamp: true });

// Define insert types
export type InsertCustomerBehavior = z.infer<typeof createInsertCustomerBehaviorSchema>;
export type InsertSalesStrategy = z.infer<typeof createInsertSalesStrategySchema>;
export type InsertMarketIntelligence = z.infer<typeof createInsertMarketIntelligenceSchema>;
export type InsertNeuralCopywriting = z.infer<typeof createInsertNeuralCopywritingSchema>;
export type InsertSecurityEvent = z.infer<typeof createInsertSecurityEventSchema>;
export type InsertMasterAccessControl = z.infer<typeof createInsertMasterAccessControlSchema>;
