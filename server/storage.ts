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
    try {
      return await db.select().from(trends);
    } catch (error) {
      console.error('Error fetching trends:', error);
      return [];
    }
  }

  async getTrendByKeyword(keyword: string): Promise<Trend | undefined> {
    try {
      const [trend] = await db.select().from(trends).where(eq(trends.keyword, keyword));
      return trend;
    } catch (error) {
      console.error('Error fetching trend by keyword:', error);
      return undefined;
    }
  }

  async createTrend(trend: InsertTrend): Promise<Trend> {
    try {
      const [newTrend] = await db.insert(trends).values(trend).returning();
      return newTrend;
    } catch (error) {
      console.error('Error creating trend:', error);
      throw new Error('Failed to create trend');
    }
  }

  async getPredictions(): Promise<Prediction[]> {
    try {
      return await db.select().from(predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      return [];
    }
  }

  async createPrediction(prediction: InsertPrediction): Promise<Prediction> {
    try {
      const [newPrediction] = await db.insert(predictions).values(prediction).returning();
      return newPrediction;
    } catch (error) {
      console.error('Error creating prediction:', error);
      throw new Error('Failed to create prediction');
    }
  }

  async getAlerts(): Promise<Alert[]> {
    try {
      return await db.select().from(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    try {
      const [newAlert] = await db.insert(alerts).values(alert).returning();
      return newAlert;
    } catch (error) {
      console.error('Error creating alert:', error);
      throw new Error('Failed to create alert');
    }
  }

  async updateAlert(id: number, active: boolean): Promise<Alert | undefined> {
    try {
      const [updatedAlert] = await db
        .update(alerts)
        .set({ active })
        .where(eq(alerts.id, id))
        .returning();
      return updatedAlert;
    } catch (error) {
      console.error('Error updating alert:', error);
      return undefined;
    }
  }
}

export const storage = new DatabaseStorage();