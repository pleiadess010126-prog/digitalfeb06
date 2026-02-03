const dotenv = require('dotenv');
dotenv.config();

async function listAllVideos() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const headers = { 'X-Api-Key': apiKey };

    try {
        console.log('--- FETCHING ALL VIDEOS ---');
        const res = await fetch('https://api.heygen.com/v1/video.list?page_size=10', { headers });
        const data = await res.json();

        if (data.data && data.data.list) {
            data.data.list.forEach((v, i) => {
                console.log(`\n[${i + 1}] ID: ${v.video_id}`);
                console.log(`    Status: ${v.status} (2=Complete, 1=Processing, 3=Failed)`);
                console.log(`    URL: ${v.video_url || 'N/A'}`);
                console.log(`    Created: ${new Date(v.created_at * 1000).toLocaleString()}`);
            });
        } else {
            console.log('No videos found in V1 list.');
        }

        console.log('\n--- FETCHING V2 VIDEOS ---');
        const resV2 = await fetch('https://api.heygen.com/v2/video/list?limit=10', { headers });
        const dataV2 = await resV2.json();
        console.log(JSON.stringify(dataV2, null, 2));

    } catch (e) {
        console.error(e);
    }
}

listAllVideos();
