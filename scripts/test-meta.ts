import { MetaGraphAPIClient } from '../src/lib/platforms/metaGraphAPI';
import dotenv from 'dotenv';

dotenv.config();

async function testMeta() {
    console.log('🏁 STARTING META (FACEBOOK/INSTAGRAM) CONNECTION TEST...');

    const config = {
        appId: process.env.META_APP_ID || '',
        appSecret: process.env.META_APP_SECRET || '',
        accessToken: process.env.META_ACCESS_TOKEN || '',
        instagramAccountId: process.env.INSTAGRAM_ACCOUNT_ID || '',
        facebookPageId: process.env.FACEBOOK_PAGE_ID || '',
    };

    if (!config.appId || !config.accessToken) {
        console.error('❌ ERROR: Missing META_APP_ID or META_ACCESS_TOKEN in .env');
        console.log('Please provide your Meta credentials to proceed with testing.');
        return;
    }

    const client = new MetaGraphAPIClient(config);

    try {
        console.log('\n1️⃣ [Step 1] Debugging User Access Token...');
        const tokenInfo = await client.getUserInfo();
        console.log(`✅ Success! Connected as: ${tokenInfo.name} (ID: ${tokenInfo.id})`);

        console.log('\n2️⃣ [Step 2] Fetching Accessible Pages & Instagram Accounts...');
        const pages = await client.getUserPages();

        if (pages.length === 0) {
            console.warn('⚠️ No Facebook Pages found for this user.');
        } else {
            console.log(`Found ${pages.length} pages:`);
            pages.forEach(p => {
                console.log(`- Page: ${p.name} (ID: ${p.id})`);
                if (p.instagramBusinessAccount) {
                    console.log(`  └─ Instagram: @${p.instagramBusinessAccount.username} (ID: ${p.instagramBusinessAccount.id})`);
                } else {
                    console.log('  └─ No linked Instagram Business Account found.');
                }
            });
        }

        if (config.instagramAccountId) {
            console.log(`\n3️⃣ [Step 3] Fetching Target Instagram Account Details (@${config.instagramAccountId})...`);
            const igInfo = await client.getInstagramAccountInfo(config.instagramAccountId);
            console.log(`✅ Instagram Account: @${igInfo.username}`);
            console.log(`📊 Stats: ${igInfo.followersCount} followers, ${igInfo.mediaCount} posts`);
        }

        console.log('\n🏁 CONNECTION TEST COMPLETE.');
    } catch (err: any) {
        console.error(`\n💥 MISSION CRASH: ${err.message}`);
        if (err.message.includes('token')) {
            console.log('💡 TIP: Your Meta Access Token might be expired or invalid.');
        }
    }
}

testMeta();
