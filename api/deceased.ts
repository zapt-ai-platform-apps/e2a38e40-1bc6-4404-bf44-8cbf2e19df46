import { getDatabaseClient } from './_apiUtils.js';
import Sentry from './_sentry.js';
import { deceased } from '../drizzle/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    console.log('Fetching deceased records from database');
    const db = getDatabaseClient();
    const result = await db.select().from(deceased).orderBy(deceased.dateOfDeath);
    
    console.log(`Retrieved ${result.length} deceased records`);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching deceased records:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to fetch deceased records' });
  }
}