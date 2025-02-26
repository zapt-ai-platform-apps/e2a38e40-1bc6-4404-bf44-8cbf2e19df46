import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function getDatabaseClient() {
  const connectionString = process.env.COCKROACH_DB_URL;
  if (!connectionString) {
    throw new Error('Missing COCKROACH_DB_URL environment variable');
  }
  
  const client = postgres(connectionString);
  return drizzle(client);
}