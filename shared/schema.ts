import { pgTable, text, serial, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  interest: integer("interest").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  region: text("region").notNull(),
  metadata: jsonb("metadata")
});

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  predictedInterest: integer("predicted_interest").notNull(),
  confidence: integer("confidence").notNull(),
  timestamp: timestamp("timestamp").notNull()
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  threshold: integer("threshold").notNull(),
  active: boolean("active").notNull().default(true)
});

export const insertTrendSchema = createInsertSchema(trends).omit({ id: true });
export const insertPredictionSchema = createInsertSchema(predictions).omit({ id: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true });

export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type Trend = typeof trends.$inferSelect;
export type Prediction = typeof predictions.$inferSelect;
export type Alert = typeof alerts.$inferSelect;