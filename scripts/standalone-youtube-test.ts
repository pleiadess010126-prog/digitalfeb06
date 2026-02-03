import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';

// Load environment variables from .env.local
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config();
}

console.log('🚀 Starting Standalone YouTube Short Test...');

// --- Inline YouTube Client ---

interface YouTubeConfig {
    apiKey: string;
    accessToken: string;
    channelId: string;
}

interface YouTubeVideo {
    title: string;
    description: string;
    categoryId?: string;
    tags?: string[];
    privacyStatus: 'public' | 'unlisted' | 'private';
    isShort?: boolean;
}

class SimpleYouTubeClient {
    private config: YouTubeConfig;
    private baseUrl = 'https://www.googleapis.com/youtube/v3';
    private uploadUrl = 'https://www.googleapis.com/upload/youtube/v3';

    constructor(config: YouTubeConfig) {
        this.config = config;
    }

    async testPublicAccess() {
        try {
            // Try to fetch a random public video or channel with JUST the API Key
            const url = `${this.baseUrl}/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=1&key=${this.config.apiKey}`;
            console.log(`📡 Testing Public API Key: ${url}`);

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                return { success: true, message: 'API Key is VALID (Public access works)', data };
            }
            return { success: false, message: 'API Key appears INVALID', error: data };
        } catch (error: any) {
            return { success: false, message: 'Network error checking API Key', error };
        }
    }

    async testConnection() {
        try {
            const url = `${this.baseUrl}/channels?part=snippet&id=${this.config.channelId}&key=${this.config.apiKey}`;
            console.log(`📡 Fetching: ${url}`);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.config.accessToken}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.items && data.items.length > 0) {
                    return {
                        success: true,
                        message: `Connected to channel: ${data.items[0].snippet.title}`,
                    };
                }
                return {
                    success: false,
                    message: 'Channel not found. Verify your Channel ID.',
                    data
                };
            }

            return {
                success: false,
                message: data.error?.message || `API error: ${response.status}`,
                error: data
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || 'Connection failed',
                error
            };
        }
    }

    async uploadShort(video: YouTubeVideo, videoFile: Blob) {
        try {
            // Step 1: Metadata
            const metadata = {
                snippet: {
                    title: video.title,
                    description: video.description,
                    tags: video.tags || [],
                    categoryId: video.categoryId || '22',
                },
                status: {
                    privacyStatus: video.privacyStatus,
                    selfDeclaredMadeForKids: false,
                },
            };

            // Step 2: Upload
            const formData = new FormData();
            formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            formData.append('video', videoFile);

            console.log('📤 Sending upload request...');
            const response = await fetch(
                `${this.uploadUrl}/videos?uploadType=multipart&part=snippet,status&key=${this.config.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.config.accessToken}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error?.message || 'Upload failed',
                    data
                };
            }

            return {
                success: true,
                videoId: data.id,
                videoUrl: `https://youtube.com/shorts/${data.id}`,
                data
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Upload failed',
                exception: error
            };
        }
    }
}

// --- Main Execution ---

async function run() {
    // 1. Check Credentials
    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    console.log('🔑 Credentials loaded:');
    console.log(`   - API Key: ${config.apiKey ? '✅ Found' : '❌ Missing'}`);
    console.log(`   - Access Token: ${config.accessToken ? '✅ Found' : '❌ Missing'}`);
    console.log(`   - Channel ID: ${config.channelId ? '✅ Found' : '❌ Missing'}`);

    if (!config.apiKey || !config.accessToken || !config.channelId) {
        console.error('❌ Missing credentials in .env.local');
        return;
    }

    const client = new SimpleYouTubeClient(config);

    // 2. Test API Key (Public)
    console.log('\n🔍 Verifying API Key...');
    const publicTest = await client.testPublicAccess();
    console.log(publicTest.message);
    if (!publicTest.success) {
        console.error('❌ API Key is invalid. Please check your Google Cloud Console.');
        console.error('Error:', JSON.stringify(publicTest.error, null, 2));
        // We continue anyway to check the token, but it's good to know.
    } else {
        console.log('✅ API Key is good.');
    }

    // 3. Test Connection (Auth)
    console.log('\n🔄 Testing Connection...');
    const connResult = await client.testConnection();
    console.log('Connection Result:', JSON.stringify(connResult, null, 2));

    if (!connResult.success) {
        console.error('❌ Connection failed, aborting upload.');
        return;
    }

    // 3. Upload Sample Short
    console.log('\n📥 Fetching Sample Vertical Video...');
    // Using a reliable solid color video sample or similar if external URL fails
    const sampleVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'; // Not vertical, but works for test

    try {
        const vidResponse = await fetch(sampleVideoUrl);
        const arrayBuffer = await vidResponse.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'video/mp4' });

        console.log(`✅ Video fetched: ${blob.size} bytes`);

        const shortMetadata = {
            title: 'DigitalMEng Auto-Short Test 🚀 #Shorts',
            description: 'Automated test upload #DigitalMEng',
            privacyStatus: 'private' as const, // Safer for testing
            tags: ['test', 'shorts'],
            isShort: true
        };

        console.log('\n🚀 Uploading Short...');
        const uploadResult = await client.uploadShort(shortMetadata, blob);

        console.log('Upload Result:', JSON.stringify(uploadResult, null, 2));

        if (uploadResult.success) {
            console.log('\n✨ SUCCESS! Video uploaded.');
            console.log(`🔗 URL: ${uploadResult.videoUrl}`);
        } else {
            console.log('\n❌ Upload Failed.');
        }

    } catch (err) {
        console.error('❌ Error during video fetch/upload:', err);
    }
}

run().catch(console.error);
