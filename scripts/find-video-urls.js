const dotenv = require('dotenv');
dotenv.config();

async function findVideoUrl() {
    const apiKey = process.env.HEYGEN_API_KEY;
    // Last three known video IDs from the logs
    const ids = [
        'fa0666cbc4334e7c8149eee7da1e04d7',
        'ed2b5290b16049f3901187cd12a9f4c7',
        '04f74b67be71473481723f6dddc8916d'
    ];

    console.log('🔍 SEARCHING FOR GENERATED VIDEO URLS...');

    for (const id of ids) {
        console.log(`\nChecking ID: ${id}`);
        try {
            const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
                headers: { 'X-Api-Key': apiKey }
            });
            const data = await res.json();

            if (data.data && data.data.video_url) {
                console.log(`✅ FOUND! URL: ${data.data.video_url}`);
                console.log(`Status: ${data.data.status} (2 = Completed)`);
            } else {
                console.log(`⏳ Status: ${data.data?.status || 'Unknown'}. Still processing or not found.`);
            }
        } catch (e) {
            console.error(`Error checking ${id}:`, e.message);
        }
    }
}

findVideoUrl();
