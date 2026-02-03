
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';

// Load environment variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
}

async function testGroqDirect() {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('🚀 Testing Groq API Connection...');

    if (!apiKey) {
        console.error('❌ GROQ_API_KEY not found in .env.local');
        return;
    }

    console.log(`🔑 Key found: ${apiKey.substring(0, 10)}...`);

    // Initialize Client
    const groq = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.groq.com/openai/v1',
    });

    try {
        console.log('💬 Sending test prompt: "Hello Nandu!"...');

        const response = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'You are Nandu, a helpful AI assistant.' },
                { role: 'user', content: 'Hello Nandu! Are you online?' }
            ],
            max_tokens: 100,
        });

        const reply = response.choices[0].message.content;
        console.log('\n✅ Groq Response Received:');
        console.log('--------------------------------------------------');
        console.log(reply);
        console.log('--------------------------------------------------');
        console.log('\n✨ Conclusion: Groq API is WORKING! Agent Nandu is ready.');

    } catch (error: any) {
        console.error('\n❌ Groq API Error:');
        console.error(JSON.stringify(error, null, 2));
    }
}

testGroqDirect();
