import { getSupervisorAgent } from '../src/lib/ai/supervisor';
import { HeyGenClient } from '../src/lib/platforms/heygen';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function runMockPreflight() {
    console.log('🏁 STARTING MASTER PRE-FLIGHT (MOCK DB)...');

    // 1. AGENT DEBATE CHECK
    console.log('\n🧠 [1/2] Testing AI Agent Debate Logic...');
    try {
        const supervisor = getSupervisorAgent();
        console.log('Sending Mission: "Develop a viral launch strategy for DigitalMEng in France."');
        const strategy = await supervisor.coordinateMission('France Launch', 'viral_marketing');
        console.log('✅ Strategy Received:', strategy.substring(0, 150) + '...');
    } catch (e) {
        console.error('❌ Agent Logic Failed:', e.message);
    }

    // 2. MEDIA GENERATION CHECK
    console.log('\n🎬 [2/2] Testing Media Pipe (Compatible Resolution)...');
    try {
        const heygen = new HeyGenClient({ apiKey: process.env.HEYGEN_API_KEY || '' });
        const videoResult = await heygen.generateVideo({
            title: 'Pre-flight France Test',
            script: 'Bienvenue sur DigitalMEng. La révolution du marketing IA arrive en France.',
            dimension: 'vertical'
        });

        if (videoResult.success) {
            console.log(`✅ Media Pipeline Active. Video ID: ${videoResult.videoId}`);
            fs.appendFileSync('preflight_results.log', `MISSION SUCCESS: ${videoResult.videoId} at ${new Date().toISOString()}\n`);
        } else {
            console.error('❌ Media Pipeline Error:', videoResult.error);
        }
    } catch (e) {
        console.error('❌ HeyGen Pipe Failed:', e.message);
    }

    console.log('\n--- EVALUATION COMPLETE ---');
}

runMockPreflight().catch(console.error);
