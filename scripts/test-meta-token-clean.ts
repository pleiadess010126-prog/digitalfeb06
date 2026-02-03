
// Clean test script with NO dependencies on dotenv or local files
// Tests the specific token provided by the user against Instagram Basic Display API

async function run() {
    // 1. The Token
    const rawToken = 'IGAAWeo0neZACdBZAFk1M21iNkh0VHltNjhoT0pQVHFvUndWR1ppR3pyaGpydmkxS1JvcXhsWUh4dWIxbUxFVmkweEdiUDFmRjc5eTdiWDVyOFA4QXJqVmRubHh6bXIxbXJQVmNmY0ZAUR3JxQ184N0NZAZA1F3Yjg4ZAmFQM041VWQ3dwZDZD';
    const accessToken = rawToken.trim();

    console.log(`🔐 Testing Access Token: ${accessToken.substring(0, 10)}...${accessToken.substring(accessToken.length - 5)}`);

    // 2. Test Strategy:
    // IGAA tokens are for Instagram Basic Display API (graph.instagram.com)
    // They do NOT work on graph.facebook.com

    console.log('\n--- Test 1: Instagram Basic Display API (graph.instagram.com) ---');
    console.log('Target: https://graph.instagram.com/me');

    try {
        const res = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`);
        const status = res.status;
        console.log(`Status: ${status}`);

        if (res.ok) {
            const data = await res.json();
            console.log('✅ SUCCESS! This is a valid Instagram Basic Display Token.');
            console.log(JSON.stringify(data, null, 2));
            return; // We found it
        } else {
            const text = await res.text();
            console.log(`❌ Failed: ${text}`);
        }
    } catch (e: any) {
        console.log(`❌ Network Error: ${e.message}`);
    }

    console.log('\n--- Test 2: Facebook Graph API (graph.facebook.com) ---');
    console.log('Target: https://graph.facebook.com/me');

    try {
        const res = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`);
        const status = res.status;
        console.log(`Status: ${status}`);

        if (res.ok) {
            const data = await res.json();
            console.log('✅ SUCCESS! This is a valid Facebook Graph API Token.');
            console.log(JSON.stringify(data, null, 2));
        } else {
            const text = await res.text();
            console.log(`❌ Failed: ${text}`);
        }
    } catch (e: any) {
        console.log(`❌ Network Error: ${e.message}`);
    }
}

run().catch(console.error);
