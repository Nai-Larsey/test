import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from './schema';

// Required for local development with WebSockets
if (process.env.NODE_ENV !== 'production') {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });



