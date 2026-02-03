const dotenv = require('dotenv');
dotenv.config();

async function run() {
    const apiKey = process.env.HEYGEN_API_KEY;
    console.log('Using API Key starts with:', apiKey.substring(0, 10));

    try {
        const response = await fetch('https://api.heygen.com/v1/user.info', {
            headers: { 'X-Api-Key': apiKey }
        });
        const text = await response.text();
        console.log('RESPONSE STATUS:', response.status);
        console.log('RESPONSE BODY:', text);
    } catch (e) {
        console.error('FETCH ERROR:', e);
    }
}
run();
