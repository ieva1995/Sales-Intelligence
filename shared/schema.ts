import { pgTable, text, serial, integer, timestamp, jsonb, boolean, decimal, uuid, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing tables
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

// Financial Management
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(), // 'income' or 'expense'
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  status: text("status").notNull(), // 'pending', 'completed', 'cancelled'
  reference: text("reference"),
  metadata: jsonb("metadata")
});

// Inventory Management
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description"),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  stockLevel: integer("stock_level").notNull(),
  reorderPoint: integer("reorder_point").notNull(),
  supplier: text("supplier"),
  lastRestocked: timestamp("last_restocked"),
  metadata: jsonb("metadata")
});

// Sales Management
export const sales = pgTable("sales", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").notNull(),
  employeeId: uuid("employee_id").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // 'pending', 'completed', 'cancelled'
  paymentMethod: text("payment_method").notNull(),
  metadata: jsonb("metadata")
});

// Sales Items (Products in a sale)
export const saleItems = pgTable("sale_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  saleId: uuid("sale_id").notNull(),
  productId: uuid("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull()
});

// Employee Management
export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: text("role").notNull(),
  department: text("department").notNull(),
  hireDate: date("hire_date").notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // 'active', 'inactive'
  metadata: jsonb("metadata")
});

// Customer Management (CRM)
export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  joinDate: date("join_date").notNull().defaultNow(),
  lastPurchase: timestamp("last_purchase"),
  totalPurchases: decimal("total_purchases", { precision: 10, scale: 2 }).default("0"),
  status: text("status").notNull().default("active"), // 'active', 'inactive'
  metadata: jsonb("metadata")
});

// Add new News table and types after the existing tables
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  insight: text("insight").notNull(),
  opportunity: text("opportunity").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  priority: text("priority").notNull(),
  source: text("source"),
  metadata: jsonb("metadata")
});

// Authentication System - Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // 'admin', 'manager', 'rep', 'user'
  avatar: text("avatar"),
  lastLogin: timestamp("last_login"),
  status: text("status").notNull().default("active"), // 'active', 'inactive', 'locked'
  deviceFingerprint: text("device_fingerprint"),
  lastIpAddress: text("last_ip_address"),
  created: timestamp("created").notNull().defaultNow(),
  updated: timestamp("updated").notNull().defaultNow()
});

// Authentication System - One-time Login Tokens
export const loginTokens = pgTable("login_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  deviceFingerprint: text("device_fingerprint"),
  ipAddress: text("ip_address"),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  created: timestamp("created").notNull().defaultNow()
});

// Authentication System - Active Sessions
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  tokenHash: text("token_hash").notNull(),
  deviceFingerprint: text("device_fingerprint"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  lastActivity: timestamp("last_activity").notNull(),
  created: timestamp("created").notNull().defaultNow()
});

// Create insert schemas for all tables
export const insertTrendSchema = createInsertSchema(trends).omit({ id: true });
export const insertPredictionSchema = createInsertSchema(predictions).omit({ id: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertSaleSchema = createInsertSchema(sales).omit({ id: true });
export const insertSaleItemSchema = createInsertSchema(saleItems).omit({ id: true });
export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true });
export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true });

// Create insert schemas for authentication tables
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  lastLogin: true, 
  deviceFingerprint: true, 
  lastIpAddress: true, 
  created: true, 
  updated: true 
});

export const insertLoginTokenSchema = createInsertSchema(loginTokens).omit({ 
  id: true, 
  usedAt: true, 
  created: true 
});

export const insertSessionSchema = createInsertSchema(sessions).omit({ 
  id: true, 
  created: true 
});

// Export types
export type Trend = typeof trends.$inferSelect;
export type Prediction = typeof predictions.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type SaleItem = typeof saleItems.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type News = typeof news.$inferSelect;

// Authentication types
export type User = typeof users.$inferSelect;
export type LoginToken = typeof loginTokens.$inferSelect;
export type Session = typeof sessions.$inferSelect;

// Export insert types
export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type InsertSaleItem = z.infer<typeof insertSaleItemSchema>;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;

// Auth insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertLoginToken = z.infer<typeof insertLoginTokenSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;