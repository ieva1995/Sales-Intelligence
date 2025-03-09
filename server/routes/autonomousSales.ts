import { Router } from "express";
import { 
  autonomousSalesService, 
  CustomerBehavior, 
  SalesOpportunity, 
  CrossPlatformBehavior,
  PredictiveSalesStrategy,
  EmotionalTrigger,
  DarkIntelligence,
  DeepLearningMetrics
} from "../services/autonomousSalesService";

const router = Router();

/**
 * Generate a sales strategy based on customer behavior
 * POST /api/autonomous-sales/strategy
 */
router.post("/api/autonomous-sales/strategy", async (req, res) => {
  try {
    const customerBehavior: CustomerBehavior = req.body;

    if (!customerBehavior) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Customer behavior data is required' 
      });
    }

    // Check for required fields
    if (!customerBehavior.searchTerms || !customerBehavior.visitedPages) {
      return res.status(400).json({ 
        status: 'error',
        error: 'searchTerms and visitedPages are required fields' 
      });
    }

    // Monitor for suspicious behavior
    const isSuspicious = autonomousSalesService.monitorBehavioralPatterns(
      req.ip || 'unknown',
      [`strategy_request:${JSON.stringify(customerBehavior).slice(0, 100)}`]
    );

    if (isSuspicious) {
      // Return a normal response but flag internally
      console.warn(`Suspicious activity detected from ${req.ip}`);
    }

    const strategy = await autonomousSalesService.generateSalesStrategy(customerBehavior);

    res.json({ 
      strategy,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Strategy generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate sales strategy',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Get Deep Learning metrics
 * GET /api/autonomous-sales/deep-learning-metrics
 */
router.get("/api/autonomous-sales/deep-learning-metrics", async (req, res) => {
  try {
    const metrics = autonomousSalesService.getDeepLearningMetrics();

    res.json({ 
      metrics,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Error retrieving deep learning metrics:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve deep learning metrics',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Trigger Deep Learning training
 * POST /api/autonomous-sales/train
 */
router.post("/api/autonomous-sales/train", async (req, res) => {
  try {
    const metrics = await autonomousSalesService.trainDeepLearningCore();

    res.json({ 
      metrics,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Training error:', error);
    res.status(500).json({ 
      error: 'Failed to train deep learning core',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Generate a predictive sales strategy
 * POST /api/autonomous-sales/predictive-strategy
 */
router.post("/api/autonomous-sales/predictive-strategy", async (req, res) => {
  try {
    const { targetAudience, historyData } = req.body;

    if (!targetAudience) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Target audience is required' 
      });
    }

    const strategy = await autonomousSalesService.generatePredictiveStrategy(
      targetAudience, 
      historyData
    );

    res.json({ 
      strategy,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Predictive strategy generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate predictive strategy',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Track cross-platform behavior
 * POST /api/autonomous-sales/cross-platform
 */
router.post("/api/autonomous-sales/cross-platform", async (req, res) => {
  try {
    const { userId, behaviors } = req.body;

    if (!userId || !behaviors || !Array.isArray(behaviors)) {
      return res.status(400).json({ 
        status: 'error',
        error: 'User ID and behaviors array are required' 
      });
    }

    const analysis = await autonomousSalesService.trackCrossPlatformBehavior(
      userId,
      behaviors
    );

    res.json({ 
      analysis,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Cross-platform tracking error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze cross-platform behavior',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Gather dark intelligence on competitors
 * POST /api/autonomous-sales/competitor-intelligence
 */
router.post("/api/autonomous-sales/competitor-intelligence", async (req, res) => {
  try {
    const { competitors } = req.body;

    if (!competitors || !Array.isArray(competitors)) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Competitors array is required' 
      });
    }

    const intelligence = await autonomousSalesService.gatherCompetitorIntelligence(competitors);

    res.json({ 
      intelligence,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Competitor intelligence error:', error);
    res.status(500).json({ 
      error: 'Failed to gather competitor intelligence',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Generate emotional trigger
 * POST /api/autonomous-sales/emotional-trigger
 */
router.post("/api/autonomous-sales/emotional-trigger", async (req, res) => {
  try {
    const customerBehavior: CustomerBehavior = req.body;

    if (!customerBehavior) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Customer behavior data is required' 
      });
    }

    const trigger = await autonomousSalesService.generateEmotionalTrigger(customerBehavior);

    res.json({ 
      trigger,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Emotional trigger generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate emotional trigger',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Track competitor pricing
 * POST /api/autonomous-sales/competitor-tracking
 */
router.post("/api/autonomous-sales/competitor-tracking", async (req, res) => {
  try {
    const { competitors } = req.body;

    if (!competitors || !Array.isArray(competitors)) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Competitors array is required' 
      });
    }

    const competitorData = await autonomousSalesService.trackCompetitorPricing(competitors);

    res.json({ 
      competitorData,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Competitor tracking error:', error);
    res.status(500).json({ 
      error: 'Failed to track competitor pricing',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Generate optimized product description
 * POST /api/autonomous-sales/product-description
 */
router.post("/api/autonomous-sales/product-description", async (req, res) => {
  try {
    const { product, targetAudience } = req.body;

    if (!product || !targetAudience) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Product and target audience are required' 
      });
    }

    const description = await autonomousSalesService.generateProductDescription(product, targetAudience);

    res.json({ 
      description,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Product description generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate product description',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

/**
 * Detect customer sentiment
 * POST /api/autonomous-sales/sentiment
 */
router.post("/api/autonomous-sales/sentiment", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Customer message is required' 
      });
    }

    const sentiment = await autonomousSalesService.detectCustomerSentiment(message);

    res.json({ 
      sentiment,
      status: 'success' 
    });
  } catch (error: any) {
    console.error('Sentiment detection error:', error);
    res.status(500).json({ 
      error: 'Failed to detect customer sentiment',
      status: 'error',
      details: error.message || 'Unknown error'
    });
  }
});

export default router;