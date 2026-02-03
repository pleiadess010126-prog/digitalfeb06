import { createYouTubeClient } from '../src/lib/platforms/youtube';
import { db } from '../src/lib/db/client';
import dotenv from 'dotenv';

dotenv.config();

const GLOBAL_VARIANTS = [
    {
        lang: 'English',
        region: 'Global',
        title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine 🚀',
        description: 'Meet DigitalMEng – the multi-tenant SaaS that automates your entire marketing department.\n\n🔥 FEATURES:\n- Autonomous AI Agents: Supervisor, SEO, & Social workers.\n- Global Market Bridge: Automatic localization in 20+ languages.\n- Real-time Risk Monitoring: SEO safe-guards and integrity checks.\n- Multi-channel Distribution: WordPress, YouTube, Instagram, & more.\n\nEmpower your brand with AI that never sleeps.\n\n#DigitalMEng #AIMarketing #SaaS #FutureOfWork #MarketingAutomation #GlobalGrowth',
        tags: ['AI Marketing', 'DigitalMEng', 'SaaS', 'SEO Automation', 'Social Media AI', 'Autonomous Agents']
    },
    {
        lang: 'Spanish',
        region: 'LatAm/Spain',
        title: 'DigitalMEng: El Primer Motor de Marketing de IA Autónomo del Mundo 🚀',
        description: 'Descubre DigitalMEng – el SaaS multi-inquilino que automatiza todo tu departamento de marketing.\n\n🔥 CARACTERÍSTICAS:\n- Agentes de IA Autónomos: Supervisores, SEO y Social Media.\n- Puente de Mercado Global: Localización automática en أكثر من 20 idiomas.\n- Monitoreo de Riesgos: Salvaguardas de SEO y controles de integridad.\n- Distribución Multicanal: WordPress, YouTube, Instagram y más.\n\n#DigitalMEng #IA #MarketingDigital #Automatizacion #SaaS #CrecimientoGlobal',
        tags: ['IA Marketing', 'DigitalMEng', 'SaaS', 'Automatizacion SEO', 'IA Redes Sociales']
    }
];

async function heavyDutyPush() {
    console.log('🏗️ Starting Heavy-Duty Global Push...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    const client = createYouTubeClient(config);
    const videoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

    console.log('Downloading master asset...');
    const response = await fetch(videoUrl);
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);
    const videoBlob = new Blob([videoBuffer], { type: 'video/mp4' });

    for (const variant of GLOBAL_VARIANTS) {
        console.log(`\n📤 Processing ${variant.lang} variant...`);
        try {
            const metadata = {
                title: variant.title,
                description: variant.description,
                privacyStatus: 'public' as const,
                tags: variant.tags,
                isShort: true
            };

            const result = await client.uploadVideo(metadata, videoBlob);

            if (result.success) {
                console.log(`✅ Success for ${variant.lang}! Video ID: ${result.videoId}`);
                // Simple DB log (ignoring for this direct script to avoid Prisma init overhead, we've already set up the campaign)
            } else {
                console.error(`❌ Failed for ${variant.lang}:`, result.error);
            }
        } catch (err: any) {
            console.error(`💥 Error in ${variant.lang} loop:`, err.message);
        }
    }
    console.log('\n🏁 Global Push Sequence Complete.');
}

heavyDutyPush();
