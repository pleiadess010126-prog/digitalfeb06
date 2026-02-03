
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
}

async function attemptPostToInstagram() {
    const accessToken = process.env.META_ACCESS_TOKEN;
    const userId = process.env.META_INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !userId) {
        console.error('❌ Missing credentials in .env.local');
        return;
    }

    console.log(`🚀 Attempting to post to Instagram Account ID: ${userId}`);
    console.log(`🔑 Token Type Check: ${accessToken.startsWith('IGAA') ? 'Basic Display (IGAA)' : 'Graph API (EAA)'}`);

    if (accessToken.startsWith('IGAA')) {
        console.error('\n❌ CRITICAL: You are using an "Instagram Basic Display" token (IGAA...).');
        console.error('   This type of token allows READING profile info but CANNOT PUBLISH posts.');
        console.error('   To post, you MUST generate a Graph API Token (starts with "EAA...") with "instagram_content_publish" permission.');

        // We will TRY anyway just to show the API error response as proof
        console.log('\n--- Demonstating Failure ---');
    }

    // Creating a media container is the first step for Graph API publishing
    const url = `https://graph.facebook.com/v19.0/${userId}/media`;

    // Simple image post parameters (must be a public URL)
    const params = new URLSearchParams({
        image_url: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2', // A nice tech placeholder image
        caption: 'Hello World from DigitalMEng! 🚀 #automation',
        access_token: accessToken
    });

    try {
        console.log('📤 Sending POST request to create media container...');
        const res = await fetch(`${url}?${params}`, { method: 'POST' });
        const data = await res.json();

        if (res.ok) {
            console.log('✅ Success! Media Container Created ID:', data.id);
            console.log('   (Note: To complete the post, we would need to call /media_publish next, but this first step confirms capability)');
        } else {
            console.log('\n❌ API Error Response:');
            console.log(JSON.stringify(data, null, 2));

            if (data.error?.code === 190 || data.error?.message?.includes('access token')) {
                console.log('\n👉 VERDICT: This confirms the token is invalid for Publishing.');
            }
        }
    } catch (error: any) {
        console.error('❌ Network Error:', error.message);
    }
}

attemptPostToInstagram();
