
import { createTwitterClient } from '../src/lib/platforms/twitter';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
    console.log('🚀 Starting X (Twitter) Production Post Test...');

    const config = {
        apiKey: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY || '',
        apiSecret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET || '',
        accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
        bearerToken: process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN || '',
    };

    console.log('Validating Credentials Status:');
    console.log('- Consumer Key:', !!config.apiKey);
    console.log('- Consumer Secret:', !!config.apiSecret);
    console.log('- Access Token:', !!config.accessToken);
    console.log('- Access Token Secret:', !!config.accessTokenSecret);

    if (!config.apiKey || !config.apiSecret || !config.accessToken || !config.accessTokenSecret) {
        console.error('❌ Missing required OAuth 1.0a credentials in .env.local');
        return;
    }

    const client = createTwitterClient(config as any);

    // 1. First, check if the Bearer token can still find our user (for analytics check)
    if (config.bearerToken) {
        console.log('\nStep 1: Checking profile via Bearer Token...');
        try {
            const conn = await client.testConnection();
            console.log('Result:', JSON.stringify(conn, null, 2));
        } catch (e: any) {
            console.warn('Bearer connection failed (this might be normal for some tiers):', e.message);
        }
    }

    // 2. The Main Event: Attempt to Post a Tweet
    const testMessage = 'Hello world! 🚀 This is the first autonomous post from my internal DigitalMEng dashboard. Integration successful! #AI #MarketingAutomation #' + new Date().getTime();

    console.log('\nStep 2: Attempting to POST tweet:');
    console.log('Message:', testMessage);

    try {
        const result = await client.postTweet({
            text: testMessage
        });

        console.log('\n--- X API RESPONSE ---');
        console.log(JSON.stringify(result, null, 2));
        console.log('----------------------');

        if (result.success) {
            console.log('\n✅ BOOM! Tweet successfully posted.');
            console.log('View it at:', result.tweetUrl);
        } else {
            console.log('\n❌ Posting failed.');
            console.log('Reason:', result.error);

            if (result.error?.includes('403')) {
                console.log('\n💡 Tip: Check if your App has "Read and Write" permissions enabled in the User Authentication Settings of the X Developers Portal.');
            }
        }
    } catch (e: any) {
        console.error('\n🚨 Execution error:', e.message);
    }
}

runTest().catch(console.error);
