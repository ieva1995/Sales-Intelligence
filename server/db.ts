import pkg from 'pg';
const { Pool } = pkg;
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

pool.on('connect', () => {
  console.log('Database connected successfully');
  console.log('Connection pool size:', pool.totalCount);
  retries = 5;
});

export const db = drizzle(pool);
export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};
export const dbPool = pool;