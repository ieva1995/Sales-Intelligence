import { 
  type Trend, type InsertTrend,
  type Prediction, type InsertPrediction,
  type Alert, type InsertAlert
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private trends: Map<number, Trend>;
  private predictions: Map<number, Prediction>;
  private alerts: Map<number, Alert>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.trends = new Map();
    this.predictions = new Map();
    this.alerts = new Map();
    this.currentIds = { trends: 1, predictions: 1, alerts: 1 };
  }

  async getTrends(): Promise<Trend[]> {
    return Array.from(this.trends.values());
  }

  async getTrendByKeyword(keyword: string): Promise<Trend | undefined> {
    return Array.from(this.trends.values()).find(t => t.keyword === keyword);
  }

  async createTrend(trend: InsertTrend): Promise<Trend> {
    const id = this.currentIds.trends++;
    const newTrend = { ...trend, id };
    this.trends.set(id, newTrend);
    return newTrend;
  }

  async getPredictions(): Promise<Prediction[]> {
    return Array.from(this.predictions.values());
  }

  async createPrediction(prediction: InsertPrediction): Promise<Prediction> {
    const id = this.currentIds.predictions++;
    const newPrediction = { ...prediction, id };
    this.predictions.set(id, newPrediction);
    return newPrediction;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = this.currentIds.alerts++;
    const newAlert = { ...alert, id };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async updateAlert(id: number, active: boolean): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, active };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }
}

export const storage = new MemStorage();
