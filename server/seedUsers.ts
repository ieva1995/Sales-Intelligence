import { db } from './db';
import { users } from '@shared/schema';
import { sql } from 'drizzle-orm';

// Create initial users for testing
export async function seedUsers() {
  try {
    // Check if users already exist using SQL count
    const existingUsersResult = await db.select({
      count: sql<number>`count(*)`
    }).from(users);

    if (existingUsersResult[0].count > 0) {
      console.log('Users already exist, skipping seeding');
      return;
    }

    // Create admin user
    await db.insert(users).values({
      email: 'admin@salesboost.ai',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      avatar: 'A'
    });

    // Create sales rep user
    await db.insert(users).values({
      email: 'rep@salesboost.ai',
      name: 'Sales Rep',
      role: 'rep',
      status: 'active',
      avatar: 'S'
    });

    console.log('Successfully seeded users');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}