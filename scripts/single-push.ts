import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const GLOBAL_VARIANTS = [
    {
        lang: 'English',
        region: 'Global',
        title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine 🚀',
        description: 'Meet DigitalMEng – the multi-tenant SaaS that automates your entire marketing department.\n\n🔥 FEATURES:\n- Autonomous AI Agents: Supervisor, SEO, & Social workers.\n\n#DigitalMEng #AIMarketing #SaaS',
        tags: ['AI Marketing', 'DigitalMEng']
    }
];

async function singlePush() {
    console.log('🏗️ Starting Single Manual Push...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    const client = createYouTubeClient(config);
    const videoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

    try {
        console.log('Downloading asset...');
        const response = await fetch(videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

        const variant = GLOBAL_VARIANTS[0];
        console.log(`📤 Uploading ${variant.lang}...`);

        const metadata = {
            title: variant.title,
            description: variant.description,
            privacyStatus: 'public' as const,
            tags: variant.tags,
            isShort: true
        };

        const result = await client.uploadVideo(metadata, videoBlob);
        console.log('Result:', result);
    } catch (err: any) {
        console.error('Error:', err.message);
    }
}

singlePush();
