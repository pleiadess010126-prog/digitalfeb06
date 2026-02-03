const triggerBody = {
    organizationId: "demo_org_123",
    apiKey: "YOUR_YOUTUBE_API_KEY",
    accessToken: "YOUR_YOUTUBE_ACCESS_TOKEN",
    channelId: "YOUR_YOUTUBE_CHANNEL_ID"
};

async function trigger() {
    console.log('🌍 Launching GLOBAL Self-Promotion Campaign...');
    try {
        const response = await fetch('http://localhost:3000/api/youtube/push-global', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(triggerBody)
        });

        const result = await response.json();
        console.log('\n--- CAMPAIGN STATUS ---');
        console.log(JSON.stringify(result, null, 2));
    } catch (err: any) {
        console.error('Error launching campaign:', err.message);
    }
}

trigger();
