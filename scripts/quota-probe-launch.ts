import { createYouTubeClient } from '../src/lib/platforms/youtube';
import { MetaUtil } from '../src/lib/utils/meta';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

/**
 * Quota Probe & Auto-Launcher
 * Periodically checks if the YouTube upload limit has been lifted.
 * Once success is detected, it triggers the full 37-language global mission.
 */
async function runQuotaProbe() {
    console.log('🛡️ QUOTA PROBE ACTIVE: Monitoring YouTube API for limit reset...');

    const videoPath = 'sample_video.mp4';
    if (!fs.existsSync(videoPath)) {
        execSync('curl.exe -L -o sample_video.mp4 https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }

    let success = false;
    let attempts = 0;

    while (!success) {
        attempts++;
        console.log(`\n🔍 [Attempt ${attempts}] Probing YouTube API at ${new Date().toLocaleTimeString()}...`);

        // Refresh token before probe
        try {
            execSync('python scripts/refresh_token.py');
            dotenv.config({ override: true });
        } catch (e) {
            console.error('⚠️ Token refresh failed during probe');
        }

        const config = {
            apiKey: process.env.YOUTUBE_API_KEY || '',
            accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
            channelId: process.env.YOUTUBE_CHANNEL_ID || '',
        };

        const client = createYouTubeClient(config);
        const videoBuffer = fs.readFileSync(videoPath);
        const videoBlob = new Blob([videoBuffer], { type: 'video/mp4' });

        const metadata = {
            title: MetaUtil.optimizeTitle('DigitalMEng Quota Probe', 'youtube'),
            description: MetaUtil.generateDescription('Quota probe test for global launch.', ['Probe']),
            privacyStatus: 'unlisted' as const, // Listed as unlisted for testing
            tags: ['Probe'],
            isShort: true
        };

        try {
            const result = await client.uploadVideo(metadata, videoBlob);

            if (result.success) {
                console.log(`\n🎉 PROBE SUCCESS! Video live at: ${result.videoUrl}`);
                console.log('🚀 TRIGGERING FULL GLOBAL MISSION...');
                success = true;

                // Trigger the main mission
                try {
                    execSync('npx tsx scripts/global-37-shorts-launch.ts', { stdio: 'inherit' });
                } catch (missionErr) {
                    console.error('💥 Global Mission crashed after probe success.');
                }
            } else {
                if (result.error?.includes('Quota Reached')) {
                    console.log('⏸️ Quota still active. Waiting 30 minutes for next probe...');
                    await new Promise(r => setTimeout(r, 1800000)); // 30 minute wait
                } else {
                    console.error(`❌ Unexpected error during probe: ${result.error}`);
                    console.log('Re-trying in 5 minutes...');
                    await new Promise(r => setTimeout(r, 300000));
                }
            }
        } catch (err: any) {
            console.error('💥 Probe system crash:', err.message);
            await new Promise(r => setTimeout(r, 300000));
        }
    }
}

runQuotaProbe().catch(console.error);
