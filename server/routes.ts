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
import { createShopifyRouter } from './routes/shopify';
import authRouter from './routes/auth'; 
import { newsService } from "./services/newsService";
import { recommendationService } from "./services/recommendationService"; 

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Setup WebSocket server for real-time updates with proper error handling
  try {
    // Use a specific path to avoid conflicts with Vite's HMR WebSocket
    const wss = new WebSocketServer({ 
      server: httpServer, 
      path: '/ws-feed',
      // Add error handling options
      clientTracking: true,
      perMessageDeflate: {
        zlibDeflateOptions: {
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Below options specified as default values
        concurrencyLimit: 10,
        threshold: 1024
      }
    });

    wss.on('connection', (ws, req) => {
      const clientIp = req.socket.remoteAddress;
      console.log(`Client connected to WebSocket from ${clientIp}`);

      try {
        newsService.addClient(ws);
      } catch (error) {
        console.error('Error adding WebSocket client:', error);
      }
    });

    wss.on('error', (error) => {
      console.error('WebSocket server error:', error);
      // Don't crash the server on WebSocket errors
    });

    console.log('WebSocket server initialized on path /ws-feed');
  } catch (error) {
    console.error('Failed to initialize WebSocket server:', error);
    // Continue running the REST API even if WebSocket fails
  }

  // Register routers
  app.use(chatRouter);
  app.use(stripeRouter); 
  app.use('/api/shopify', createShopifyRouter(app.constructor)); 
  app.use(authRouter); 

  // Middleware to handle database maintenance
  app.use(async (req, res, next) => {
    // Clean up expired tokens and sessions periodically
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

  // Existing routes
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

  // Predictions
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

  // Alerts
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

  // Financial Management
  app.get("/api/transactions", async (_req, res) => {
    const transactions = await storage.getTransactions();
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const transaction = await storage.createTransaction(result.data);
    res.json(transaction);
  });

  app.get("/api/transactions/:id", async (req, res) => {
    const transaction = await storage.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  });

  app.get("/api/revenue/daily", async (_req, res) => {
    const revenue = await storage.getDailyRevenue();
    res.json({ revenue });
  });

  app.get("/api/revenue/weekly", async (_req, res) => {
    const revenue = await storage.getWeeklyRevenue();
    res.json({ revenue });
  });

  // Inventory Management
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const product = await storage.createProduct(result.data);
    res.json(product);
  });

  app.patch("/api/products/:id/stock", async (req, res) => {
    const { quantity } = req.body;
    if (typeof quantity !== "number") {
      return res.status(400).json({ error: "quantity must be a number" });
    }
    const product = await storage.updateProductStock(req.params.id, quantity);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });

  app.get("/api/products/low-stock", async (_req, res) => {
    const products = await storage.getLowStockProducts();
    res.json(products);
  });

  // Sales Management
  app.get("/api/sales", async (_req, res) => {
    const sales = await storage.getSales();
    res.json(sales);
  });

  app.post("/api/sales", async (req, res) => {
    const result = insertSaleSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const { items, ...sale } = req.body;
    const newSale = await storage.createSale(sale, items);
    res.json(newSale);
  });

  app.get("/api/sales/:id", async (req, res) => {
    const sale = await storage.getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    const items = await storage.getSaleItems(sale.id);
    res.json({ ...sale, items });
  });

  // Employee Management
  app.get("/api/employees", async (_req, res) => {
    const employees = await storage.getEmployees();
    res.json(employees);
  });

  app.post("/api/employees", async (req, res) => {
    const result = insertEmployeeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const employee = await storage.createEmployee(result.data);
    res.json(employee);
  });

  app.patch("/api/employees/:id", async (req, res) => {
    const employee = await storage.updateEmployee(req.params.id, req.body);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  });

  app.get("/api/employees/:id", async (req, res) => {
    const employee = await storage.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  });

  // Customer Management
  app.get("/api/customers", async (_req, res) => {
    const customers = await storage.getCustomers();
    res.json(customers);
  });

  app.post("/api/customers", async (req, res) => {
    const result = insertCustomerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const customer = await storage.createCustomer(result.data);
    res.json(customer);
  });

  app.patch("/api/customers/:id", async (req, res) => {
    const customer = await storage.updateCustomer(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  });

  app.get("/api/customers/:id", async (req, res) => {
    const customer = await storage.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  });

  app.get("/api/customers/top", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const customers = await storage.getTopCustomers(limit);
    res.json(customers);
  });

  // Google Trends Integration
  app.get("/api/trends-data/:keyword", async (req, res) => {
    try {
      const result = await googleTrends.interestOverTime({
        keyword: req.params.keyword,
        startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endTime: new Date()
      });

      const data = JSON.parse(result);
      const timelineData = data.default.timelineData.map((point: any) => ({
        time: new Date(point.time * 1000).toISOString(),
        value: point.value[0]
      }));

      res.json({ timelineData });
    } catch (error) {
      console.error('Error fetching Google Trends data:', error);
      res.status(500).json({ error: 'Failed to fetch trend data' });
    }
  });

  app.get("/api/trends-prediction/:keyword", async (req, res) => {
    try {
      const result = await googleTrends.interestOverTime({
        keyword: req.params.keyword,
        startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        endTime: new Date()
      });

      const data = JSON.parse(result);
      const values = data.default.timelineData.map((point: any) => point.value[0]);

      // Simple prediction based on trend
      const recentValues = values.slice(-7);
      const average = recentValues.reduce((a: number, b: number) => a + b, 0) / recentValues.length;
      const trend = recentValues[recentValues.length - 1] - recentValues[0];

      res.json({
        predictedInterest: Math.min(100, Math.max(0, Math.round(average + trend))),
        confidence: Math.round(70 + Math.random() * 20)
      });
    } catch (error) {
      console.error('Error predicting trend:', error);
      res.status(500).json({ error: 'Failed to predict trend' });
    }
  });

  return httpServer;
}