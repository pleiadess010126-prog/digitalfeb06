import { db } from '../src/lib/db/client';
import dotenv from 'dotenv';
dotenv.config();

async function checkCampaigns() {
    console.log('🔍 Checking campaigns in DB...');
    try {
        const campaigns = await db.getCampaignsByOrganization("demo_org_123");
        console.log('Total Campaigns:', campaigns.total);
        campaigns.items.forEach(c => {
            console.log(`- ${c.name} (${c.status}) [ID: ${c.id}]`);
        });

        const content = await db.getContentByOrganization("demo_org_123");
        console.log('\nTotal Content Items:', content.total);
        content.items.slice(0, 5).forEach(i => {
            console.log(`- ${i.title} (${i.status}) [URL: ${i.publishedUrl}]`);
        });
    } catch (err: any) {
        console.error('❌ Error checking DB:', err.message);
    }
}

checkCampaigns();
