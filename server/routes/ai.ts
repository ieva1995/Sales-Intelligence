
import express from 'express';
import AIBehavioralEngine from '../services/AIBehavioralEngine';
import PricingEngine from '../services/PricingEngine';

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
import express from 'express';
import { behavioralEngine } from '../services/AIBehavioralEngine';
import { pricingEngine } from '../services/PricingEngine';
import { encryptionManager } from '../utils/encryption';

const router = express.Router();

router.post('/analyze-behavior', async (req, res) => {
  try {
    const { userId, interactions } = req.body;
    const pattern = await behavioralEngine.analyzeBehavior(userId, interactions);
    res.json(pattern);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

router.post('/calculate-price', async (req, res) => {
  try {
    const { userId, productId, basePrice, behaviors } = req.body;
    const price = await pricingEngine.calculateDynamicPrice(
      userId,
      productId,
      basePrice,
      behaviors
    );
    res.json({ price });
  } catch (error) {
    res.status(500).json({ error: 'Price calculation failed' });
  }
});

export default router;
