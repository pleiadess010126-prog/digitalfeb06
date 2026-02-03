const dotenv = require('dotenv');
dotenv.config();

async function runCorrected() {
    const apiKey = process.env.HEYGEN_API_KEY;
    const payload = {
        video_inputs: [
            {
                character: {
                    type: 'avatar',
                    avatar_id: 'Abigail_expressive_2024112501',
                    avatar_style: 'normal',
                },
                voice: {
                    type: 'text',
                    input_text: "Welcome to the Digital Marketing Engine. This video features the correct female voice and the full professional brand name.",
                    voice_id: 'f8c69e517f424cafaecde32dde57096b', // Allison
                },
            },
        ],
        dimension: { width: 720, height: 1280 },
    };

    const res = await fetch('https://api.heygen.com/v2/video/generate', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}

runCorrected();
