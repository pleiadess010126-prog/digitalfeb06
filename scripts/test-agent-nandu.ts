
async function testAgentNandu() {
    console.log('🚀 Testing Agent Nandu (Backend API)...\n');

    // 1. Health Check
    console.log('💓 Sending GET request (Health Check)...');
    try {
        const healthRes = await fetch('http://localhost:3000/api/nandu');
        const healthData = await healthRes.json();
        console.log('✅ Health Status:', healthData);
    } catch (e: any) {
        console.error('❌ Health Check Failed:', e.message);
    }

    console.log('\n----------------------------------------\n');

    // 2. Chat Request (Simulation Mode likely)
    const testMessage = "How do I create a new post?";
    console.log(`💬 Sending POST request with message: "${testMessage}"...`);

    try {
        const chatRes = await fetch('http://localhost:3000/api/nandu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: testMessage }
                ],
                context: {
                    currentPage: 'dashboard',
                    userPlan: 'pro'
                }
            })
        });

        const chatData = await chatRes.json();

        if (chatRes.ok) {
            console.log('✅ Agent Response Received!');
            console.log(`🤖 Provider: ${chatData.provider}`);
            console.log(`📝 Message:\n${chatData.message}`);
        } else {
            console.error('❌ Chat Request Failed:', chatData);
        }

    } catch (e: any) {
        console.error('❌ Chat Request Network Error:', e.message);
    }
}

testAgentNandu();
