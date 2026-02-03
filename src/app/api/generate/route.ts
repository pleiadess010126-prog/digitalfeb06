import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { generateContent, getAvailableProvider } from '@/lib/ai/contentGenerator';
import { getSupervisorAgent } from '@/lib/ai/supervisor';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { topic, keywords, contentType, targetAudience, useSupervisor = false, organizationId } = body;

        if (!topic || !keywords || !contentType) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: topic, keywords, contentType' },
                { status: 400 }
            );
        }

        // Fetch organization settings for hosting strategy (BYO Cloud vs Managed)
        let byoConfig = undefined;
        if (organizationId) {
            const organization = await db.getOrganization(organizationId);
            if (organization?.settings?.hostingStrategy) {
                byoConfig = {
                    strategy: organization.settings.hostingStrategy,
                    privateCloudUrl: organization.settings.privateCloudUrl,
                    credentials: organization.settings.aiCredentials
                };
                console.log(`Applying ${byoConfig.strategy} strategy for organization: ${organizationId}`);
            }
        }

        // Check which AI provider is available (sensitive to BYO config)
        const provider = getAvailableProvider(byoConfig);
        console.log(`Using AI provider: ${provider} [Strategy: ${byoConfig?.strategy || 'managed'}]`);

        let result;

        if (useSupervisor) {
            // Use supervisor agent for orchestrated generation
            const supervisor = getSupervisorAgent();
            const task = await supervisor.delegateContentCreation(
                { id: 'temp', name: topic, keywords, contentCount: 1, description: '', priority: 1 },
                contentType,
                targetAudience || 'general audience'
            );

            result = task.result;
        } else {
            // Direct generation with hosting-aware logic
            result = await generateContent({
                topic,
                keywords,
                contentType,
                targetAudience: targetAudience || 'general audience',
                byoConfig: byoConfig
            });
        }

        return NextResponse.json({
            success: true,
            content: result,
            provider,
            message: provider === 'mock'
                ? 'Using mock generator. Add OPENAI_API_KEY or AWS Bedrock credentials for AI generation.'
                : 'Content generated successfully',
        });
    } catch (error: any) {
        console.error('Content generation error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Content generation failed' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const provider = getAvailableProvider();

    return NextResponse.json({
        currentProvider: provider,
        availableProviders: {
            bedrock: !!process.env.AWS_REGION && !!process.env.AWS_ACCESS_KEY_ID,
            openai: !!process.env.OPENAI_API_KEY,
            anthropic: !!process.env.ANTHROPIC_API_KEY,
            mock: true,
        },
        status: 'ready',
    });
}
