import { HeyGenClient } from '../src/lib/platforms/heygen';
import dotenv from 'dotenv';
dotenv.config();

async function freeTierTest() {
    console.log('🚀 TRIGGERING COMPATIBLE VIDEO TEST (720p)...');
    const client = new HeyGenClient({ apiKey: process.env.HEYGEN_API_KEY || '' });

    const result = await client.generateVideo({
        title: 'DigitalMEng V2 Compatible Test',
        script: 'This is a test of the DigitalMEng autonomous engine. We are now running on compatible resolution.',
        dimension: 'vertical',
        avatarId: 'Abigail_expressive_2024112501',
        voiceId: 'd92994ae0de34b2e8659b456a2f388b8'
    });

    if (result.success) {
        console.log(`✅ Success! Video ID: ${result.videoId}`);
        console.log('⏳ Wait 5-10 minutes. It should now appear in your Projects tab.');
    } else {
        console.error('❌ Still failing:', result.error);
    }
}

freeTierTest();
