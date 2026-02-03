import { YouTubeClient, YouTubeConfig } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

/**
 * Script to upload a sample promotional video to YouTube
 */
async function uploadSampleVideo() {
    console.log('\n🚀 Starting Sample YouTube Upload...\n');

    // 1. Get credentials - prioritize CLI args, then .env
    const config: YouTubeConfig = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    // Check if credentials exist
    if (!config.apiKey || !config.accessToken || !config.channelId) {
        console.error('❌ Missing credentials! Please ensure you have these in your .env file:');
        console.log('   - YOUTUBE_API_KEY');
        console.log('   - YOUTUBE_ACCESS_TOKEN');
        console.log('   - YOUTUBE_CHANNEL_ID');
        console.log('\n   Or pass them as environment variables.');
        process.exit(1);
    }

    const client = new YouTubeClient(config);

    try {
        // 2. Test Connection
        console.log('🔄 Testing YouTube connection...');
        const test = await client.testConnection();
        if (!test.success) {
            console.error(`❌ Connection failed: ${test.message}`);
            process.exit(1);
        }
        console.log(`✅ ${test.message}\n`);

        // 3. Prepare Video Metadata
        const videoMetadata = {
            title: 'DigitalMEng: Your AI-Powered Marketing Engine 🚀',
            description: `Automate your marketing with DigitalMEng!
            
This is a sample promotional video uploaded automatically by the DigitalMEng AI Engine.
Scale your business across 20+ languages and multiple platforms.

#DigitalMEng #AIMarketing #Automation #DigitalMarketing #SaaS`,
            privacyStatus: 'public' as const,
            tags: ['AI', 'Marketing Automation', 'DigitalMEng', 'SaaS', 'Multilingual'],
            categoryId: '22', // People & Blogs
        };

        // 4. Get Video File (Fetch sample video)
        // Using a reliable sample video URL
        const sampleVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
        console.log(`🔄 Fetching sample video from: ${sampleVideoUrl}`);

        const response = await fetch(sampleVideoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch sample video: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

        console.log(`✅ Sample video fetched (${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)\n`);

        // 5. Upload Video
        console.log('📤 Preparing video upload to YouTube...');
        console.log('   Video Title:', videoMetadata.title);
        console.log('   Metadata size:', JSON.stringify(videoMetadata).length);

        console.log('🚀 Calling uploadVideo...');
        const uploadResult = await client.uploadVideo(videoMetadata, videoBlob);
        console.log('✅ uploadVideo call returned');

        if (uploadResult.success) {
            console.log('\n🎉 SUCCESS! Video uploaded successfully!');
            console.log('═══════════════════════════════════════');
            console.log(`🆔 Video ID:  ${uploadResult.videoId}`);
            console.log(`🔗 Video URL: ${uploadResult.videoUrl}`);
            console.log('═══════════════════════════════════════\n');
        } else {
            console.error(`❌ Upload failed: ${uploadResult.error}`);
        }

    } catch (error: any) {
        console.error(`\n❌ An error occurred: ${error.message}`);
        if (error.stack) console.debug(error.stack);
    }
}

// Run the upload
uploadSampleVideo();
