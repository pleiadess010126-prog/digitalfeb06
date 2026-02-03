
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
}

async function getInstagramDetails() {
    const accessToken = process.env.META_ACCESS_TOKEN;
    const userId = process.env.META_INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !userId) {
        console.error('❌ Missing credentials in .env.local');
        console.log(`Token: ${accessToken ? 'Present' : 'Missing'}`);
        console.log(`ID: ${userId ? 'Present' : 'Missing'}`);
        return;
    }

    console.log(`📸 Fetching details for Instagram ID: ${userId}`);
    console.log(`🔑 Using Token: ${accessToken.substring(0, 10)}...`);

    // Determine API endpoint based on token type
    // We will TRY to use the Graph API endpoint for everything first, 
    // because the user believes the token is updated/capable.

    // Always try Graph API first to check for followers
    let baseUrl = 'https://graph.facebook.com/v19.0';
    let fields = 'id,username,media_count,account_type,followers_count,follows_count,biography,website,profile_picture_url';

    if (accessToken.startsWith('IGAA')) {
        console.log('\nℹ️ Token starts with "IGAA" (typically Basic Display).');
        console.log('   Attempting to use it against Graph API to fetch Followers/Bio as requested...');
    }

    const url = `${baseUrl}/${userId}?fields=${fields}&access_token=${accessToken}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            console.log('\n✅ Instagram Profile Details:');
            console.log('-----------------------------');
            console.log(`👤 Username:      ${data.username}`);
            console.log(`🏷️ Account Type:  ${data.account_type}`);
            console.log(`📸 Media Count:   ${data.media_count}`);

            if (data.followers_count !== undefined) {
                console.log(`👥 Followers:     ${data.followers_count}`);
            }
            if (data.follows_count !== undefined) {
                console.log(`👀 Following:     ${data.follows_count}`);
            }
            if (data.biography) {
                console.log(`📝 Bio:           ${data.biography}`);
            }
            console.log('-----------------------------');
        } else {
            console.error('\n❌ API Error:');
            console.error(JSON.stringify(data, null, 2));
        }
    } catch (error: any) {
        console.error('\n❌ Network Error:', error.message);
    }
}

getInstagramDetails();
