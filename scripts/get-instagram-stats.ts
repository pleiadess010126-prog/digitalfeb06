
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function getInstagramStats() {
    const token = process.env.META_ACCESS_TOKEN;
    const userId = process.env.META_INSTAGRAM_ACCOUNT_ID;

    console.log('📸 Fetching Instagram Stats...');
    console.log('Token:', token ? (token.substring(0, 10) + '...') : 'NOT SET');
    console.log('User ID:', userId || 'NOT SET');

    if (!token) {
        console.error('❌ META_ACCESS_TOKEN not found in .env.local');
        return;
    }

    // Try Basic Display API first (for IGAA tokens)
    const basicUrl = `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${token}`;

    console.log('\n--- Calling Instagram Basic Display API ---');

    try {
        const response = await fetch(basicUrl);
        const data = await response.json();

        if (data.error) {
            console.error('❌ API Error:', data.error.message);
            console.error('Code:', data.error.code);
        } else {
            console.log('\n✅ Instagram Account Details:');
            console.log('================================');
            console.log(`👤 Username: @${data.username}`);
            console.log(`🆔 Account ID: ${data.id}`);
            console.log(`📊 Account Type: ${data.account_type}`);
            console.log(`📝 Total Posts: ${data.media_count}`);
            console.log('================================');

            // Note about followers
            console.log('\n⚠️ Note: Follower count is NOT available via Basic Display API.');
            console.log('   To get followers, you need:');
            console.log('   1. Instagram Business/Creator Account');
            console.log('   2. Connected to a Facebook Page');
            console.log('   3. Graph API token (starts with EAA...)');
        }
    } catch (e: any) {
        console.error('❌ Network Error:', e.message);
    }
}

getInstagramStats();
