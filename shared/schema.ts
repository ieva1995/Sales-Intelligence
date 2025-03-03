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