const dotenv = require('dotenv');
dotenv.config();

async function checkFailedVideos() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const ids = [
        'ed2b5290b16049f3901187cd12a9f4c7',
        '04f74b67be71473481723f6dddc8916d'
    ];

    for (const id of ids) {
        console.log(`\nChecking ID: ${id}`);
        const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    }
}

checkFailedVideos();
