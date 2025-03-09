import { query } from "./db";
import { 
  trends, predictions, alerts,
  transactions, products, sales,
  saleItems, employees, customers,
  users, loginTokens, sessions,
  news
} from "@shared/schema";
import { sql } from "drizzle-orm";

export async function createTables() {
  try {
    console.log('Creating database tables if they do not exist...');

    // Create users table
    await query(sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        avatar TEXT,
        last_login TIMESTAMP,
        status TEXT NOT NULL DEFAULT 'active',
        device_fingerprint TEXT,
        last_ip_address TEXT,
        created TIMESTAMP NOT NULL DEFAULT NOW(),
        updated TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create login_tokens table
    await query(sql`
      CREATE TABLE IF NOT EXISTS login_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        device_fingerprint TEXT,
        ip_address TEXT,
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create sessions table
    await query(sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        token_hash TEXT NOT NULL,
        device_fingerprint TEXT,
        ip_address TEXT,
        user_agent TEXT,
        expires_at TIMESTAMP NOT NULL,
        last_activity TIMESTAMP NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create other necessary tables
    await query(sql`
      CREATE TABLE IF NOT EXISTS trends (
        id SERIAL PRIMARY KEY,
        keyword TEXT NOT NULL,
        interest INTEGER NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        region TEXT NOT NULL,
        metadata JSONB
      )
    `);

    await query(sql`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        keyword TEXT NOT NULL,
        predicted_interest INTEGER NOT NULL,
        confidence INTEGER NOT NULL,
        timestamp TIMESTAMP NOT NULL
      )
    `);

    await query(sql`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        keyword TEXT NOT NULL,
        threshold INTEGER NOT NULL,
        active BOOLEAN NOT NULL DEFAULT TRUE
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  }
}