import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';

dotenv.config();

async function listRecentVideos() {
    console.log('🔍 Fetching recent videos from channel...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.channelId}&maxResults=5&order=date&type=video&key=${config.apiKey}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${config.accessToken}`,
            },
        });

        const data = await response.json();
        if (data.items) {
            console.log(`Found ${data.items.length} recent videos:`);
            data.items.forEach((item: any, i: number) => {
                console.log(`${i + 1}. [${item.id.videoId}] ${item.snippet.title} (Published: ${item.snippet.publishedAt})`);
            });
        } else {
            console.log('No videos found or error:', data.error?.message || data);
        }
    } catch (err: any) {
        console.error('Error:', err.message);
    }
}

listRecentVideos();
