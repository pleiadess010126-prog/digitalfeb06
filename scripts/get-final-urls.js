const dotenv = require('dotenv');
dotenv.config();

async function getUrls() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const ids = [
        '80e05141842543e19be9d5ec2c501d45',
        '985cf78c9eea4b88b16bbb586a32e8b1'
    ];

    for (const id of ids) {
        const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const data = await res.json();
        if (data.data && data.data.video_url) {
            console.log(`\nID: ${id}`);
            console.log(`URL: ${data.data.video_url}`);
        } else {
            console.log(`\nID: ${id} - No URL found (Status: ${data.data?.status})`);
        }
    }
}

getUrls();
