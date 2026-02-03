const dotenv = require('dotenv');
dotenv.config();

async function run() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const videoId = '04f74b67be71473481723f6dddc8916d'; // From the previous successful run

    try {
        console.log('--- CHECKING V2 STATUS ---');
        const v2Res = await fetch(`https://api.heygen.com/v2/video/status?video_id=${videoId}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        console.log('V2 STATUS:', v2Res.status, await v2Res.text());

        console.log('\n--- CHECKING V1 STATUS ---');
        const v1Res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        console.log('V1 STATUS:', v1Res.status, await v1Res.text());
    } catch (e) {
        console.error(e);
    }
}
run();
