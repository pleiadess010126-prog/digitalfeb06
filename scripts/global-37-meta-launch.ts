import { MetaGraphAPIClient } from '../src/lib/platforms/metaGraphAPI';
import { MetaUtil } from '../src/lib/utils/meta';
import dotenv from 'dotenv';
import fs from 'fs';
import { execSync } from 'child_process';

dotenv.config();

const LANGUAGES = [
    { code: 'en', name: 'English', title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine!', baseDesc: 'Meet DigitalMEng – the multi-tenant SaaS that automates your entire marketing department.' },
    { code: 'es', name: 'Spanish', title: 'DigitalMEng: ¡El Primer Motor de Marketing de IA Autónomo del Mundo!', baseDesc: 'Conoce DigitalMEng: el SaaS multi-inquilino que automatiza todo tu departamento de marketing.' },
    { code: 'hi', name: 'Hindi', title: 'DigitalMEng: दुनिया का पहला स्वायत्त AI मार्केटिंग इंजन!', baseDesc: 'DigitalMEng से मिलें - मल्टी-टेनेंट SaaS जो आपके पूरे मार्केटिंग विभाग को स्वचालित करता है।' },
    { code: 'ar', name: 'Arabic', title: 'DigitalMEng: أول محرك تسويق مستقل يعمل بالذكاء الاصطناعي في العالم!', baseDesc: 'تعرف على DigitalMEng - نظام SaaS المتعدد الذي يقوم بأتمتة قسم التسويق بالكامل।' },
    { code: 'zh-Hans', name: 'Chinese (Simplified)', title: 'DigitalMEng：全球首款自主 AI 营销引擎!', baseDesc: '了解 DigitalMEng – 自动化您整个营销部门的多租户 SaaS।' },
    { code: 'fr', name: 'French', title: 'DigitalMEng : le premier moteur de marketing IA autonome au monde!', baseDesc: 'Découvrez DigitalMEng – le SaaS multi-tenant qui automatise l\'ensemble de votre département marketing.' },
    { code: 'de', name: 'German', title: 'DigitalMEng: Die weltweit erste autonome KI-Marketing-Engine!', baseDesc: 'Lernen Sie DigitalMEng kennen – die mandantenfähige SaaS, die Ihre gesamte Marketingabteilung automatisiert.' },
    { code: 'ja', name: 'Japanese', title: 'DigitalMEng：世界初の自律型AIマーケティングエンジン!', baseDesc: 'DigitalMEng をご紹介します – マーケットング部門全体を自動化するマルチテナント SaaS です।' },
    { code: 'pt', name: 'Portuguese', title: 'DigitalMEng: O primeiro motor de marketing de IA autónomo do mundo!', baseDesc: 'Conheça o DigitalMEng – o SaaS multilocatário que automatiza todo o seu departamento de marketing.' },
    { code: 'ru', name: 'Russian', title: 'DigitalMEng: первый в мире автономный маркетинговый движок на базе ИИ!', baseDesc: 'Встречайте DigitalMEng — многопользовательскую SaaS-платформу, которая автоматизирует весь ваш отдел маркетинга.' },
    { code: 'bn', name: 'Bengali', title: 'DigitalMEng: বিশ্বের প্রথম স্বায়ত্তশাসিত এআই मार्केटिंग ইঞ্জিন!', baseDesc: 'DigitalMEng-এর সাথে পরিচিত হন – মাল্টি-টেন্যান্ট SaaS যা আপনার সম্পূর্ণ मार्केटिंग বিভাগকে স্বয়ংক্রিয় করে।' },
    { code: 'id', name: 'Indonesian', title: 'DigitalMEng: Mesin Pemasaran AI Otonom Pertama di Dunia!', baseDesc: 'Perkenalkan DigitalMEng – SaaS multi-penyewa जो आपके पूरे मार्केटिंग विभाग को स्वचालित करता है।' },
];

async function runGlobalMetaLaunch() {
    console.log(`🚀 STARTING META (INSTAGRAM) GLOBAL REELS PUSH...`);
    const logFile = 'global_meta_launch.log';
    fs.appendFileSync(logFile, `\n--- STARTING META SESSION AT ${new Date().toISOString()} ---\n`);

    const videoUrl = 'https://digitalmeng.in/sample_reel.mp4'; // Placeholder URL - In prod this would be a real HeyGen URL

    const config = {
        appId: process.env.META_APP_ID || '',
        appSecret: process.env.META_APP_SECRET || '',
        accessToken: process.env.META_ACCESS_TOKEN || '',
        instagramAccountId: process.env.INSTAGRAM_ACCOUNT_ID || '',
        facebookPageId: process.env.FACEBOOK_PAGE_ID || '',
    };

    if (!config.appId || !config.accessToken || !config.instagramAccountId) {
        console.error('❌ ERROR: Missing Meta Configuration in .env');
        return;
    }

    const client = new MetaGraphAPIClient(config);

    for (let i = 0; i < LANGUAGES.length; i++) {
        const lang = LANGUAGES[i];
        console.log(`\n📸 [${i + 1}/${LANGUAGES.length}] Deploying Reel for: ${lang.name}`);

        const richCaption = MetaUtil.generateDescription(lang.title + '\n\n' + lang.baseDesc, [lang.name, 'DigitalMEng', 'Reels', 'AI']);

        try {
            const result = await client.publishInstagramReel({
                videoUrl: videoUrl,
                caption: richCaption,
                shareToFeed: true
            });

            if (result.success) {
                const msg = `✅ SUCCESS [${lang.name}]: Live at ${result.postUrl}`;
                console.log(msg);
                fs.appendFileSync(logFile, `${msg}\n`);
            } else {
                const msg = `❌ FAILURE [${lang.name}]: ${result.error}`;
                console.error(msg);
                fs.appendFileSync(logFile, `${msg}\n`);
            }
        } catch (err: any) {
            console.error(`💥 CRASH [${lang.name}]:`, err.message);
        }

        console.log(`⏳ Waiting 10 minutes between Meta pushes...`);
        await new Promise(resolve => setTimeout(resolve, 600000));
    }

    console.log('\n🏁 META GLOBAL MISSION COMPLETE.');
    fs.appendFileSync(logFile, `--- SESSION COMPLETED AT ${new Date().toISOString()} ---\n`);
}

runGlobalMetaLaunch().catch(err => {
    console.error('FATAL:', err);
});
