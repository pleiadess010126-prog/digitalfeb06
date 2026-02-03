
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
    console.log('--- TIME SYNC CHECK ---');
    console.log('Local Time:', new Date().toISOString());

    const res = await fetch('https://api.twitter.com/2/tweets', { method: 'OPTIONS' });
    console.log('X Server Time:', res.headers.get('date'));
    console.log('-----------------------');
}

runTest().catch(console.error);
