const dotenv = require('dotenv');
dotenv.config();

async function getSingleUrl() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const id = '985cf78c9eea4b88b16bbb586a32e8b1';
    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
        headers: { 'X-Api-Key': apiKey }
    });
    const data = await res.json();
    console.log('--- URL FOR MISSION ---');
    console.log(data.data.video_url);
}

getSingleUrl();
