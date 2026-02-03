// API Route to generate promotional content in multiple languages using AI
import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
    language: string;
    languageName: string;
    nativeName: string;
    contentType: 'post' | 'reel' | 'article' | 'tweet' | 'video';
    platform: string;
    topic?: string;
}

interface GeneratedContent {
    title: string;
    content: string;
    hashtags: string[];
    callToAction: string;
}

// Groq API for fast generation
async function generateWithGroq(prompt: string, apiKey: string): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a multilingual marketing content creator. Generate content ENTIRELY in the requested language. Do not use English unless specifically asked for English content.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        }),
    });

    if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

// Generate content for a specific language
async function generateContent(
    request: GenerateRequest,
    apiKey: string
): Promise<GeneratedContent> {
    const { language, languageName, nativeName, contentType, platform } = request;

    const contentTypePrompts = {
        post: `Create a social media post (150-200 words)`,
        reel: `Create a short video script for Instagram/TikTok reel (60 seconds, punchy and engaging)`,
        article: `Create a professional LinkedIn article introduction (200-300 words)`,
        tweet: `Create a Twitter/X post (max 280 characters, impactful)`,
        video: `Create a YouTube video script opening (100-150 words)`,
    };

    const prompt = `
Generate marketing content for DigitalMEng - an AI-powered marketing platform.

IMPORTANT: Write EVERYTHING in ${languageName} (${nativeName}). Do not use English.

Language: ${languageName} (${nativeName})
Content Type: ${contentTypePrompts[contentType]}
Platform: ${platform}

About DigitalMEng:
- AI-powered marketing platform
- Automates content creation, video generation, multi-platform publishing
- Saves 20+ hours per week
- Supports 40+ languages
- Generate content in any language with one click

Create promotional content with:
1. An attention-grabbing title in ${languageName}
2. Main content text in ${languageName}
3. 5 relevant hashtags in ${languageName}
4. A call-to-action in ${languageName}

Format your response as JSON:
{
    "title": "Title in ${languageName}",
    "content": "Main content in ${languageName}",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
    "callToAction": "CTA in ${languageName}"
}

Remember: ALL text must be in ${languageName}, not English!
`;

    try {
        const result = await generateWithGroq(prompt, apiKey);
        
        // Parse JSON from response
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                title: parsed.title || `[${nativeName}] DigitalMEng`,
                content: parsed.content || result,
                hashtags: parsed.hashtags || [],
                callToAction: parsed.callToAction || '',
            };
        }

        // Fallback if no JSON found
        return {
            title: `[${nativeName}] DigitalMEng`,
            content: result,
            hashtags: [],
            callToAction: '',
        };
    } catch (error) {
        console.error('Content generation error:', error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { languages, contentType, apiKey } = body as {
            languages: GenerateRequest[];
            contentType: 'post' | 'reel' | 'article' | 'tweet' | 'video';
            apiKey?: string;
        };

        // Use provided API key or fall back to environment variable
        const groqKey = apiKey || process.env.GROQ_API_KEY;

        if (!groqKey) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: 'Groq API key is required. Please configure it in settings.' 
                },
                { status: 400 }
            );
        }

        if (!languages || languages.length === 0) {
            return NextResponse.json(
                { success: false, message: 'At least one language is required' },
                { status: 400 }
            );
        }

        const results: Array<{
            language: string;
            languageName: string;
            content: GeneratedContent;
            platform: string;
            type: string;
        }> = [];

        // Generate content for each language
        for (const lang of languages) {
            try {
                const content = await generateContent(
                    { ...lang, contentType },
                    groqKey
                );
                
                results.push({
                    language: lang.language,
                    languageName: lang.languageName,
                    content,
                    platform: lang.platform,
                    type: contentType,
                });
            } catch (error) {
                console.error(`Failed to generate for ${lang.languageName}:`, error);
                // Continue with other languages
            }
        }

        return NextResponse.json({
            success: true,
            generated: results.length,
            total: languages.length,
            results,
        });
    } catch (error) {
        console.error('Global promotion API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
