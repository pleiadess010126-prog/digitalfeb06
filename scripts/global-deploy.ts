import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const GLOBAL_VARIANTS = [
    {
        lang: 'English',
        title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine 🚀',
        description: 'Meet DigitalMEng – the multi-tenant SaaS that automates marketing.\n\n#DigitalMEng #AI #SaaS',
        tags: ['AI Marketing', 'DigitalMEng']
    },
    {
        lang: 'Spanish',
        title: 'DigitalMEng: El Primer Motor de Marketing de IA Autónomo 🚀',
        description: 'Descubre DigitalMEng – el SaaS que automatiza el marketing.\n\n#DigitalMEng #IA #SaaS',
        tags: ['IA Marketing', 'DigitalMEng']
    }
];

async function run() {
    console.log('🚀 STARTING MISSION-CRITICAL DEPLOY...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    const client = createYouTubeClient(config);
    const videoPath = 'sample_video.mp4';

    if (!fs.existsSync(videoPath)) {
        console.error('File not found!');
        return;
    }

    const videoBuffer = fs.readFileSync(videoPath);
    const videoBlob = new Blob([videoBuffer], { type: 'video/mp4' });

    for (const variant of GLOBAL_VARIANTS) {
        console.log(`\n📤 Uploading ${variant.lang} Version...`);
        const metadata = {
            title: variant.title,
            description: variant.description,
            privacyStatus: 'public' as const,
            tags: variant.tags,
            isShort: true
        };

        const result = await client.uploadVideo(metadata, videoBlob);

        if (result.success) {
            console.log(`✅ SUCCESS [${variant.lang}]: ${result.videoUrl} (ID: ${result.videoId})`);
        } else {
            console.error(`❌ FAILURE [${variant.lang}]: ${result.error}`);
        }
    }
}

run().catch(err => {
    console.error('CRASH:', err);
});
