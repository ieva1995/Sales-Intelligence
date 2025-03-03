import { db } from "./db";
import { 
  trends, predictions, alerts,
  type Trend, type InsertTrend,
  type Prediction, type InsertPrediction,
  type Alert, type InsertAlert
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Trends
  getTrends(): Promise<Trend[]>;
  getTrendByKeyword(keyword: string): Promise<Trend | undefined>;
  createTrend(trend: InsertTrend): Promise<Trend>;

  // Predictions
  getPredictions(): Promise<Prediction[]>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;

  // Alerts
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, active: boolean): Promise<Alert | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getTrends(): Promise<Trend[]> {
    return await db.select().from(trends);
  }

  async getTrendByKeyword(keyword: string): Promise<Trend | undefined> {
    const [trend] = await db.select().from(trends).where(eq(trends.keyword, keyword));
    return trend;
  }

  async createTrend(trend: InsertTrend): Promise<Trend> {
    const [newTrend] = await db.insert(trends).values(trend).returning();
    return newTrend;
  }

  async getPredictions(): Promise<Prediction[]> {
    return await db.select().from(predictions);
  }

  async createPrediction(prediction: InsertPrediction): Promise<Prediction> {
    const [newPrediction] = await db.insert(predictions).values(prediction).returning();
    return newPrediction;
  }

  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async updateAlert(id: number, active: boolean): Promise<Alert | undefined> {
    const [updatedAlert] = await db
      .update(alerts)
      .set({ active })
      .where(eq(alerts.id, id))
      .returning();
    return updatedAlert;
  }
}

export const storage = new DatabaseStorage();