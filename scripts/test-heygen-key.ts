import dotenv from 'dotenv';
dotenv.config();

async function testKey() {
    const key = process.env.HEYGEN_API_KEY;
    try {
        const response = await fetch('https://api.heygen.com/v2/avatars', {
            headers: { 'X-Api-Key': key || '' }
        });
        const data = await response.json();
        if (data.data && data.data.avatars) {
            console.log('Available Avatars:');
            data.data.avatars.slice(0, 5).forEach((a: any) => console.log(`- ${a.avatar_id} (${a.gender})`));
        } else {
            console.log('Error:', data);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

testKey();
