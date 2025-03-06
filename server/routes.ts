import type { Express } from "express";
import { createServer } from "http";
import { WebSocketServer } from 'ws';
import { storage } from "./storage";
import {
  insertTrendSchema, insertPredictionSchema, insertAlertSchema,
  insertTransactionSchema, insertProductSchema, insertSaleSchema,
  insertEmployeeSchema, insertCustomerSchema
} from "@shared/schema";
import * as googleTrends from './googleTrends';
import chatRouter from './routes/chat';
import stripeRouter from './routes/stripe';
import authRouter from './routes/auth';
import { newsService } from "./services/newsService";
import { recommendationService } from "./services/recommendationService";
import autonomousSalesRouter from './routes/autonomousSales';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Get current file location for ES modules (replacement for __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Circuit breaker for database
let dbFailureCount = 0;
const DB_FAILURE_THRESHOLD = 5;
const DB_RESET_TIMEOUT = 30000;

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Error recovery middleware
  app.use((req, res, next) => {
    res.setTimeout(30000, () => {
      res.status(408).send('Request timeout');
    });
    next();
  });

  // Circuit breaker middleware
  app.use(async (req, res, next) => {
    try {
      if (dbFailureCount >= DB_FAILURE_THRESHOLD) {
        console.log('Circuit breaker active, waiting for reset');
        res.status(503).json({ error: 'Service temporarily unavailable' });
        return;
      }
      next();
    } catch (error) {
      dbFailureCount++;
      console.error('Database error:', error);
      if (dbFailureCount === DB_FAILURE_THRESHOLD) {
        setTimeout(() => {
          dbFailureCount = 0;
          console.log('Circuit breaker reset');
        }, DB_RESET_TIMEOUT);
      }
      next(error);
    }
  });

  // WebSocket server is initialized in index.ts
  console.log('Using WebSocket server from index.ts');

  // Register routers
  app.use(chatRouter);
  app.use(stripeRouter);
  app.use(autonomousSalesRouter);
  app.use(authRouter);

  // Mock Shopify endpoint
  app.get('/api/shopify/*', (req, res) => {
    console.log(`Mock Shopify endpoint called: ${req.path}`);
    const endpoint = req.path.split('/').pop();
    switch(endpoint) {
      case 'products': return res.json({ products: [] });
      case 'orders': return res.json({ orders: [] });
      case 'customers': return res.json({ customers: [] });
      case 'performance': return res.json({ 
        revenue: { total: "0.00", weekly: "0.00", monthly: "0.00" },
        orders: { count: 0, averageValue: "0.00" }
      });
      default: return res.json({});
    }
  });

  // Database maintenance middleware
  app.use(async (req, res, next) => {
    if (Math.random() < 0.1) { 
      try {
        await storage.clearExpiredTokens();
        await storage.cleanupSessions();
      } catch (error) {
        console.error('Error during database maintenance:', error);
      }
    }
    next();
  });

  // Product Recommendation APIs
  app.get("/api/recommendations/segments", async (_req, res) => {
    try {
      const segments = await recommendationService.getCustomerSegments();
      res.json(segments);
    } catch (error) {
      console.error('Error fetching customer segments:', error);
      res.status(500).json({ error: 'Failed to fetch customer segments' });
    }
  });

  app.get("/api/recommendations/:segmentId", async (req, res) => {
    try {
      const segmentId = req.params.segmentId;
      const recommendations = await recommendationService.getProductRecommendations(segmentId);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching product recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch product recommendations' });
    }
  });

  // API Routes
  app.get("/api/trends", async (_req, res) => {
    const trends = await storage.getTrends();
    res.json(trends);
  });

  app.post("/api/trends", async (req, res) => {
    const result = insertTrendSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const trend = await storage.createTrend(result.data);
    res.json(trend);
  });

  app.get("/api/predictions", async (_req, res) => {
    const predictions = await storage.getPredictions();
    res.json(predictions);
  });

  app.post("/api/predictions", async (req, res) => {
    const result = insertPredictionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const prediction = await storage.createPrediction(result.data);
    res.json(prediction);
  });

  app.get("/api/alerts", async (_req, res) => {
    const alerts = await storage.getAlerts();
    res.json(alerts);
  });

  app.post("/api/alerts", async (req, res) => {
    const result = insertAlertSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const alert = await storage.createAlert(result.data);
    res.json(alert);
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { active } = req.body;
    if (typeof active !== "boolean") {
      return res.status(400).json({ error: "active must be a boolean" });
    }
    const alert = await storage.updateAlert(id, active);
    if (!alert) {
      return res.status(404).json({ error: "Alert not found" });
    }
    res.json(alert);
  });

  // Serve static files from the Vite-built client
  const clientDistPath = resolve(__dirname, '../dist/client');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));

    // Fallback route for client-side routing
    app.get('*', (req, res) => {
      // Exclude API routes from the fallback
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
      }

      // Send the index.html for all other routes to handle client-side routing
      const indexPath = resolve(clientDistPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application is still building. Please refresh in a moment.');
      }
    });
  } else {
    // In development mode, we're using Vite's dev server
    console.log('Running in development mode - static files will be served by Vite');

    // Default fallback for non-API routes in development mode
    app.get('*', (req, res, next) => {
      if (!req.path.startsWith('/api/')) {
        return res.status(200).send(`
          <html>
            <head>
              <title>SalesBoost AI - Development Mode</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 2rem; text-align: center; }
                .container { max-width: 800px; margin: 0 auto; }
                h1 { color: #3f51b5; }
                .card { background: #f5f5f5; border-radius: 8px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                code { background: #e0e0e0; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 90%; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>SalesBoost AI Platform</h1>
                <div class="card">
                  <h2>Development Mode</h2>
                  <p>The application is running in development mode. To view the application UI, you need to build the client:</p>
                  <code>npm run build</code>
                  <p>API endpoints are available at <code>/api/...</code></p>
                </div>
              </div>
            </body>
          </html>
        `);
      }
      next();
    });
  }

  return httpServer;
}