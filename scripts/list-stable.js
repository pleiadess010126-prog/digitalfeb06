const dotenv = require('dotenv');
dotenv.config();

async function listV1() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const res = await fetch('https://api.heygen.com/v1/video.list?page_size=10', {
        headers: { 'X-Api-Key': apiKey }
    });
    const data = await res.json();
    console.log('--- RECENT VIDEOS (V1 LIST) ---');
    if (data.data && data.data.list) {
        data.data.list.forEach(v => {
            console.log(`ID: ${v.video_id}`);
            console.log(`Status: ${v.status}`);
            console.log(`URL: ${v.video_url}`);
            console.log('-------------------');
        });
    }
}

listV1();
