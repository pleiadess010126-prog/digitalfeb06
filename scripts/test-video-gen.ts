import { HeyGenClient } from '../src/lib/platforms/heygen';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function testVideoGeneration() {
    console.log('🎬 STARTING HEYGEN VIDEO GENERATION TEST...');
    console.log('This will create a real AI video asset for DigitalMEng.');

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
        console.error('❌ ERROR: HEYGEN_API_KEY not found in .env');
        return;
    }

    const client = new HeyGenClient({ apiKey });

    // Test Project: High-impact Global Launch Short
    const metadata = {
        title: 'DigitalMEng Global Pilot Test',
        script: 'Welcome to the future of commerce. DigitalMEng is now live. We are bridging global markets with autonomous AI marketing agents. From India to the world - the engine is active.',
        dimension: 'vertical' as const, // For YouTube Shorts / Instagram Reels
        avatarId: 'Abigail_expressive_2024112501', // Your verified expressive avatar
        voiceId: 'd92994ae0de34b2e8659b456a2f388b8'   // Your verified professional voice
    };

    try {
        console.log('\n⏳ Step 1: Initiating Video Generation...');
        const result = await client.generateVideo(metadata);

        if (!result.success || !result.videoId) {
            console.error('❌ Failed to start generation:', result.error);
            return;
        }

        const videoId = result.videoId;
        console.log(`✅ Generation started! Video ID: ${videoId}`);
        console.log('⏳ Now polling for completion (this usually takes 2-5 minutes)...');

        let completed = false;
        let attempts = 0;
        const maxAttempts = 20; // 10 minutes max

        while (!completed && attempts < maxAttempts) {
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds

            console.log(`\n🔍 [Check ${attempts}] Checking status for ${videoId}...`);
            const status = await client.getVideoStatus(videoId);

            if (status.status === 'completed' && status.url) {
                console.log('\n🎉 VIDEO READY!');
                console.log(`🔗 Download URL: ${status.url}`);

                // Optional: Save URL to a local file for easy access
                const outputPath = path.join(process.cwd(), 'latest_test_video.json');
                fs.writeFileSync(outputPath, JSON.stringify({
                    videoId,
                    url: status.url,
                    timestamp: new Date().toISOString()
                }, null, 2));

                console.log(`📝 URL saved to: ${outputPath}`);
                console.log('\n👉 Instructions: Paste the download URL into your browser to watch the video.');
                completed = true;
            } else if (status.status === 'failed') {
                console.error('❌ Generation failed on HeyGen side:', status.error);
                break;
            } else {
                console.log('...Still rendering...');
            }
        }

        if (!completed) {
            console.warn('\n⚠️ Timeout: Video is still rendering. You can check it later in your HeyGen dashboard.');
        }

    } catch (err: any) {
        console.error('\n💥 TEST CRASHED:', err.message);
    }
}

testVideoGeneration();
