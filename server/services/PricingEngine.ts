
import { encrypt } from '../utils/encryption';
import type { UserProfile, PricingStrategy } from '../../shared/schema';

class PricingEngine {
  private static instance: PricingEngine;
  private strategies: Map<string, PricingStrategy>;

  private constructor() {
    this.strategies = new Map();
    this.initializeStrategies();
  }

  public static getInstance(): PricingEngine {
    if (!PricingEngine.instance) {
      PricingEngine.instance = new PricingEngine();
    }
    return PricingEngine.instance;
  }

  public async calculatePrice(user: UserProfile, basePrice: number): Promise<number> {
    const encryptedProfile = encrypt(JSON.stringify(user), process.env.PRICING_KEY);
    const strategy = await this.determineStrategy(encryptedProfile);
    return this.applyStrategy(strategy, basePrice);
  }

  private async determineStrategy(encryptedProfile: string): Promise<PricingStrategy> {
    // Polymorphic strategy determination
    return {
      multiplier: Math.random() * 0.3 + 0.85, // 15% variance
      rules: []
    };
  }

  private applyStrategy(strategy: PricingStrategy, basePrice: number): number {
    return basePrice * strategy.multiplier;
  }
}

export default PricingEngine;
import { behavioralEngine } from './AIBehavioralEngine';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

interface PriceAdjustment {
  basePrice: number;
  adjustedPrice: number;
  confidence: number;
  expiresAt: number;
}

class PricingEngine {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key = randomBytes(32);
  private readonly priceCache: Map<string, PriceAdjustment>;

  constructor() {
    this.priceCache = new Map();
  }

  public async calculateDynamicPrice(
    userId: string, 
    productId: string,
    basePrice: number,
    behaviors: string[]
  ): Promise<number> {
    const cacheKey = this.encryptData(`${userId}:${productId}`);
    
    if (this.priceCache.has(cacheKey)) {
      const cached = this.priceCache.get(cacheKey)!;
      if (cached.expiresAt > Date.now()) return cached.adjustedPrice;
    }

    const pattern = await behavioralEngine.analyzeBehavior(userId, behaviors);
    
    const adjustment = this.calculatePriceAdjustment(
      basePrice,
      pattern.pricingSensitivity,
      pattern.conversionRate
    );

    this.priceCache.set(cacheKey, {
      basePrice,
      adjustedPrice: adjustment,
      confidence: 0.85,
      expiresAt: Date.now() + 3600000 // 1 hour
    });

    return adjustment;
  }

  private encryptData(data: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  }

  private calculatePriceAdjustment(
    basePrice: number,
    sensitivity: number,
    conversionRate: number
  ): number {
    const maxAdjustment = 0.15; // 15% max adjustment
    const adjustmentFactor = (1 - sensitivity) * conversionRate;
    const adjustment = basePrice * (1 + (adjustmentFactor * maxAdjustment));
    
    return Math.round(adjustment * 100) / 100;
  }
}

export const pricingEngine = new PricingEngine();
