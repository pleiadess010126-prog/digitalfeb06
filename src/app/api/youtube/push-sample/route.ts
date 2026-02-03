import { NextRequest, NextResponse } from 'next/server';
import { createYouTubeClient } from '@/lib/platforms/youtube';
import { db } from '@/lib/db/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { organizationId, apiKey, accessToken, channelId } = body;

        // 1. Get Credentials (prioritize request body, then .env as fallback for demo)
        const config = {
            apiKey: apiKey || process.env.YOUTUBE_API_KEY || '',
            accessToken: accessToken || process.env.YOUTUBE_ACCESS_TOKEN || '',
            channelId: channelId || process.env.YOUTUBE_CHANNEL_ID || '',
        };

        if (!config.apiKey || !config.accessToken || !config.channelId) {
            return NextResponse.json(
                { success: false, error: 'Missing YouTube credentials. Please configure them in Settings.' },
                { status: 400 }
            );
        }

        console.log('🚀 Starting Application-side YouTube Upload...');
        const client = createYouTubeClient(config);

        // 2. Fetch Sample Video
        console.log('🎥 Fetching sample promotional video...');
        const videoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
        const videoResponse = await fetch(videoUrl);

        if (!videoResponse.ok) {
            throw new Error(`Failed to fetch sample video: ${videoResponse.statusText}`);
        }

        const videoBlob = await videoResponse.blob();
        console.log(`✅ Sample video fetched (${(videoBlob.size / 1024 / 1024).toFixed(2)} MB)`);

        // 3. Define Metadata
        const videoMetadata = {
            title: 'DigitalMEng: Your AI-Powered Marketing Engine 🚀',
            description: `Experience the future of marketing with DigitalMEng. 
            
Autonomous AI Agents
Multi-tenant SaaS Architecture
GEO (Generative Engine Optimization)
Global Market Bridges (China/WeChat & Russia/VK)

Published automatically via DigitalMEng Engine.
#DigitalMEng #AI #MarketingAutomation #SaaS #YouTubeShorts`,
            privacyStatus: 'public' as const,
            tags: ['AI', 'Marketing', 'Automation', 'SaaS', 'DigitalMEng'],
            isShort: true
        };

        // 4. Upload Video
        console.log('📤 Uploading video to YouTube...');
        const uploadResult = await client.uploadVideo(videoMetadata, videoBlob);

        if (uploadResult.success) {
            console.log('✅ Upload Successful:', uploadResult.videoUrl);

            // Log activity if orgId is provided
            if (organizationId) {
                await db.logActivity({
                    organizationId,
                    userId: 'system',
                    action: 'youtube.sample_push',
                    entityType: 'content',
                    entityId: uploadResult.videoId || 'unknown',
                    metadata: { url: uploadResult.videoUrl }
                });
            }

            return NextResponse.json({
                success: true,
                message: 'Sample video pushed successfully!',
                videoId: uploadResult.videoId,
                videoUrl: uploadResult.videoUrl
            });
        } else {
            console.error('❌ Upload Failed:', uploadResult.error);
            return NextResponse.json(
                { success: false, error: uploadResult.error || 'Upload failed' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('❌ YouTube Push Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
