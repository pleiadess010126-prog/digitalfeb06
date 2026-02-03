// WeChat Official Accounts API Client
// Handles publishing to WeChat News/Articles

export interface WeChatConfig {
    appId: string;
    appSecret: string;
    accessToken?: string;
    expiresAt?: number;
}

export interface WeChatArticle {
    title: string;
    author: string;
    digest: string;
    content: string;
    contentSourceUrl?: string;
    thumbMediaId: string; // WeChat requires a cover image media ID
    needOpenComment?: 0 | 1;
    onlyFansCanComment?: 0 | 1;
}

export interface WeChatResponse {
    success: boolean;
    mediaId?: string;
    error?: string;
    errorCode?: number;
}

export class WeChatClient {
    private config: WeChatConfig;
    private baseUrl = 'https://api.wechat.com/cgi-bin';

    constructor(config: WeChatConfig) {
        this.config = config;
    }

    /**
     * Get Access Token (Client Credentials Flow)
     */
    async refreshAccessToken(): Promise<string | null> {
        try {
            const url = `${this.baseUrl}/token?grant_type=client_credential&appid=${this.config.appId}&secret=${this.config.appSecret}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.access_token) {
                this.config.accessToken = data.access_token;
                this.config.expiresAt = Date.now() + (data.expires_in * 1000);
                return data.access_token;
            }
            return null;
        } catch (error) {
            console.error('WeChat Token Error:', error);
            return null;
        }
    }

    /**
     * Upload Image Media (Required for Articles)
     */
    async uploadMedia(filePath: string, type: 'image' | 'video' = 'image'): Promise<string | null> {
        // Implementation for WeChat multi-part form upload
        // In a real app, this would use FormData to upload the file to WeChat's servers
        return "mock_media_id_123";
    }

    /**
     * Create Draft Article
     */
    async createDraft(articles: WeChatArticle[]): Promise<WeChatResponse> {
        const token = this.config.accessToken || await this.refreshAccessToken();
        if (!token) return { success: false, error: 'Authentication failed' };

        try {
            const url = `${this.baseUrl}/draft/add?access_token=${token}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articles }),
            });
            const data = await response.json();

            if (data.media_id) {
                return { success: true, mediaId: data.media_id };
            }
            return { success: false, error: data.errmsg, errorCode: data.errcode };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Publish Article (from Draft)
     */
    async publish(mediaId: string): Promise<WeChatResponse> {
        const token = this.config.accessToken || await this.refreshAccessToken();
        if (!token) return { success: false, error: 'Authentication failed' };

        try {
            const url = `${this.baseUrl}/freepublish/submit?access_token=${token}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ media_id: mediaId }),
            });
            const data = await response.json();

            if (data.publish_id) {
                return { success: true, mediaId: data.publish_id };
            }
            return { success: false, error: data.errmsg, errorCode: data.errcode };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}
