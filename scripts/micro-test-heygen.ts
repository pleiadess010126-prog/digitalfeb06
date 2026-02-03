import { HeyGenClient } from '../src/lib/platforms/heygen';
import dotenv from 'dotenv';

dotenv.config();

async function microTest() {
    console.log('🚀 TRIGGERING 5-SECOND MICRO-TEST...');
    const client = new HeyGenClient({ apiKey: process.env.HEYGEN_API_KEY || '' });

    const result = await client.generateVideo({
        title: 'DigitalMEng Sync Test',
        script: 'Hello. System check.', // Very short script
        dimension: 'vertical',
        avatarId: 'Abigail_expressive_2024112501',
        voiceId: 'd92994ae0de34b2e8659b456a2f388b8'
    });

    if (result.success) {
        console.log(`✅ Micro-test sent! Video ID: ${result.videoId}`);
        console.log(`📡 Checking V1 Status Link: https://api.heygen.com/v1/video_status.get?video_id=${result.videoId}`);
        console.log(`\nI will wait 3 minutes. Please refresh your "Video Generation" tab in 3 minutes.`);
    } else {
        console.error('❌ Failed:', result.error);
    }
}

microTest();
