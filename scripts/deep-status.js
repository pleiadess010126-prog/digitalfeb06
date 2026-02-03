const dotenv = require('dotenv');
dotenv.config();

async function deepCheck() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const ids = [
        '80e05141842543e19be9d5ec2c501d45',
        '985cf78c9eea4b88b16bbb586a32e8b1'
    ];

    console.log('--- DEEP STATUS CHECK ---');
    for (const id of ids) {
        console.log(`\nChecking ID: ${id}`);
        // Try V1
        const resV1 = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const dataV1 = await resV1.json();
        console.log('V1 Response:', JSON.stringify(dataV1, null, 2));

        // Try V2
        const resV2 = await fetch(`https://api.heygen.com/v2/video/status?video_id=${id}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const dataV2 = await resV2.json().catch(() => ({}));
        console.log('V2 Response:', JSON.stringify(dataV2, null, 2));
    }
}

deepCheck();
