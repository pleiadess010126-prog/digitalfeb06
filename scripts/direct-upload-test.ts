import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function directUpload() {
    console.log('🧪 Starting Direct YouTube Upload Test...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    console.log('Credentials Check:', {
        hasApiKey: !!config.apiKey,
        hasAccessToken: !!config.accessToken,
        hasChannelId: !!config.channelId
    });

    try {
        const client = createYouTubeClient(config);

        // 1. Verify connection first
        console.log('Checking connection...');
        const conn = await client.testConnection();
        console.log('Connection Result:', conn);

        if (!conn.success) {
            console.error('❌ Connection failed. Check your tokens.');
            return;
        }

        // 2. Prepare Sample Video
        console.log('Fetching sample video...');
        const videoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
        const response = await fetch(videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const videoBlob = new Blob([buffer], { type: 'video/mp4' });

        console.log('Uploading video...');
        const metadata = {
            title: 'DigitalMEng Global Launch Test 🚀',
            description: 'Testing internal marketing engine. #DigitalMEng #AI',
            privacyStatus: 'public' as const,
            isShort: true
        };

        const result = await client.uploadVideo(metadata, videoBlob);

        if (result.success) {
            console.log('✅ UPLOAD SUCCESSFUL!');
            console.log('Video ID:', result.videoId);
            console.log('Video URL:', result.videoUrl);
            fs.writeFileSync('upload_success.json', JSON.stringify(result, null, 2));
        } else {
            console.error('❌ UPLOAD FAILED:', result.error);
            fs.writeFileSync('upload_error.json', JSON.stringify(result, null, 2));
        }
    } catch (err: any) {
        console.error('💥 CRITICAL ERROR:', err.message);
        console.error(err.stack);
    }
}

directUpload();
