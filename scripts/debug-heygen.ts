import dotenv from 'dotenv';

dotenv.config();

async function checkHeyGenAccount() {
    console.log('🔍 DEBUGGING HEYGEN ACCOUNT & HISTORY...');

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
        console.error('❌ No API Key found.');
        return;
    }

    const headers = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };

    try {
        // 1. Check User Info / Credits
        console.log('\n--- 🎫 ACCOUNT INFO ---');
        const userRes = await fetch('https://api.heygen.com/v1/user.info', { headers });
        const userData = await userRes.json();
        console.log(JSON.stringify(userData, null, 2));

        // 2. Check Recent Video List (V1)
        console.log('\n--- 🎬 RECENT VIDEOS (V1 List) ---');
        const listRes = await fetch('https://api.heygen.com/v1/video.list?page_size=5', { headers });
        const listData = await listRes.json();
        console.log(JSON.stringify(listData, null, 2));

        // 3. Check V2 Video List (if available)
        console.log('\n--- 🎬 RECENT VIDEOS (V2 List) ---');
        const listV2Res = await fetch('https://api.heygen.com/v2/video/list?limit=5', { headers });
        const listV2Data = await listV2Res.json();
        console.log(JSON.stringify(listV2Data, null, 2));

    } catch (err: any) {
        console.error('💥 ERROR DURING DEBUG:', err.message);
    }
}

checkHeyGenAccount();
