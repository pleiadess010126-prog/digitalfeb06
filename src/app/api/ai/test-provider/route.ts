import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { providerId, credentials } = await request.json();

        if (!providerId || !credentials) {
            return NextResponse.json({ success: false, error: 'Missing provider information' }, { status: 400 });
        }

        let success = false;
        let errorMessage = '';

        switch (providerId) {
            case 'heygen':
                const heygenKey = credentials.apiKey;
                if (!heygenKey) {
                    errorMessage = 'Missing HeyGen API Key';
                } else {
                    console.log('📡 Testing HeyGen Key (Avatars Endpoint)...');
                    // Use /v2/avatars as the most stable GET endpoint for validation
                    const res = await fetch('https://api.heygen.com/v2/avatars', {
                        headers: { 'X-Api-Key': heygenKey }
                    });

                    if (res.ok) {
                        success = true;
                    } else {
                        const data = await res.json().catch(() => ({}));
                        console.error('❌ HeyGen Test Failed:', data);
                        errorMessage = data.error?.message || 'Invalid HeyGen API Key. Please check your dashboard.';
                    }
                }
                break;

            case 'openai':
                const openaiKey = credentials.apiKey;
                if (!openaiKey) {
                    errorMessage = 'Missing OpenAI API Key';
                } else {
                    const res = await fetch('https://api.openai.com/v1/models', {
                        headers: { 'Authorization': `Bearer ${openaiKey}` }
                    });
                    if (res.ok) {
                        success = true;
                    } else {
                        errorMessage = 'Invalid OpenAI API Key';
                    }
                }
                break;

            case 'google_gemini':
                const googleKey = credentials.apiKey;
                if (!googleKey) {
                    errorMessage = 'Missing Google API Key';
                } else {
                    // Simple models list check for Gemini
                    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${googleKey}`);
                    if (res.ok) {
                        success = true;
                    } else {
                        errorMessage = 'Invalid Google Gemini API Key';
                    }
                }
                break;

            default:
                // For other providers, fall back to basic validation (non-empty string check)
                const hasValue = Object.values(credentials).some(v => v && (v as string).length > 0);
                if (hasValue) {
                    success = true;
                    errorMessage = 'Basic connection verified (Live test not implemented for this provider)';
                } else {
                    errorMessage = 'Credentials cannot be empty';
                }
        }

        return NextResponse.json({
            success,
            error: errorMessage,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Provider Test Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
