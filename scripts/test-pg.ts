
import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg'; // Standard pg, not Serverless for this test

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function check() {
    console.log('Testing Raw PG Connection...');
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.error('No DATABASE_URL');
        return;
    }
    console.log('URL starts with:', url.substring(0, 15) + '...');

    const pool = new Pool({
        connectionString: url,
        ssl: { rejectUnauthorized: false } // Typical for Neon/Cloud DBs
    });

    try {
        const res = await pool.query('SELECT NOW() as now');
        console.log('✅ Connected! Time:', res.rows[0].now);
        await pool.end();
    } catch (e: any) {
        console.error('❌ Connection Failed:', e.message);
    }
}

check();
