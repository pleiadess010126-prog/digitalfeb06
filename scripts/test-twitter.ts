import { createTwitterClient } from '../src/lib/platforms/twitter';
import dotenv from 'dotenv';

dotenv.config();

async function testTwitter() {
    console.log('🐦 TESTING TWITTER/X INTEGRATION');
    console.log('===============================\n');

    const config = {
        apiKey: process.env.TWITTER_API_KEY || '',
        apiSecret: process.env.TWITTER_API_SECRET || '',
        accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
        bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
    };

    if (!config.apiKey || !config.accessToken) {
        console.log('❌ MISSING TWITTER CREDENTIALS in .env');
        console.log('Please add:');
        console.log('TWITTER_API_KEY=...');
        console.log('TWITTER_API_SECRET=...');
        console.log('TWITTER_ACCESS_TOKEN=...');
        console.log('TWITTER_ACCESS_TOKEN_SECRET=...');
        console.log('TWITTER_BEARER_TOKEN=...');
        return;
    }

    const client = createTwitterClient(config);

    console.log('🔍 Testing Connection...');
    const connection = await client.testConnection();
    console.log(connection.success ? `✅ ${connection.message}` : `❌ ${connection.message}`);

    if (connection.success) {
        console.log('\n📝 Posting Test Tweet...');
        const tweetResult = await client.postTweet({
            text: 'Testing the Digital Marketing Engine autonomous Twitter integration! 🚀 #DigitalMEng #AI #MarketingAutomation',
        });

        if (tweetResult.success) {
            console.log(`✅ Tweet Posted! URL: ${tweetResult.tweetUrl}`);
        } else {
            console.error(`❌ Post Failed: ${tweetResult.error}`);
        }
    }
}

testTwitter().catch(console.error);
