const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

async function listV2() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const headers = { 'X-Api-Key': apiKey };
    let log = '';

    try {
        log += '--- TESTING V2 VIDEO LIST ---\n';
        const res = await fetch('https://api.heygen.com/v2/video/list?limit=5', { headers });
        log += `Status: ${res.status}\n`;
        const text = await res.text();
        log += `Body: ${text}\n`;

        fs.writeFileSync('v2_debug.log', log);
    } catch (e) {
        fs.writeFileSync('v2_debug.log', 'CRASH: ' + e.message);
    }
}

listV2();
