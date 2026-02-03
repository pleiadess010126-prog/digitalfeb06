import { db } from '../src/lib/db/client';
import dotenv from 'dotenv';

dotenv.config();

async function createGlobalCampaign() {
    console.log('🚀 Creating Global Self-Promotion Campaign in DB...');
    try {
        const campaign = await db.createCampaign({
            organizationId: "demo_org_123",
            name: "DigitalMEng 2026 Global Launch",
            description: "Automated global self-promotion campaign across 20+ languages.",
            status: 'active',
            createdBy: "system",
            settings: {
                websiteUrl: "https://digitalmeng.ai",
                targetAudience: "Marketing Agencies, SaaS Founders, Enterprise SEOs",
                industry: "MarTech / AI",
                keywords: ["AI Marketing", "Automation", "SaaS", "Multilingual Content"],
                velocity: {
                    month1: 110,
                    month2: 220,
                    month3: 330
                },
                contentTypes: {
                    blog: true,
                    youtube: true,
                    instagram: true,
                    facebook: true
                },
                autoPublish: true,
                requireApproval: false,
                schedulingPreferences: {
                    preferredDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                    preferredTimes: ["09:00", "14:00"],
                    timezone: "UTC"
                }
            },
            metrics: {
                totalContent: 0,
                publishedContent: 0,
                pendingContent: 0,
                totalViews: 0,
                totalEngagement: 0,
                riskScore: 0
            }
        });
        console.log('✅ Campaign Created:', campaign.id);
        return campaign.id;
    } catch (err: any) {
        console.error('❌ Failed to create campaign:', err.message);
        return null;
    }
}

createGlobalCampaign();
