import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// During build time on Vercel, DATABASE_URL might be missing. 
// We provide a fallback or skip initialization to prevent a build crash.
const client = neon(connectionString || "postgresql://placeholder:placeholder@localhost:5432/placeholder");

export const db = drizzle(client, { schema });


