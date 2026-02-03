import { NextRequest, NextResponse } from 'next/server';
import { createYouTubeClient } from '@/lib/platforms/youtube';
import { HeyGenClient } from '@/lib/platforms/heygen';
import { db } from '@/lib/db/client';

import { MetaUtil } from '@/lib/utils/meta';

const GLOBAL_VARIANTS = [
    {
        lang: 'English',
        region: 'Global',
        title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine!',
        script: 'Meet DigitalMEng. The world\'s first multi-tenant SaaS that automates your entire marketing department. Autonomous AI agents, global market bridges, and 24/7 SEO growth. This is the future of marketing.',
        baseDescription: 'Meet DigitalMEng – the multi-tenant SaaS that automates your entire marketing department.',
        customTags: ['AIStartup', 'TechLaunch']
    },
    {
        lang: 'Spanish',
        region: 'LatAm/Spain',
        title: 'DigitalMEng: ¡El Primer Motor de Marketing de IA Autónomo del Mundo!',
        script: 'Descubre DigitalMEng. El primer SaaS multi-inquilino que automatiza todo tu departamento de marketing. Agentes de IA autónomos, puentes de mercado global y crecimiento SEO las 24 horas. El futuro es ahora.',
        baseDescription: 'Descubre DigitalMEng – el SaaS multi-inquilino que automatiza todo tu departamento de marketing.',
        customTags: ['Innovación', 'MarketingDigital']
    }
];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { organizationId, apiKey, accessToken, channelId } = body;

        // 1. Get Credentials
        const config = {
            apiKey: apiKey || process.env.YOUTUBE_API_KEY || '',
            accessToken: accessToken || process.env.YOUTUBE_ACCESS_TOKEN || '',
            channelId: channelId || process.env.YOUTUBE_CHANNEL_ID || '',
        };

        if (!config.apiKey || !config.accessToken || !config.channelId) {
            return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 });
        }

        console.log('🌍 Starting GLOBAL YouTube Push with AI Video Gen...');
        const client = createYouTubeClient(config);
        const heygen = new HeyGenClient({ apiKey: process.env.HEYGEN_API_KEY || '' });

        // 2. Setup Campaign (proactive)
        let campaignId = 'global_self_promo_2026';
        try {
            const campaigns = await db.getCampaignsByOrganization(organizationId);
            const existing = campaigns.items.find(c => c.name.includes('Global Launch'));
            if (existing) {
                campaignId = existing.id;
            } else {
                const newCampaign = await db.createCampaign({
                    organizationId,
                    name: "DigitalMEng 2026 Global Launch",
                    description: "Automated global self-promotion campaign with AI Video Gen.",
                    status: 'active',
                    createdBy: "system",
                    settings: {
                        websiteUrl: "https://digitalmeng.ai",
                        targetAudience: "Global Businesses",
                        industry: "MarTech",
                        keywords: ["AI", "Global Marketing"],
                        velocity: { month1: 10, month2: 20, month3: 30 },
                        contentTypes: { blog: true, youtube: true, instagram: true, facebook: true },
                        autoPublish: true,
                        requireApproval: false,
                        schedulingPreferences: { preferredDays: ['monday'], preferredTimes: ['09:00'], timezone: 'UTC' }
                    },
                    metrics: { totalContent: 0, publishedContent: 0, pendingContent: 0, totalViews: 0, totalEngagement: 0, riskScore: 0 }
                });
                campaignId = newCampaign.id;
            }
        } catch (e: any) {
            console.warn('⚠️ Campaign setup failed:', e.message);
        }

        const results = [];

        // 3. Process Localized Variants
        for (const variant of GLOBAL_VARIANTS) {
            console.log(`🎬 Generating AI Video for ${variant.lang}...`);

            // Enrich Metadata via MetaUtil (Gaps Closed)
            const richTitle = MetaUtil.optimizeTitle(variant.title, 'youtube');
            const richDescription = MetaUtil.generateDescription(variant.baseDescription, variant.customTags);
            const richTags = [...variant.customTags, 'DigitalMEng', 'Shorts'];

            let videoBlob: Blob;

            // Step A: Generate AI Video via HeyGen (Vertical 9:16)
            if (process.env.HEYGEN_API_KEY) {
                const genResult = await heygen.generateAndWait({
                    title: richTitle,
                    script: variant.script,
                    dimension: 'vertical'
                });
                if (genResult) {
                    videoBlob = genResult;
                } else {
                    console.error(`❌ HeyGen failed for ${variant.lang}, using fallback asset.`);
                    const fallback = await fetch('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                    videoBlob = await fallback.blob();
                }
            } else {
                console.log(`ℹ️ No HeyGen API Key. Simulating vertical asset for ${variant.lang}...`);
                const fallback = await fetch('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                videoBlob = await fallback.blob();
            }

            // Step B: Upload to YouTube as a Short
            const metadata = {
                title: richTitle,
                description: richDescription,
                privacyStatus: 'public' as const,
                tags: richTags,
                isShort: true
            };

            const uploadResult = await client.uploadVideo(metadata, videoBlob);

            if (uploadResult.success) {
                results.push({ lang: variant.lang, url: uploadResult.videoUrl, videoId: uploadResult.videoId });

                // Track in DB
                try {
                    await db.createContent({
                        organizationId,
                        campaignId,
                        title: richTitle,
                        content: richDescription,
                        type: 'youtube-short',
                        status: 'published',
                        metadata: {
                            seoScore: 98,
                            wordCount: richDescription.length,
                            readingTime: 1,
                            keywords: richTags,
                            topicPillar: 'Global Promotion',
                            aiGenerated: true,
                            provider: 'HeyGen'
                        },
                        performance: { views: 0, engagement: 0, shares: 0, comments: 0, dwellTime: 0, bounceRate: 0, conversions: 0 },
                        publishedAt: new Date(),
                        publishedUrl: uploadResult.videoUrl,
                        platforms: [{
                            platform: 'youtube',
                            postId: uploadResult.videoId || '',
                            postUrl: uploadResult.videoUrl || '',
                            publishedAt: new Date(),
                            status: 'success'
                        }],
                        createdBy: 'system'
                    });
                } catch (dbErr: any) {
                    console.error(`❌ DB logging failed for ${variant.lang}:`, dbErr.message);
                }
            } else {
                results.push({ lang: variant.lang, error: uploadResult.error });
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Global campaign initiated!',
            results
        });

    } catch (error: any) {
        console.error('❌ Global Push Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
