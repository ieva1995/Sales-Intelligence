import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  statement_timeout: 10000,
  query_timeout: 10000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
});

let retries = 5;

pool.on('error', (err: any) => {
  console.error('Database connection error:', err);
  if (retries > 0) {
    retries--;
    console.log(`Retrying database connection... (${retries} attempts remaining)`);
    setTimeout(() => {
      pool.connect().catch(console.error);
    }, 5000);
  } else {
    console.error('Max database connection retries exceeded');
    process.exit(-1);
  }
});

// Add connection validation
pool.on('connect', () => {
  console.log('Database connected successfully');
  retries = 5; // Reset retries on successful connection
});

// Create Drizzle database instance
export const db = drizzle(pool);

// Also provide a raw query interface
export const query = (text: string, params?: any[]) => pool.query(text, params);

// Also export the pool for direct usage
export const dbPool = pool;