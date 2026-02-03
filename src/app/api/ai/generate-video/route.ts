import { NextRequest, NextResponse } from 'next/server';
import { HeyGenClient } from '@/lib/platforms/heygen';

export async function POST(request: NextRequest) {
    try {
        const { title, script, dimension, organizationId } = await request.json();
        const apiKey = process.env.HEYGEN_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'HeyGen API Key not configured' }, { status: 500 });
        }

        const client = new HeyGenClient({ apiKey });

        console.log(`🎬 API: Generating video for mission: ${title}`);

        const result = await client.generateVideo({
            title,
            script,
            dimension: dimension || 'vertical',
            avatarId: 'Abigail_expressive_2024112501',
            voiceId: 'f8c69e517f424cafaecde32dde57096b'
        });

        if (result.success) {
            // Optional: Log to DB here if organizationId provided
            return NextResponse.json({
                success: true,
                videoId: result.videoId,
                message: 'Video rendering initiated'
            });
        } else {
            return NextResponse.json({
                success: false,
                error: result.error
            }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Video Gen API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
