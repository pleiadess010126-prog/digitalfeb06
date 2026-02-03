import dotenv from 'dotenv';
dotenv.config();

async function testKey() {
    const key = process.env.HEYGEN_API_KEY;
    try {
        const response = await fetch('https://api.heygen.com/v2/voices', {
            headers: { 'X-Api-Key': key || '' }
        });
        const data = await response.json();
        if (data.data && data.data.voices) {
            console.log('Available Voices:');
            data.data.voices.slice(0, 5).forEach((v: any) => console.log(`- ${v.voice_id} (${v.name})`));
        } else {
            console.log('Error:', data);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

testKey();
