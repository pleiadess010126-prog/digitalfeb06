import { HeyGenClient } from '../src/lib/platforms/heygen';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function generateCorrectedShort() {
    console.log('🎬 GENERATING CORRECTED SHORT FOR YOUTUBE');
    console.log('   - Model: Abigail');
    console.log('   - Voice: Aria (Female)');
    console.log('   - Branding: Digital Marketing Engine');
    console.log('   - Logo: Included');

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
        console.error('HEYGEN_API_KEY missing');
        return;
    }

    const client = new HeyGenClient({ apiKey });

    const result = await client.generateVideo({
        title: "Corrected Brand Short",
        script: "Welcome to the Digital Marketing Engine. This is a 100% verified asset with correct female voice and brand logo. We are ready.",
        dimension: 'vertical',
        imageUrl: "https://digitalmeng.com/logo.jpg"
    });

    if (result.success) {
        console.log(`\n✅ GENERATION INITIATED!`);
        console.log(`Video ID: ${result.videoId}`);
        fs.writeFileSync('corrected_vid_id.txt', result.videoId || '');
    } else {
        console.error(`❌ FAILED: ${result.error}`);
    }
}

generateCorrectedShort();
