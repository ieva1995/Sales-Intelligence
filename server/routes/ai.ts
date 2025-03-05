import express from 'express';
import AIBehavioralEngine from '../services/AIBehavioralEngine';
import PricingEngine from '../services/PricingEngine';
import { behavioralEngine } from '../services/AIBehavioralEngine';
import { pricingEngine } from '../services/PricingEngine';
import { encryptionManager } from '../utils/encryption';

const router = express.Router();

router.post('/analyze-behavior', async (req, res) => {
  try {
    const engine = AIBehavioralEngine.getInstance();
    const stage = await engine.analyzeBehavior(req.body);
    res.json({ stage });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

router.post('/calculate-price', async (req, res) => {
  try {
    const engine = PricingEngine.getInstance();
    const price = await engine.calculatePrice(req.body.user, req.body.basePrice);
    res.json({ price });
  } catch (error) {
    res.status(500).json({ error: 'Pricing calculation failed' });
  }
});

export default router;