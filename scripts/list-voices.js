const dotenv = require('dotenv');
dotenv.config();

async function listVoices() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const res = await fetch('https://api.heygen.com/v2/voices', {
        headers: { 'X-Api-Key': apiKey }
    });
    const data = await res.json();
    console.log('--- AVAILABLE VOICES (V2) ---');
    if (data.data && data.data.voices) {
        data.data.voices.slice(0, 10).forEach(v => {
            console.log(`Name: ${v.name} (${v.gender})`);
            console.log(`ID: ${v.voice_id}`);
            console.log('-------------------');
        });
    } else {
        console.log('No voices found or error:', data);
    }
}

listVoices();
