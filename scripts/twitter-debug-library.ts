
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
    console.log('🚀 X (Twitter) Library Debugger...');

    const oauth = new OAuth({
        consumer: {
            key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY || '',
            secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET || '',
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64');
        },
    });

    const token = {
        key: process.env.TWITTER_ACCESS_TOKEN || '',
        secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    };

    const request_data = {
        url: 'https://api.twitter.com/2/users/me',
        method: 'GET',
    };

    const authHeader = oauth.toHeader(oauth.authorize(request_data, token));

    console.log('Testing GET /users/me with Library...');
    const res = await fetch(request_data.url, {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        }
    });

    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Body:', JSON.stringify(data, null, 2));

    if (res.status === 200) {
        console.log('✅ Library Verification Success!');
    } else {
        console.log('❌ Library Verification Failed. Status:', res.status);
    }
}

runTest().catch(console.error);
