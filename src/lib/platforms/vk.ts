// VK (VKontakte) API Client
// Handles publishing to VK Walls and Communities

export interface VKConfig {
    accessToken: string;
    ownerId: string; // User ID or Group ID (prefixed with -)
    apiVersion?: string;
}

export interface VKPost {
    message: string;
    attachments?: string[]; // array of strings (e.g. photo123_456)
    services?: string; // e.g. 'twitter,facebook'
    lat?: number;
    long?: number;
    fromGroup?: 0 | 1;
}

export interface VKResponse {
    success: boolean;
    postId?: number;
    error?: string;
    errorCode?: number;
}

export class VKClient {
    private config: VKConfig;
    private baseUrl = 'https://api.vk.com/method';
    private defaultVersion = '5.131';

    constructor(config: VKConfig) {
        this.config = config;
    }

    /**
     * Post to Wall / Community
     */
    async postToWall(post: VKPost): Promise<VKResponse> {
        try {
            const params = new URLSearchParams({
                access_token: this.config.accessToken,
                owner_id: this.config.ownerId,
                message: post.message,
                attachments: post.attachments?.join(',') || '',
                from_group: (post.fromGroup ?? 1).toString(),
                v: this.config.apiVersion || this.defaultVersion,
            });

            const response = await fetch(`${this.baseUrl}/wall.post?${params.toString()}`, {
                method: 'POST',
            });
            const data = await response.json();

            if (data.response?.post_id) {
                return { success: true, postId: data.response.post_id };
            }

            if (data.error) {
                return {
                    success: false,
                    error: data.error.error_msg,
                    errorCode: data.error.error_code
                };
            }

            return { success: false, error: 'Unknown VK error' };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Get Community Stats
     */
    async getStats(): Promise<any> {
        try {
            const params = new URLSearchParams({
                access_token: this.config.accessToken,
                group_id: this.config.ownerId.replace('-', ''),
                v: this.config.apiVersion || this.defaultVersion,
            });

            const response = await fetch(`${this.baseUrl}/groups.getById?${params.toString()}`);
            const data = await response.json();

            return data.response?.[0] || null;
        } catch (error) {
            console.error('VK Stats Error:', error);
            return null;
        }
    }
}
