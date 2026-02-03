import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function checkHeyGenAccount() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const headers = {
        'X-Api-Key': apiKey || '',
        'Content-Type': 'application/json'
    };

    const results: any = {};

    try {
        console.log('Fetching user info...');
        const userRes = await fetch('https://api.heygen.com/v1/user.info', { headers });
        results.userInfo = await userRes.json();

        console.log('Fetching video list...');
        const listRes = await fetch('https://api.heygen.com/v1/video.list', { headers });
        results.videoList = await listRes.json();

        fs.writeFileSync('heygen_debug_results.json', JSON.stringify(results, null, 2));
        console.log('Results saved to heygen_debug_results.json');
    } catch (err: any) {
        process.stderr.write(`Error: ${err.message}\n`);
    }
}

checkHeyGenAccount();
