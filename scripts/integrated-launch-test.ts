import { HeyGenClient } from '../src/lib/platforms/heygen';
import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function testIntegratedLaunch() {
    console.log('🚀 TESTING INTEGRATED AI VIDEO + YOUTUBE LAUNCH');

    const heygen = new HeyGenClient({ apiKey: process.env.HEYGEN_API_KEY || '' });
    const youtube = createYouTubeClient({
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    });

    const testVariant = {
        lang: 'English',
        title: 'DigitalMEng: The #1 Autonomous AI Marketing Engine! 🚀 #Shorts',
        script: 'Automate your marketing with DigitalMEng. The future of AI is here.',
        description: 'Stop wasting thousands on manual marketing. Meet DigitalMEng 🚀\n\nThe world\'s first autonomous AI Marketing Engine designed for global scale. \n\n🔥 KEY FEATURES:\n✅ Autonomous AI Agents (SEO, Social, Supervisor)\n✅ Multi-tenant SaaS Architecture\n✅ 20+ Language Market Bridge\n\nScale your brand across the globe while you sleep. \n\n🌐 Visit: https://digitalmeng.in\n\n#DigitalMEng #AIMarketing #SaaS #MarketingAutomation #AutonomousAgents #ArtificialIntelligence #SEO #GlobalSuccess #DigitalTransformation #Innovation #TechLaunch #StartupLife #BusinessGrowth #AIRevolution #Shorts #FutureOfWork',
        tags: ['AI Marketing', 'DigitalMEng', 'SaaS', 'Marketing Automation', 'Autonomous Agents', 'Shorts']
    };

    try {
        console.log(`\n1️⃣ [Video Engine] Creating vertical video for ${testVariant.lang}...`);
        let videoBlob: Blob;

        if (process.env.HEYGEN_API_KEY) {
            console.log('Using real HeyGen API...');
            const gen = await heygen.generateAndWait({
                title: testVariant.title,
                script: testVariant.script,
                dimension: 'vertical'
            });
            if (gen) {
                videoBlob = gen;
            } else {
                throw new Error('HeyGen generation failed');
            }
        } else {
            console.log('ℹ️ Simulating DigitalMEng Branding for Vertical Asset...');
            // In simulation, we point to our local branding file if possible, or a vertical placeholder
            const fallbackResponse = await fetch('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
            videoBlob = await fallbackResponse.blob();
        }

        console.log(`\n2️⃣ [YouTube Engine] Pushing Vertical Short to channel...`);
        const uploadResult = await youtube.uploadVideo({
            title: testVariant.title,
            description: testVariant.description,
            privacyStatus: 'public' as const,
            tags: testVariant.tags,
            isShort: true
        }, videoBlob);

        if (uploadResult.success) {
            console.log(`\n✅ MISSION SUCCESS!`);
            console.log(`Video ID: ${uploadResult.videoId}`);
            console.log(`URL: ${uploadResult.videoUrl}`);
        } else {
            console.error(`\n❌ UPLOAD FAILED: ${uploadResult.error}`);
        }

    } catch (err: any) {
        console.error(`\n💥 SYSTEM CRASH: ${err.message}`);
    }
}

testIntegratedLaunch();
