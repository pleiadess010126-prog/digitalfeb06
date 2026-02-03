
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

function rawEncode(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}

function generateNonce(): string {
    return crypto.randomBytes(16).toString('hex');
}

async function runTest() {
    console.log('🚀 X (Twitter) GET Check...');

    const keys = {
        consumer: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY || '',
        consumerSecret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET || '',
        token: process.env.TWITTER_ACCESS_TOKEN || '',
        tokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
    };

    const method = 'GET';
    const url = 'https://api.twitter.com/2/users/me';
    
    const oauthParams: Record<string, string> = {
        oauth_consumer_key: keys.consumer,
        oauth_nonce: generateNonce(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_token: keys.token,
        oauth_version: '1.0'
    };

    const parameterString = Object.keys(oauthParams).sort().map(k => `${rawEncode(k)}=${rawEncode(oauthParams[k])}`).join('&');
    const signatureBase = `${method}&${rawEncode(url)}&${rawEncode(parameterString)}`;
    const signingKey = `${rawEncode(keys.consumerSecret)}&${rawEncode(keys.tokenSecret)}`;
    const signature = crypto.createHmac('sha1', signingKey).update(signatureBase).digest('base64');
    const fullParams = { ...oauthParams, oauth_signature: signature };
    
    // Header params MUST be sorted and encoded
    const authHeader = 'OAuth ' + Object.entries(fullParams)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([k, v]) => `${rawEncode(k)}="${rawEncode(v)}"`)
        .join(', ');

    console.log('Testing GET /users/me...');
    const res = await fetch(url, {
        headers: { 'Authorization': authHeader }
    });

    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Body:', JSON.stringify(data, null, 2));
}

runTest().catch(console.error);
