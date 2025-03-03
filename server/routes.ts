import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTrendSchema, insertPredictionSchema, insertAlertSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Trends
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

  return httpServer;
}
