import { YouTubeClient, YouTubeConfig } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';

dotenv.config();

async function testYouTube() {
    const config: YouTubeConfig = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    console.log('Testing with:');
    console.log('API Key:', config.apiKey.substring(0, 5) + '...');
    console.log('Channel ID:', config.channelId);

    const client = new YouTubeClient(config);

    // 1. Test specific channel
    console.log('\n--- Testing Specific Channel ID ---');
    const result = await client.testConnection();
    console.log('Result:', result);

    // 2. Test "mine" channel
    console.log('\n--- Testing "mine" Channel (Token Ownership) ---');
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key=${config.apiKey}`,
            {
                headers: {
                    Authorization: `Bearer ${config.accessToken}`,
                },
            }
        );
        const data = await response.json();
        if (response.ok) {
            if (data.items && data.items.length > 0) {
                console.log('Token belongs to channel:', data.items[0].snippet.title);
                console.log('Channel ID:', data.items[0].id);
            } else {
                console.log('Token is valid but no channel found for this user.');
            }
        } else {
            console.log('Mine check failed:', data.error?.message || response.statusText);
        }
    } catch (err: any) {
        console.log('Mine check error:', err.message);
    }
}

testYouTube();
