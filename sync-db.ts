import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function syncDatabase() {
  const connectionString = process.env.DATABASE_URL!;
  console.log('Syncing database...');

  try {
    const sql = neon(connectionString);
    
    // Read the generated SQL file
    const sqlPath = path.join(process.cwd(), 'drizzle-migrations', '0000_dazzling_network.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split by statement-breakpoint if needed, but here let's try raw execution
    // Note: Drizzle's breakpoint is --> statement-breakpoint
    const statements = sqlContent.split('--> statement-breakpoint');

    for (const statement of statements) {
      const trimmed = statement.trim();
      if (trimmed) {
        console.log('Executing statement...');
        await sql(trimmed);
      }
    }

    console.log('Database synced successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

syncDatabase();
