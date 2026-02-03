import { YouTubeClient, YouTubeConfig } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Script to upload a sample YouTube Short
 */
async function uploadSampleShort() {
    console.log('\n🚀 Starting Sample YouTube Short Upload...\n');

    // 1. Get credentials
    const config: YouTubeConfig = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    // Check if credentials exist
    if (!config.apiKey || !config.accessToken || !config.channelId) {
        console.error('❌ Missing credentials! Please ensure you have these in your .env.local file:');
        console.log('   - YOUTUBE_API_KEY');
        console.log('   - YOUTUBE_ACCESS_TOKEN');
        console.log('   - YOUTUBE_CHANNEL_ID');
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

        // 3. Prepare Short Metadata
        const shortMetadata = {
            title: 'DigitalMEng AI Short 🚀 #Shorts',
            description: `Automated Short from DigitalMEng Engine.
            
#DigitalMEng #AI #Shorts #Tech`,
            privacyStatus: 'public' as const,
            tags: ['AI', 'Shorts', 'DigitalMEng'],
            isShort: true // Important flag for our client wrapper
        };

        // 4. Get Vertical Video File (Fetch sample)
        // Using a vertical sample if available, otherwise tagging it #Shorts relies on the client wrapper's logic
        // Ideally we need a real vertical video. Let's use a small placeholder.
        // For this test, we'll download a small vertical video from a placeholder source if possible, or just use a small clip.
        // A known vertical sample:
        const sampleVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4'; // Often vertical assets

        console.log(`🔄 Fetching sample video from: ${sampleVideoUrl}`);

        const response = await fetch(sampleVideoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch sample video: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });

        console.log(`✅ Sample video fetched (${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)\n`);

        // 5. Upload Short
        console.log('📤 Preparing Short upload to YouTube...');
        console.log('   Title:', shortMetadata.title);

        const uploadResult = await client.uploadShort(shortMetadata, videoBlob);

        if (uploadResult.success) {
            console.log('\n🎉 SUCCESS! YouTube Short uploaded successfully!');
            console.log('═══════════════════════════════════════');
            console.log(`🆔 Video ID:  ${uploadResult.videoId}`);
            console.log(`🔗 Video URL: ${uploadResult.videoUrl}`);
            console.log('═══════════════════════════════════════\n');
        } else {
            console.error(`❌ Upload failed: ${uploadResult.error}`);
        }

    } catch (error: any) {
        console.error(`\n❌ An error occurred: ${error.message}`);
    }
}

// Run (if executed directly)
if (require.main === module) {
    uploadSampleShort();
}
