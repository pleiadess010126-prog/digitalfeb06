import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables if available locally (though we'll use input args ideally)
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
}

interface MetaConfig {
    accessToken: string;
    instagramAccountId: string;
    facebookPageId?: string;
}

class MetaValidator {
    private config: MetaConfig;
    private baseUrl = 'https://graph.facebook.com/v18.0';

    constructor(config: MetaConfig) {
        this.config = config;
    }

    async testConnection() {
        console.log('🚀 Starting Meta (Instagram/Facebook) Connection Test...\n');

        const results = {
            instagram: { success: false, message: 'Not checked' },
            facebook: { success: false, message: 'Not checked' }
        };

        // 1. Valid Access Token Check (Me endpoint)
        console.log('🔍 Verifying Access Token...');
        try {
            const meRes = await fetch(`${this.baseUrl}/me?access_token=${this.config.accessToken}`);
            const meData = await meRes.json();

            if (!meRes.ok) {
                console.error(`❌ Access Token Invalid: ${meData.error?.message}`);
                return results;
            }
            console.log(`✅ Token Valid. User: ${meData.name} (ID: ${meData.id})`);
        } catch (err: any) {
            console.error(`❌ Network Error checking token: ${err.message}`);
            return results;
        }

        // 2. Test Instagram Connection
        if (this.config.instagramAccountId) {
            console.log(`\n📸 Testing Instagram Account (ID: ${this.config.instagramAccountId})...`);
            try {
                // Determine API version based on token type (Basic Display vs Graph)
                // Basic Display uses graph.instagram.com, Graph uses graph.facebook.com
                // Since we are using graph.facebook.com here, we are assuming Graph API.
                // IGAA tokens are typically Basic Display... let's see.

                const igRes = await fetch(
                    `${this.baseUrl}/${this.config.instagramAccountId}?fields=username,biography,profile_picture_url&access_token=${this.config.accessToken}`
                );
                const igData = await igRes.json();

                if (igRes.ok) {
                    console.log(`✅ Instagram Connected!`);
                    console.log(`   - Username: @${igData.username}`);
                    results.instagram = { success: true, message: `Connected as @${igData.username}` };
                } else {
                    console.error(`❌ Instagram Check Failed: ${igData.error?.message}`);
                    results.instagram = { success: false, message: igData.error?.message };

                    // Fallback to Basic Display URL if Graph failed and token is IGAA
                    if (this.config.accessToken.startsWith('IGAA')) {
                        console.log('🔄 Retrying with Instagram Basic Display API (graph.instagram.com)...');
                        const basicRes = await fetch(
                            `https://graph.instagram.com/${this.config.instagramAccountId}?fields=username&access_token=${this.config.accessToken}`
                        );
                        const basicData = await basicRes.json();
                        if (basicRes.ok) {
                            console.log(`✅ Instagram Basic Display Connected!`);
                            console.log(`   - Username: @${basicData.username}`);
                        } else {
                            console.log(`❌ Basic Display Check also failed: ${basicData.error?.message}`);
                        }
                    }
                }
            } catch (err: any) {
                console.error('❌ Instagram Network Error');
            }
        }

        // 3. Test Facebook Page Connection
        if (this.config.facebookPageId) {
            console.log(`\n📘 Testing Facebook Page (ID: ${this.config.facebookPageId})...`);
            try {
                const fbRes = await fetch(
                    `${this.baseUrl}/${this.config.facebookPageId}?fields=name,followers_count&access_token=${this.config.accessToken}`
                );
                const fbData = await fbRes.json();

                if (fbRes.ok) {
                    console.log(`✅ Facebook Connected!`);
                    console.log(`   - Page Name: ${fbData.name}`);
                    results.facebook = { success: true, message: `Connected to ${fbData.name}` };
                } else {
                    console.error(`❌ Facebook Check Failed: ${fbData.error?.message}`);
                    results.facebook = { success: false, message: fbData.error?.message };
                }
            } catch (err: any) {
                console.error('❌ Facebook Network Error');
            }
        }

        return results;
    }
}

// --- Main Execution ---
async function run() {
    console.log('🔒 Using provided Access Token from chat...');

    // Config via provided token
    const config: MetaConfig = {
        accessToken: 'IGAAWsV51Nm1tBZAFlIQmRkd2hVMlpLOUJ2OE1DUVdvSGpVdkk0SmVIX0RaWks1cTJBeGhxUThyT0hERVY1S0JaZAG8xVTFFdi00Y2RHMnVEdzNCMTRBREg5SDhMWnhwN2NGTV90dXJ5WWE4eE04SGt0SlNtdXktM1FQelhaR3p0QQZDZD',
        instagramAccountId: '',
        facebookPageId: ''
    };

    // Auto discover 
    try {
        console.log('\n🕵️‍♂️ Auto-discovering linked accounts...');
        // 1. Fetch Pages (Graph API)
        const accountsRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${config.accessToken}`);

        console.log(`Debug - /me/accounts status: ${accountsRes.status}`);
        if (accountsRes.ok) {
            const data = await accountsRes.json();
            if (data.data?.length > 0) {
                console.log(`✅ Found ${data.data.length} FB Pages. Using first one.`);
                config.facebookPageId = data.data[0].id;
                console.log(`   - Selected Page: ${data.data[0].name} (${config.facebookPageId})`);
            }
        } else {
            const txt = await accountsRes.text();
            console.log(`⚠️ /me/accounts Failed Body: ${txt}`);
        }

        // 2. Identify Token User (likely IG user if IGAA token)
        const meRes = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${config.accessToken}`);
        if (meRes.ok) {
            const meData = await meRes.json();
            console.log(`ℹ️ Token Owner (FB Graph): ${meData.name} (ID: ${meData.id})`);
        } else {
            console.log(`⚠️ FB Graph /me failed: ${meRes.status}`);

            // Check Basic Display API
            const meBasicRes = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${config.accessToken}`);
            if (meBasicRes.ok) {
                const meBasicData = await meBasicRes.json();
                console.log(`ℹ️ Token Owner (IG Basic Display): @${meBasicData.username} (ID: ${meBasicData.id})`);
                config.instagramAccountId = meBasicData.id;
            } else {
                const txt = await meBasicRes.text();
                console.log(`⚠️ IG Basic Display /me Failed Body: ${txt}`);
            }
        }

    } catch (e: any) { console.log('Discovery logging error', e.message); }

    const validator = new MetaValidator(config);
    await validator.testConnection();
}

run().catch(console.error);
