const body = {
    organizationId: "demo_org_123",
    apiKey: "YOUR_YOUTUBE_API_KEY",
    accessToken: "YOUR_YOUTUBE_ACCESS_TOKEN",
    channelId: "YOUR_YOUTUBE_CHANNEL_ID"
};

async function trigger() {
    console.log('🚀 Triggering YouTube push via API route...');
    try {
        const response = await fetch('http://localhost:3000/api/youtube/push-sample', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Error triggering API:', err.message);
    }
}

trigger();
