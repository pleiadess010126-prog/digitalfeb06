const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

async function listAllVideos() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const headers = { 'X-Api-Key': apiKey };
    let output = '';

    try {
        output += '--- FETCHING ALL VIDEOS ---\n';
        const res = await fetch('https://api.heygen.com/v1/video.list?page_size=10', { headers });
        const data = await res.json();

        if (data.data && data.data.list) {
            data.data.list.forEach((v, i) => {
                output += `\n[${i + 1}] ID: ${v.video_id}\n`;
                output += `    Status: ${v.status} (2=Complete, 1=Processing, 3=Failed)\n`;
                output += `    URL: ${v.video_url || 'N/A'}\n`;
                output += `    Created: ${new Date(v.created_at * 1000).toLocaleString()}\n`;
            });
        }

        output += '\n--- V2 LIST ---\n';
        const resV2 = await fetch('https://api.heygen.com/v2/video/list?limit=10', { headers });
        const dataV2 = await resV2.json();
        output += JSON.stringify(dataV2, null, 2);

        fs.writeFileSync('heygen_history.log', output);
        console.log('Saved to heygen_history.log');
    } catch (e) {
        fs.writeFileSync('heygen_history.log', 'ERROR: ' + e.message);
    }
}

listAllVideos();
