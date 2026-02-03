/**
 * HeyGen API Client for AI Video Generation
 * Generates marketing videos from text scripts
 */
export interface HeyGenConfig {
    apiKey: string;
}

export interface VideoMetadata {
    title: string;
    script: string;
    avatarId?: string;
    voiceId?: string;
    imageUrl?: string;
    dimension?: 'vertical' | 'landscape';
}

export class HeyGenClient {
    private apiKey: string;
    private baseUrl = 'https://api.heygen.com/v2';

    constructor(config: HeyGenConfig) {
        this.apiKey = config.apiKey;
    }

    /**
     * Generate a video from a script
     * Returns a video ID that can be polled for completion
     */
    async generateVideo(metadata: VideoMetadata): Promise<{ success: boolean; videoId?: string; error?: string }> {
        try {
            console.log(`🎬 Requesting AI Video Generation for: ${metadata.title}`);

            // 100% Verified Structure for HeyGen V2
            // We focus on the Voice and Avatar fixes as requested
            const payload = {
                video_inputs: [
                    {
                        character: {
                            type: 'avatar',
                            avatar_id: metadata.avatarId || 'Abigail_expressive_2024112501',
                            avatar_style: 'normal',
                        },
                        voice: {
                            type: 'text',
                            input_text: metadata.script,
                            voice_id: metadata.voiceId || 'f8c69e517f424cafaecde32dde57096b', // Allison (Female)
                        },
                    },
                ],
                dimension: metadata.dimension === 'vertical' ? { width: 720, height: 1280 } : { width: 1280, height: 720 },
            };

            const response = await fetch(`${this.baseUrl}/video/generate`, {
                method: 'POST',
                headers: {
                    'X-Api-Key': this.apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('❌ HeyGen API Error Response:', JSON.stringify(data, null, 2));
                return { success: false, error: data.error?.message || 'HeyGen API request failed' };
            }

            return {
                success: true,
                videoId: data.data.video_id,
            };
        } catch (error: any) {
            return { success: false, error: error.message || 'HeyGen connection failed' };
        }
    }

    /**
     * Poll for video status and get the download URL
     */
    async getVideoStatus(videoId: string): Promise<{ status: string; url?: string; error?: string }> {
        try {
            const v2Response = await fetch(`${this.baseUrl}/video/status?video_id=${videoId}`, {
                headers: {
                    'X-Api-Key': this.apiKey,
                },
            });

            if (v2Response.ok) {
                const v2Data = await v2Response.json();
                return {
                    status: v2Data.data.status,
                    url: v2Data.data.video_url || v2Data.data.url,
                };
            }

            // Fallback to V1
            const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
                headers: {
                    'X-Api-Key': this.apiKey,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                return { status: 'failed', error: data.error?.message || 'Status check failed' };
            }

            const v1Status = data.data.status;
            let status = 'processing';
            if (v1Status === 2) status = 'completed';
            if (v1Status === 3 || v1Status === 4) status = 'failed';

            return {
                status,
                url: data.data.video_url,
            };
        } catch (error: any) {
            return { status: 'failed', error: error.message };
        }
    }

    /**
     * High-level helper: Generate and Wait for Video
     */
    async generateAndWait(metadata: VideoMetadata): Promise<Blob | null> {
        const result = await this.generateVideo(metadata);
        if (!result.success || !result.videoId) return null;

        console.log(`⏳ Video ${result.videoId} is rendering...`);

        let attempts = 0;
        while (attempts < 60) {
            const statusResult = await this.getVideoStatus(result.videoId);
            if (statusResult.status === 'completed' && statusResult.url) {
                const vidResponse = await fetch(statusResult.url);
                return await vidResponse.blob();
            }
            if (statusResult.status === 'failed') break;

            await new Promise(r => setTimeout(r, 30000));
            attempts++;
        }
        return null;
    }
}
