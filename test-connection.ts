import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const connectionString = process.env.DATABASE_URL!;
  console.log('Testing connection to:', connectionString.substring(0, 30) + '...');
  
  try {
    const sql = neon(connectionString);
    const result = await sql`SELECT 1 as connected`;
    console.log('Successfully connected:', result);
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

testConnection();
