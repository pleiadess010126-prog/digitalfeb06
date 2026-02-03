import { YouTubeClient, YouTubeConfig } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';

dotenv.config();

async function testYouTube() {
    const config: YouTubeConfig = {
        apiKey: (process.env.YOUTUBE_API_KEY || '').trim(),
        accessToken: (process.env.YOUTUBE_ACCESS_TOKEN || '').trim(),
        channelId: (process.env.YOUTUBE_CHANNEL_ID || '').trim(),
    };

    console.log('--- START TEST ---');
    console.log(`API Key: [${config.apiKey.substring(0, 8)}...]`);
    console.log(`Token: [${config.accessToken.substring(0, 10)}...]`);
    console.log(`Channel: [${config.channelId}]`);

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${config.channelId}&key=${config.apiKey}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${config.accessToken}`,
            },
        });

        const data = await response.json();
        console.log('Status Code:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));

        if (response.ok && data.items && data.items.length > 0) {
            console.log('\n✅ SUCCESS: Connected to', data.items[0].snippet.title);
        } else if (!response.ok) {
            console.log('\n❌ FAILED:', data.error?.message || 'Unknown error');
        } else {
            console.log('\n❓ No items found for this channel ID.');
        }

    } catch (err: any) {
        console.error('\n💥 FETCH ERROR:', err.message);
    }
}

testYouTube();
