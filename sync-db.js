const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

async function syncDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('CRITICAL: DATABASE_URL is not defined in .env');
    process.exit(1);
  }

  console.log('--- Database Sync Process Started ---');
  
  try {
    const rawSql = neon(connectionString);
    
    const sqlPath = path.join(process.cwd(), 'drizzle-migrations', '0000_dazzling_network.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Replace "CREATE TABLE" with "CREATE TABLE IF NOT EXISTS"
    let modifiedSql = sqlContent
      .replace(/CREATE TABLE "/g, 'CREATE TABLE IF NOT EXISTS "');

    const statements = modifiedSql.split('--> statement-breakpoint');
    console.log(`Found ${statements.length} SQL statements to execute.`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        try {
          // IMPORTANT: Use .query() for plain strings in @neondatabase/serverless
          await rawSql.query(statement);
          console.log(`Statement ${i + 1} succeeded.`);
        } catch (stmtError) {
          if (stmtError.message.includes('already exists')) {
            console.log(`Statement ${i + 1} skipped (already exists).`);
          } else {
            console.error(`ERROR in statement ${i + 1}:`, stmtError.message);
            throw stmtError;
          }
        }
      }
    }

    console.log('--- Database Sync Completed! 🎉 ---');
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.exit(0);
  } catch (error) {
    console.error('--- SYNC FAILED ---');
    console.error('Final Error Message:', error.message);
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.exit(1);
  }
}

syncDatabase();
