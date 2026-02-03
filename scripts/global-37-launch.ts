import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';
import fs from 'fs';
import { execSync } from 'child_process';

dotenv.config();

const LANGUAGES = [
    { code: 'en', name: 'English', title: 'DigitalMEng: The World\'s First Autonomous AI Marketing Engine 🚀', desc: 'Meet DigitalMEng – the multi-tenant SaaS that automates your entire marketing department.\n\n#DigitalMEng #AI #SaaS #MarketingAutomation' },
    { code: 'es', name: 'Spanish', title: 'DigitalMEng: El primer motor de marketing de IA autónomo del mundo 🚀', desc: 'Conozca DigitalMEng: el SaaS multi-inquilino que automatiza todo su departamento de marketing.\n\n#DigitalMEng #IA #MarketingDigital' },
    { code: 'hi', name: 'Hindi', title: 'DigitalMEng: दुनिया का पहला स्वायत्त AI मार्केटिंग इंजन 🚀', desc: 'DigitalMEng से मिलें - मल्टी-टेनेंट SaaS जो आपके पूरे मार्केटिंग विभाग को स्वचालित करता है।\n\n#DigitalMEng #AI #मार्केटिंग' },
    { code: 'ar', name: 'Arabic', title: 'DigitalMEng: أول محرك تسويق مستقل يعمل بالذكاء الاصطناعي في العالم 🚀', desc: 'تعرف على DigitalMEng - نظام SaaS المتعدد الذي يقوم بأتمتة قسم التسويق بالكامل.\n\n#DigitalMEng #ذكاء_اصطناعي #تسويق' },
    { code: 'zh-Hans', name: 'Chinese (Simplified)', title: 'DigitalMEng：全球首款自主 AI 营销引擎 🚀', desc: '了解 DigitalMEng – 自动化您整个营销部门的多租户 SaaS。\n\n#DigitalMEng #人工智能 #营销自动化' },
    { code: 'fr', name: 'French', title: 'DigitalMEng : le premier moteur de marketing IA autonome au monde 🚀', desc: 'Découvrez DigitalMEng – le SaaS multi-tenant qui automatise l\'ensemble de votre département marketing.\n\n#DigitalMEng #IA #Marketing' },
    { code: 'de', name: 'German', title: 'DigitalMEng: Die weltweit erste autonome KI-Marketing-Engine 🚀', desc: 'Lernen Sie DigitalMEng kennen – die mandantenfähige SaaS, die Ihre gesamte Marketingabteilung automatisiert.\n\n#DigitalMEng #KI #MarketingAutomatisierung' },
    { code: 'ja', name: 'Japanese', title: 'DigitalMEng：世界初の自律型AIマーケティングエンジン 🚀', desc: 'DigitalMEng をご紹介します – マーケティング部門全体を自動化するマルチテナント SaaS です。\n\n#DigitalMEng #AI #マーケティング' },
    { code: 'pt', name: 'Portuguese', title: 'DigitalMEng: O primeiro motor de marketing de IA autónomo do mundo 🚀', desc: 'Conheça o DigitalMEng – o SaaS multilocatário que automatiza todo o seu departamento de marketing.\n\n#DigitalMEng #IA #Marketing' },
    { code: 'ru', name: 'Russian', title: 'DigitalMEng: первый в мире автономный маркетинговый движок на базе ИИ 🚀', desc: 'Встречайте DigitalMEng — многопользовательскую SaaS-платформу, которая автоматизирует весь ваш отдел маркетинга.\n\n#DigitalMEng #ИИ #Маркетинг' },
    { code: 'bn', name: 'Bengali', title: 'DigitalMEng: বিশ্বের প্রথম স্বায়ত্তশাসিত এআই মার্কেটিং ইঞ্জিন 🚀', desc: 'DigitalMEng-এর সাথে পরিচিত হন – মাল্টি-টেন্যান্ট SaaS যা আপনার সম্পূর্ণ মার্কেটিং বিভাগকে স্বয়ংক্রিয় করে।\n\n#DigitalMEng #এআই #মার্কেটিং' },
    { code: 'id', name: 'Indonesian', title: 'DigitalMEng: Mesin Pemasaran AI Otonom Pertama di Dunia 🚀', desc: 'Perkenalkan DigitalMEng – SaaS multi-penyewa yang mengotomatiskan seluruh departemen pemasaran Anda.\n\n#DigitalMEng #AI #Pemasaran' },
    { code: 'tr', name: 'Turkish', title: 'DigitalMEng: Dünyanın İlk Otonom Yapay Zeka Pazarlama Motoru 🚀', desc: 'Pazarlama departmanınızın tamamını otomatikleştiren çok kiracılı SaaS DigitalMEng ile tanışın.\n\n#DigitalMEng #AI #Pazarlama' },
    { code: 'vi', name: 'Vietnamese', title: 'DigitalMEng: Công cụ tiếp thị AI tự trị đầu tiên trên thế giới 🚀', desc: 'Gặp gỡ DigitalMEng – SaaS đa khách thuê tự động hóa toàn bộ bộ phận tiếp thị của bạn.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'it', name: 'Italian', title: 'DigitalMEng: il primo motore di marketing AI autonomo al mondo 🚀', desc: 'Scopri DigitalMEng: il SaaS multi-tenant che automatizza l\'intero reparto marketing.\n\n#DigitalMEng #IA #Marketing' },
    { code: 'ko', name: 'Korean', title: 'DigitalMEng: 세계 최초의 자율형 AI 마케팅 엔진 🚀', desc: '마케팅 부서 전체를 자동화하는 멀티 테넌트 SaaS인 DigitalMEng을 만나보세요.\n\n#DigitalMEng #AI #마케팅자동화' },
    { code: 'pl', name: 'Polish', title: 'DigitalMEng: Pierwszy na świecie autonomiczny silnik marketingowy AI 🚀', desc: 'Poznaj DigitalMEng – wielodostępny SaaS, który automatyzuje cały dział marketingu.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'th', name: 'Thai', title: 'DigitalMEng: เครื่องมือการตลาด AI อัตโนมัติเครื่องแรกของโลก 🚀', desc: 'พบกับ DigitalMEng – SaaS แบบหลายผู้เช่าที่ทำให้แผนกการตลาดทั้งหมดของคุณเป็นแบบอัตโนมัติ\n\n#DigitalMEng #AI #การตลาด' },
    { code: 'nl', name: 'Dutch', title: 'DigitalMEng: \'s Werelds eerste autonome AI-marketingmotor 🚀', desc: 'Maak kennis met DigitalMEng – de multi-tenant SaaS die uw hele marketingafdeling automatiseert.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'el', name: 'Greek', title: 'DigitalMEng: Η πρώτη αυτόνομη μηχανή μάρκετινγκ AI στον κόσμο 🚀', desc: 'Γνωρίστε το DigitalMEng – το multi-tenant SaaS που αυτοματοποιεί ολόκληρο το τμήμα μάρκετινγκ.\n\n#DigitalMEng #AI #Μάρκετινγκ' },
    { code: 'sv', name: 'Swedish', title: 'DigitalMEng: Världens första autonoma AI-marknadsföringsmotor 🚀', desc: 'Möt DigitalMEng – multi-tenant SaaS som automatiserar hela din marknadsföringsavdelning.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'fi', name: 'Finnish', title: 'DigitalMEng: Maailman ensimmäinen autonominen tekoälymarkkinointimoottori 🚀', desc: 'Esittelyssä DigitalMEng – monikäyttäjä SaaS, joka automatisoi koko markkinointiosastosi.\n\n#DigitalMEng #Tekoäly #Markkinointi' },
    { code: 'cs', name: 'Czech', title: 'DigitalMEng: První autonomní marketingový engine AI na světě 🚀', desc: 'Seznamte se s DigitalMEng – SaaS pro více nájemců, který automatizuje celé vaše marketingové oddělení.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'hu', name: 'Hungarian', title: 'DigitalMEng: A világ első autonóm AI marketing motorja 🚀', desc: 'Ismerje meg a DigitalMEng-et – a több bérlős SaaS-t, amely automatizálja a teljes marketingrészleget.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'ro', name: 'Romanian', title: 'DigitalMEng: Primul motor de marketing AI autonom din lume 🚀', desc: 'Faceți cunoștință cu DigitalMEng – SaaS-ul multi-tenant care vă automatizează întregul departament de marketing.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'tl', name: 'Tagalog', title: 'DigitalMEng: Ang Unang Autonomous AI Marketing Engine sa Mundo 🚀', desc: 'Kilalanin ang DigitalMEng – ang multi-tenant SaaS na nag-o-automate sa iyong buong departamento ng marketing.\n\n#DigitalMEng #AI #Marketing' },
    { code: 'uk', name: 'Ukrainian', title: 'DigitalMEng: перша у світі автономна маркетингова система на базі ШІ 🚀', desc: 'Зустрічайте DigitalMEng — багатокористувацьку платформу SaaS, яка автоматизує весь ваш відділ маркетинγου.\n\n#DigitalMEng #ШІ #Маркетинг' },
    { code: 'mr', name: 'Marathi', title: 'DigitalMEng: जगातील पहिले स्वायत्त AI मार्केटिंग इंजिन 🚀', desc: 'DigitalMEng ला भेटा - मल्टी-टेनंट SaaS जे तुमच्या संपूर्ण मार्केटिंग विभागाला स्वयंचलित करते.\n\n#DigitalMEng #AI #मार्केटिंग' },
    { code: 'te', name: 'Telugu', title: 'DigitalMEng: ప్రపంచంలోనే మొట్టమొదటి స్వయంప్రతిపత్తి కలిగిన AI మార్కెటింగ్ ఇంజిన్ 🚀', desc: 'DigitalMEngని కలవండి - మీ మొత్తం మార్కెటింగ్ విభాగాన్ని ఆటోమేట్ చేసే మల్టీ-టెనెంట్ SaaS.\n\n#DigitalMEng #AI #మార్కెటింగ్' },
    { code: 'ta', name: 'Tamil', title: 'DigitalMEng: உலகின் முதல் தன்னாட்சி AI மார்க்கெட்டிங் இயந்திரம் 🚀', desc: 'DigitalMEng ஐ சந்திக்கவும் - உங்கள் முழு மார்க்கெட்டிங் துறையையும் தானியக்கமாக்கும் பல குத்தகைதாரர் SaaS.\n\n#DigitalMEng #AI #மார்க்கெட்டிங்' },
    { code: 'gu', name: 'Gujarati', title: 'DigitalMEng: વિશ્વનું પ્રથમ સ્વાયત્ત AI માર્કેટિંગ એન્જિન 🚀', desc: 'DigitalMEng ને મળો - મલ્ટી-ટેનન્ટ SaaS જે તમારા સમગ્ર માર્કેટિંગ વિભાગને સ્વચાલિત કરે છે.\n\n#DigitalMEng #AI #માર્કેટિંગ' },
    { code: 'kn', name: 'Kannada', title: 'DigitalMEng: ವಿಶ್ವದ ಮೊದಲ ಸ್ವಾಯತ್ತ AI ಮಾರ್ಕೆಟಿಂಗ್ ಎಂಜಿನ್ 🚀', desc: 'DigitalMEng ಅನ್ನು ಭೇಟಿ ಮಾಡಿ - ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಮಾರ್ಕೆಟಿಂಗ್ ವಿಭಾಗವನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಮಲ್ಟಿ-ಟೆನೆಂಟ್ SaaS.\n\n#DigitalMEng #AI #ಮಾರ್ಕೆಟಿಂಗ್' },
    { code: 'ml', name: 'Malayalam', title: 'DigitalMEng: ലോകത്തിലെ ആദ്യത്തെ സ്വയംഭരണ AI മാർക്കറ്റിംഗ് എഞ്ചിൻ 🚀', desc: 'DigitalMEng-നെ പരിചയപ്പെടൂ - നിങ്ങളുടെ മുഴുവൻ മാർക്കറ്റിംഗ് വിഭാഗത്തെയും ഓട്ടോമേറ്റ് ചെയ്യുന്ന മൾട്ടി-ടെനന്റ് SaaS.\n\n#DigitalMEng #AI #മാർക്കറ്റിംഗ്' },
    { code: 'or', name: 'Odia', title: 'DigitalMEng: ବିଶ୍ୱର ପ୍ରଥମ ସ୍ୱୟଂଶାସିତ AI ମାର୍କେଟିଂ ଇଞ୍ଜିନ୍ 🚀', desc: 'DigitalMEng ସହିତ ପରିଚିତ ହୁଅନ୍ତୁ - ମଲ୍ଟି-ଟେନାଣ୍ଟ SaaS ଯାହା ଆପଣଙ୍କର ସମଗ୍ର ମାର୍କେଟିଂ ବିଭାଗକୁ ସ୍ୱୟଂଚାଳିତ କରେ |' },
    { code: 'pa', name: 'Punjabi', title: 'DigitalMEng: ਵਿਸ਼ਵ ਦਾ ਪਹਿਲਾ ਖੁਦਮੁਖਤਿਆਰ AI ਮਾਰਕੀਟਿੰਗ ਇੰਜਣ 🚀', desc: 'DigitalMEng ਨੂੰ ਮਿਲੋ - ਮਲਟੀ-ਟੇਨੈਂਟ SaaS ਜੋ ਤੁਹਾਡੇ ਪੂਰੇ ਮਾਰਕੀਟਿੰਗ ਵਿਭਾਗ ਨੂੰ ਆਟੋਮੈਟਿਕ ਕਰਦਾ ਹੈ।' },
    { code: 'ms', name: 'Malay', title: 'DigitalMEng: Enjin Pemasaran AI Autonomi Pertama di Dunia 🚀', desc: 'Temui DigitalMEng – SaaS berbilang penyewa yang mengautomasikan keseluruhan jabatan pemasaran anda.' },
    { code: 'fa', name: 'Persian', title: 'DigitalMEng: اولین موتور بازاریابی هوش مصنوعی خودمختار جهان 🚀', desc: 'با DigitalMEng آشنا شوید – SaaS چند مستاجر که کل بخش بازاریابی شما را خودکار می کند.' }
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

async function runGlobal37() {
    console.log(`🚀 STARTING 37-LANGUAGE GLOBAL DOMINATION MISSION...`);
    const logFile = 'global_launch_results.log';
    fs.appendFileSync(logFile, `\n--- STARTING NEW SESSION AT ${new Date().toISOString()} ---\n`);

    const videoPath = 'sample_video.mp4';
    if (!fs.existsSync(videoPath)) {
        console.error('Master video missing! Attempting download...');
        execSync('curl.exe -L -o sample_video.mp4 https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }

    for (let i = 0; i < LANGUAGES.length; i++) {
        const lang = LANGUAGES[i];
        console.log(`\n🌍 [${i + 1}/37] Deploying for: ${lang.name} (${lang.code})`);

        // Refresh token every 3 uploads to be safe
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
            title: lang.title,
            description: lang.desc,
            privacyStatus: 'public' as const,
            tags: ['DigitalMEng', 'AI', 'SaaS', lang.name],
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
            }
        } catch (err: any) {
            console.error(`💥 CRASH [${lang.name}]:`, err.message);
        }

        console.log(`⏳ Waiting 3 minutes before next market push...`);
        // Wait 3 minutes as requested
        await new Promise(resolve => setTimeout(resolve, 180000));
    }

    console.log('\n🏁 MISSION COMPLETE. GLOBAL DOMINATION ACHIEVED.');
    fs.appendFileSync(logFile, `--- SESSION COMPLETED AT ${new Date().toISOString()} ---\n`);
}

runGlobal37().catch(err => {
    fs.appendFileSync('global_launch_results.log', `FATAL SESSION ERROR: ${err.message}\n`);
    console.error(err);
});
