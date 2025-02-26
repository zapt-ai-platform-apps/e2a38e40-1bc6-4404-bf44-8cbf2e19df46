import { getDatabaseClient } from './_apiUtils.js';
import Sentry from './_sentry.js';
import { deceased } from '../drizzle/schema.js';
import { and, gte, lt } from 'drizzle-orm';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    console.log('Fetching deceased records from database');
    const db = getDatabaseClient();
    
    // Calculate the start and end of the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    
    console.log(`Filtering by date range: ${startOfMonth.toISOString()} to ${endOfMonth.toISOString()}`);
    
    // Query with date filter - only get records from the current month
    const result = await db.select()
      .from(deceased)
      .where(
        and(
          gte(deceased.dateOfDeath, startOfMonth.toISOString()),
          lt(deceased.dateOfDeath, endOfMonth.toISOString())
        )
      )
      .orderBy(deceased.dateOfDeath);
    
    console.log(`Retrieved ${result.length} deceased records for current month`);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching deceased records:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch deceased records' });
  }
}