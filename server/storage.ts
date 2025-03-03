import { db } from "./db";
import { 
  trends, predictions, alerts,
  transactions, products, sales,
  saleItems, employees, customers,
  type Trend, type InsertTrend,
  type Prediction, type InsertPrediction,
  type Alert, type InsertAlert,
  type Transaction, type InsertTransaction,
  type Product, type InsertProduct,
  type Sale, type InsertSale,
  type SaleItem, type InsertSaleItem,
  type Employee, type InsertEmployee,
  type Customer, type InsertCustomer
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Existing methods
  getTrends(): Promise<Trend[]>;
  getTrendByKeyword(keyword: string): Promise<Trend | undefined>;
  createTrend(trend: InsertTrend): Promise<Trend>;
  getPredictions(): Promise<Prediction[]>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, active: boolean): Promise<Alert | undefined>;

  // Financial Management
  getTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionById(id: string): Promise<Transaction | undefined>;
  getDailyRevenue(): Promise<number>;
  getWeeklyRevenue(): Promise<number>;

  // Inventory Management
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProductStock(id: string, quantity: number): Promise<Product | undefined>;
  getLowStockProducts(): Promise<Product[]>;

  // Sales Management
  getSales(): Promise<Sale[]>;
  createSale(sale: InsertSale, items: InsertSaleItem[]): Promise<Sale>;
  getSaleById(id: string): Promise<Sale | undefined>;
  getSaleItems(saleId: string): Promise<SaleItem[]>;

  // Employee Management
  getEmployees(): Promise<Employee[]>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, updates: Partial<InsertEmployee>): Promise<Employee | undefined>;
  getEmployeeById(id: string): Promise<Employee | undefined>;

  // Customer Management
  getCustomers(): Promise<Customer[]>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, updates: Partial<InsertCustomer>): Promise<Customer | undefined>;
  getCustomerById(id: string): Promise<Customer | undefined>;
  getTopCustomers(limit?: number): Promise<Customer[]>;
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

  // Financial Management
  async getTransactions(): Promise<Transaction[]> {
    try {
      return await db.select().from(transactions).orderBy(desc(transactions.date));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    try {
      const [newTransaction] = await db.insert(transactions).values(transaction).returning();
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    try {
      const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
      return transaction;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      return undefined;
    }
  }

  async getDailyRevenue(): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const result = await db
        .select({ total: sql<number>`sum(amount)` })
        .from(transactions)
        .where(
          and(
            eq(transactions.type, 'income'),
            sql`date >= ${today}`
          )
        );

      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error calculating daily revenue:', error);
      return 0;
    }
  }

  async getWeeklyRevenue(): Promise<number> {
    try {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const result = await db
        .select({ total: sql<number>`sum(amount)` })
        .from(transactions)
        .where(
          and(
            eq(transactions.type, 'income'),
            sql`date >= ${weekAgo}`
          )
        );

      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error calculating weekly revenue:', error);
      return 0;
    }
  }

  // Inventory Management
  async getProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const [newProduct] = await db.insert(products).values(product).returning();
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProductStock(id: string, quantity: number): Promise<Product | undefined> {
    try {
      const [updatedProduct] = await db
        .update(products)
        .set({ stockLevel: quantity })
        .where(eq(products.id, id))
        .returning();
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product stock:', error);
      return undefined;
    }
  }

  async getLowStockProducts(): Promise<Product[]> {
    try {
      return await db
        .select()
        .from(products)
        .where(sql`stock_level <= reorder_point`);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      return [];
    }
  }

  // Sales Management
  async getSales(): Promise<Sale[]> {
    try {
      return await db.select().from(sales).orderBy(desc(sales.date));
    } catch (error) {
      console.error('Error fetching sales:', error);
      return [];
    }
  }

  async createSale(sale: InsertSale, items: InsertSaleItem[]): Promise<Sale> {
    try {
      const [newSale] = await db.insert(sales).values(sale).returning();

      // Insert sale items
      await db.insert(saleItems).values(
        items.map(item => ({ ...item, saleId: newSale.id }))
      );

      return newSale;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw new Error('Failed to create sale');
    }
  }

  async getSaleById(id: string): Promise<Sale | undefined> {
    try {
      const [sale] = await db.select().from(sales).where(eq(sales.id, id));
      return sale;
    } catch (error) {
      console.error('Error fetching sale:', error);
      return undefined;
    }
  }

  async getSaleItems(saleId: string): Promise<SaleItem[]> {
    try {
      return await db.select().from(saleItems).where(eq(saleItems.saleId, saleId));
    } catch (error) {
      console.error('Error fetching sale items:', error);
      return [];
    }
  }

  // Employee Management
  async getEmployees(): Promise<Employee[]> {
    try {
      return await db.select().from(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    try {
      const [newEmployee] = await db.insert(employees).values(employee).returning();
      return newEmployee;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new Error('Failed to create employee');
    }
  }

  async updateEmployee(id: string, updates: Partial<InsertEmployee>): Promise<Employee | undefined> {
    try {
      const [updatedEmployee] = await db
        .update(employees)
        .set(updates)
        .where(eq(employees.id, id))
        .returning();
      return updatedEmployee;
    } catch (error) {
      console.error('Error updating employee:', error);
      return undefined;
    }
  }

  async getEmployeeById(id: string): Promise<Employee | undefined> {
    try {
      const [employee] = await db.select().from(employees).where(eq(employees.id, id));
      return employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      return undefined;
    }
  }

  // Customer Management
  async getCustomers(): Promise<Customer[]> {
    try {
      return await db.select().from(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    try {
      const [newCustomer] = await db.insert(customers).values(customer).returning();
      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async updateCustomer(id: string, updates: Partial<InsertCustomer>): Promise<Customer | undefined> {
    try {
      const [updatedCustomer] = await db
        .update(customers)
        .set(updates)
        .where(eq(customers.id, id))
        .returning();
      return updatedCustomer;
    } catch (error) {
      console.error('Error updating customer:', error);
      return undefined;
    }
  }

  async getCustomerById(id: string): Promise<Customer | undefined> {
    try {
      const [customer] = await db.select().from(customers).where(eq(customers.id, id));
      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return undefined;
    }
  }

  async getTopCustomers(limit: number = 10): Promise<Customer[]> {
    try {
      return await db
        .select()
        .from(customers)
        .orderBy(desc(customers.totalPurchases))
        .limit(limit);
    } catch (error) {
      console.error('Error fetching top customers:', error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();