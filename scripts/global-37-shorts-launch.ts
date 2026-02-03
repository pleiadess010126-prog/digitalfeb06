import { createYouTubeClient } from '../src/lib/platforms/youtube';
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
    { code: 'ja', name: 'Japanese', title: 'DigitalMEng：世界初の自律型AIマーケティングエンジン!', baseDesc: 'DigitalMEng をご紹介します – マーकेटिंग部門全体を自動化するマルチテナント SaaS です।' },
    { code: 'pt', name: 'Portuguese', title: 'DigitalMEng: O primeiro motor de marketing de IA autónomo do mundo!', baseDesc: 'Conheça o DigitalMEng – o SaaS multilocatário que automatiza todo o seu departamento de marketing.' },
    { code: 'ru', name: 'Russian', title: 'DigitalMEng: первый в мире автономный маркетинговый движок на базе ИИ!', baseDesc: 'Встречайте DigitalMEng — многопользовательскую SaaS-платформу, которая автоматизирует весь ваш отдел маркетинга.' },
    { code: 'bn', name: 'Bengali', title: 'DigitalMEng: বিশ্বের প্রথম স্বায়ত্তশাসित এআই मार्केटिंग ইঞ্জিন!', baseDesc: 'DigitalMEng-এর साथ পরিচিত হন – মাল্টি-টেন্যান্ট SaaS যা আপনার সম্পূর্ণ মার্কেটিং বিভাগকে স্বয়ংক্রিয় করে।' },
    { code: 'id', name: 'Indonesian', title: 'DigitalMEng: Mesin Pemasaran AI Otonom Pertama di Dunia!', baseDesc: 'Perkenalkan DigitalMEng – SaaS multi-penyewa जो आपके पूरे मार्केटिंग विभाग को स्वचालित करता है।' },
    { code: 'tr', name: 'Turkish', title: 'DigitalMEng: Dünyanın İlk Otonom Yapay Zeka Pazarlama Motoru!', baseDesc: 'Pazarlama departmanınızın tamamını otomatikleştiren çok kiracılı SaaS DigitalMEng ile tanışın.' },
    { code: 'vi', name: 'Vietnamese', title: 'DigitalMEng: Công cụ tiếp thị AI tự trị đầu tiên trên thế giới!', baseDesc: 'Gặp gỡ DigitalMEng – SaaS đa khách thuê tự động hóa toàn bộ bộ phận tiếp thị của bạn.' },
    { code: 'it', name: 'Italian', title: 'DigitalMEng: il primo motore di marketing AI autonomo al mondo!', baseDesc: 'Scopri DigitalMEng: il SaaS multi-tenant che automatizza l\'intero reparto marketing.' },
    { code: 'ko', name: 'Korean', title: 'DigitalMEng: 세계 최초의 자율형 AI 마केटिंग 엔진!', baseDesc: '마케팅 부서 전체를 자동화하는 멀티 테넌트 SaaS인 DigitalMEng을 만나보세요.' },
    { code: 'pl', name: 'Polish', title: 'DigitalMEng: Pierwszy na świecie autonomiczny silnik marketingowy AI!', baseDesc: 'Poznaj DigitalMEng – wielodostępny SaaS, który automatyzuje cały dział marketingu.' },
    { code: 'th', name: 'Thai', title: 'DigitalMEng: เครื่องมือการตลาด AI อัตโนมัติเครื่องแรกของโลก!', baseDesc: 'พบกับ DigitalMEng – SaaS แบบหลายผู้เช่าที่ทำให้แผนกการตลาดทั้งหมดของคุณเป็นแบบอัตโนมัติ' },
    { code: 'nl', name: 'Dutch', title: 'DigitalMEng: \'s Werelds eerste autonome AI-marketingmotor!', baseDesc: 'Maak kennis met DigitalMEng – de multi-tenant SaaS die uw hele marketingafdeling automatiseert.' },
    { code: 'el', name: 'Greek', title: 'DigitalMEng: Η πρώτη αυτόνομη μηχανή μάρκετινγκ AI στον κόσμο!', baseDesc: 'Γνωρίστε το DigitalMEng – το multi-tenant SaaS που αυτοματοποιεί ολόκληρο το τμήμα μάρκετινγκ.' },
    { code: 'sv', name: 'Swedish', title: 'DigitalMEng: Världens första autonoma AI-marknadsföringsmotor!', baseDesc: 'Möt DigitalMEng – multi-tenant SaaS som automatiserar hela din marknadsföringsavdelning.' },
    { code: 'fi', name: 'Finnish', title: 'DigitalMEng: Maailman ensimmäinen autonominen tekoälymarkkinointimoottori!', baseDesc: 'Esittelyssä DigitalMEng – monikäyttäjä SaaS, joka automatisoi koko markkinointiosastosi.' },
    { code: 'cs', name: 'Czech', title: 'DigitalMEng: První autonomní marketingový engine AI na světě!', baseDesc: 'Seznamte se s DigitalMEng – SaaS pro více nájemců, ktorý automatizuje celé vaše marketingové oddělení.' },
    { code: 'hu', name: 'Hungarian', title: 'DigitalMEng: A világ första autonóm AI marketing motorja!', baseDesc: 'Ismerje meg a DigitalMEng-et – a több bérlős SaaS-t, amely automatizálja a teljes marketingrészleget.' },
    { code: 'ro', name: 'Romanian', title: 'DigitalMEng: Primul motor de marketing AI autonom din lume!', baseDesc: 'Faceți cunoștință cu DigitalMEng – SaaS-ul multi-tenant care vă automatizează întregul departament de marketing.' },
    { code: 'tl', name: 'Tagalog', title: 'DigitalMEng: Ang Unang Autonomous AI Marketing Engine sa Mundo!', baseDesc: 'Kilalanin ang DigitalMEng – ang multi-tenant SaaS na nag-o-automate sa iyong buong departamento ng marketing.' },
    { code: 'uk', name: 'Ukrainian', title: 'DigitalMEng: перша у світі автономна маркетингова система на базі ШІ!', baseDesc: 'Зустрічайте DigitalMEng — багатокористувацьку платформу SaaS, яка автоматизує весь ваш відділ маркетингу.' },
    { code: 'mr', name: 'Marathi', title: 'DigitalMEng: जगातील पहिले स्वायत्त AI मार्केटिंग इंजिन!', baseDesc: 'DigitalMEng ला भेटा - मल्टी-टेनेंट SaaS जे तुमच्या संपूर्ण मार्केटिंग विभागाला स्वयंचलित करते.' },
    { code: 'te', name: 'Telugu', title: 'DigitalMEng: ప్రపంచంలోనే మొట్టమొదटी స్వయంప్రతిపత్తి కలిగిన AI మార్కెटिंग ఇంజిన్!', baseDesc: 'DigitalMEngని కలవండి - మీ మొత్తం మార్కెटिंग విభాगाన్ని ఆటోమేట్ చేసే మల్టీ-టెనెంట్ SaaS.' },
    { code: 'ta', name: 'Tamil', title: 'DigitalMEng: உலகின் முதல் தன்னாட்சி AI மார்க்கெட்டிங் இயந்திரம்!', baseDesc: 'DigitalMEng ஐ சந்திக்கவும் - உங்கள் முழு மார்க்கெட்டிங் துறையையும் தானியக்கமாக்கும் பல குத்தகைதாரர் SaaS.' },
    { code: 'gu', name: 'Gujarati', title: 'DigitalMEng: વિશ્વનું પ્રથમ સ્વાયત્ત AI માર્કેટિંગ એન્જિન!', baseDesc: 'DigitalMEng ને મળો - મલ્ટી-ટેનન્ટ SaaS જે તમારા સમગ્ર માર્કેટિંગ વિભાગને સ્વચालित કરે છે.' },
    { code: 'kn', name: 'Kannada', title: 'DigitalMEng: ವಿಶ್ವದ ಮೊದಲ ಸ್ವಾಯತ್ತ AI ಮಾರ್ಕೆಟಿಂಗ್ ಎಂಜಿನ್!', baseDesc: 'DigitalMEng ಅನ್ನು ಭೇಟಿ ಮಾಡಿ - ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಮಾರ್ಕೆಟಿಂಗ್ ವಿಭಾಗವನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಮಲ್ಟಿ-ಟೆನೆಂಟ್ SaaS.' },
    { code: 'ml', name: 'Malayalam', title: 'DigitalMEng: ലോകത്തിലെ ആദ്യത്തെ സ്വയംഭരണ AI മാർക്കറ്റിംഗ് എഞ്ചിൻ!', baseDesc: 'DigitalMEng-നെ പരിചയപ്പെടൂ - നിങ്ങളുടെ മുഴുവൻ മാർക്കറ്റിംഗ് വിഭാഗത്തെയും ഓട്ടോमेറ്റ് ചെയ്യുന്ന മൾട്ടി-ടെനന്റ് SaaS.' },
    { code: 'or', name: 'Odia', title: 'DigitalMEng: ବିଶ୍ୱର ପ୍ରଥମ ସ୍ୱୟଂଶାସିତ AI ମାର୍କେଟିଂ ଇଞ୍ଜିନ୍!', baseDesc: 'DigitalMEng ସହିତ ପରିଚିତ ହୁଅନ୍ତୁ - ମଲ୍ଟି-ଟେନାଣ୍ଟ SaaS ଯାହା ଆପଣଙ୍କର ସମଗ୍ର ମାର୍କେଟିଂ ବିଭାଗକୁ ସ୍ୱୟଂଚାଳିତ କରେ |' },
    { code: 'pa', name: 'Punjabi', title: 'DigitalMEng: ਵਿਸ਼ਵ ਦਾ ਪਹਿਲਾ ਖੁਦਮੁਖਤਿਆਰ AI ਮਾਰਕੀਟਿੰਗ ਇੰਜਣ!', baseDesc: 'DigitalMEng ਨੂੰ ਮਿਲੋ - ਮਲਟੀ-ਟੇਨੈਂਟ SaaS ਜੋ ਤੁਹਾਡੇ ਪੂਰੇ ਮਾਰਕੀਟਿੰਗ ਵਿਭਾਗ ਨੂੰ ਆਟੋਮੈਟਿਕ ਕਰਦਾ ਹੈ।' },
    { code: 'ms', name: 'Malay', title: 'DigitalMEng: Enjin Pemasaran AI Autonomi Pertama di Dunia!', baseDesc: 'Temui DigitalMEng – SaaS berbilang penyewa yang mengautomasikan keseluruhan jabatan pemasaran anda.' },
    { code: 'fa', name: 'Persian', title: 'DigitalMEng: اولین موتور بازاریابی هوش مصنوعی خودمختار جهان!', baseDesc: 'با DigitalMEng آشنا شوید – SaaS چند مستاجر که کل بخش بازاریابی شما را خودکار می کند.' }
];

async function refreshIfNeeded() {
    try {
        console.log('🔄 Checking token validity...');
        execSync('python scripts/refresh_token.py');
        dotenv.config({ override: true }); // Reload env
    } catch (e) {
        console.error('Token refresh failed', e);
    }
}

async function runGlobalShortsLaunch() {
    console.log(`🚀 STARTING GLOBAL SHORTS RELAUNCH (LIMIT INCREASED)...`);
    const logFile = 'global_shorts_launch.log';
    fs.appendFileSync(logFile, `\n--- STARTING REDEPLOYMENT AT ${new Date().toISOString()} ---\n`);

    const videoPath = 'sample_video.mp4';
    if (!fs.existsSync(videoPath)) {
        console.error('Master video missing! Attempting download...');
        execSync('curl.exe -L -o sample_video.mp4 https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }

    // Filter out languages that already succeeded if needed, or just rerun all since limit is up
    for (let i = 0; i < LANGUAGES.length; i++) {
        const lang = LANGUAGES[i];
        console.log(`\n🌍 [${i + 1}/37] Optimizing & Deploying for: ${lang.name}`);

        const richTitle = MetaUtil.optimizeTitle(lang.title, 'youtube');
        const richDescription = MetaUtil.generateDescription(lang.baseDesc, [lang.name, 'GlobalLaunch']);

        // Refresh token every 3 uploads
        if (i % 3 === 0) await refreshIfNeeded();

        const config = {
            apiKey: process.env.YOUTUBE_API_KEY || '',
            accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
            channelId: process.env.YOUTUBE_CHANNEL_ID || '',
        };

        const client = createYouTubeClient(config);
        const videoBuffer = fs.readFileSync(videoPath);
        const videoBlob = new Blob([videoBuffer], { type: 'video/mp4' });

        const metadata = {
            title: richTitle,
            description: richDescription,
            privacyStatus: 'public' as const,
            tags: ['DigitalMEng', 'AI', 'SaaS', lang.name, 'Shorts'],
            isShort: true
        };

        try {
            const result = await client.uploadVideo(metadata, videoBlob);
            if (result.success) {
                const msg = `✅ SUCCESS [${lang.name}]: ${result.videoUrl} (ID: ${result.videoId})`;
                console.log(msg);
                fs.appendFileSync(logFile, `${msg}\n`);
            } else {
                const msg = `❌ FAILURE [${lang.name}]: ${result.error}`;
                console.error(msg);
                fs.appendFileSync(logFile, `${msg}\n`);

                // If we still hit quota, stop early to avoid spamming failures
                if (result.error?.includes('Quota Reached')) {
                    console.error('🛑 Critical: Quota still active. Stopping relaunch.');
                    break;
                }
            }
        } catch (err: any) {
            console.error(`💥 CRASH [${lang.name}]:`, err.message);
        }

        console.log(`⏳ Waiting 3 minutes (Safe interval)...`);
        await new Promise(resolve => setTimeout(resolve, 180000));
    }

    console.log('\n🏁 GLOBAL REDEPLOYMENT COMPLETE.');
    fs.appendFileSync(logFile, `--- SESSION COMPLETED AT ${new Date().toISOString()} ---\n`);
}

runGlobalShortsLaunch().catch(err => {
    console.error(err);
});
