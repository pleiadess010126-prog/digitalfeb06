import { db } from './src/lib/db/client';

async function testDb() {
    console.log('Testing DB Client...');
    try {
        const orgId = 'demo_org_123';
        const result = await db.getContentByOrganization(orgId);
        console.log('Content Result:', JSON.stringify(result, null, 2));
        console.log('Total:', result.total);
    } catch (e) {
        console.error('DB Test Failed:', e);
    }
}

testDb();
