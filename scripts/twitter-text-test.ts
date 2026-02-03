
import crypto from 'crypto';

function rawEncode(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}

async function runTest() {
    console.log('🚀 X (Twitter) Text-Credential Debugger...');

    const keys = {
        consumer: 'Cluo6mLNpf6OyB7TdnsDpd1Em',
        consumerSecret: 'z0dFCSrcTJ70Cz0tDnHO6mzKafoyhwFkPeBXKtHzD7MRNmXfYz',
        token: '2015789918359015425-otQWZd9XfzFyoixXtcovjX33WvY0iu',
        tokenSecret: 'A7xwFbimT7aMg4PKglXE1SnFN60lUzYCTUrH67gZprVMW'
    };

    const method = 'GET';
    const url = 'https://api.twitter.com/2/users/me';

    const oauthParams: Record<string, string> = {
        oauth_consumer_key: keys.consumer,
        oauth_nonce: Math.random().toString(36).substring(2),
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
    const authHeader = 'OAuth ' + Object.entries(fullParams).sort(([k1], [k2]) => k1.localeCompare(k2)).map(([k, v]) => `${rawEncode(k)}="${rawEncode(v)}"`).join(', ');

    const res = await fetch(url, { headers: { 'Authorization': authHeader } });
    console.log('Status (with Text Consumer Keys):', res.status);
    const data = await res.json();
    console.log('Body:', JSON.stringify(data, null, 2));
}

runTest().catch(console.error);
