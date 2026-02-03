const dotenv = require('dotenv');
dotenv.config();

async function checkSpec() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const id = '985cf78c9eea4b88b16bbb586a32e8b1';

    // Try V1 Status
    const resV1 = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${id}`, {
        headers: { 'X-Api-Key': apiKey }
    });
    const dataV1 = await resV1.json();
    console.log('V1 Status:', dataV1);

    // Try V2 Status
    const resV2 = await fetch(`https://api.heygen.com/v2/video/status?video_id=${id}`, {
        headers: { 'X-Api-Key': apiKey }
    });
    const dataV2 = await resV2.json();
    console.log('V2 Status:', dataV2);
}

checkSpec();
