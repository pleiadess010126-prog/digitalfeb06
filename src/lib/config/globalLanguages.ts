/**
 * Global Languages Configuration
 * Complete language coverage for 7+ billion people
 * Careful region mapping for each language
 */

export interface LanguageConfig {
    code: string;
    name: string;
    nativeName: string;
    script: string;
    regions: {
        code: string;
        name: string;
        country: string;
        population: string;
    }[];
    tier: 1 | 2 | 3;
    speakers: string;
    platforms: string[];
    hashtags: string[];
    flag: string;
}

// ============================================
// 🇮🇳 INDIAN LANGUAGES (13 Languages)
// ============================================
export const INDIAN_LANGUAGES: LanguageConfig[] = [
    {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        script: 'Devanagari',
        regions: [
            { code: 'IN-UP', name: 'Uttar Pradesh', country: 'India', population: '240M' },
            { code: 'IN-MP', name: 'Madhya Pradesh', country: 'India', population: '85M' },
            { code: 'IN-BR', name: 'Bihar', country: 'India', population: '130M' },
            { code: 'IN-RJ', name: 'Rajasthan', country: 'India', population: '80M' },
            { code: 'IN-DL', name: 'Delhi', country: 'India', population: '32M' },
            { code: 'IN-HR', name: 'Haryana', country: 'India', population: '30M' },
            { code: 'IN-UK', name: 'Uttarakhand', country: 'India', population: '12M' },
            { code: 'IN-JH', name: 'Jharkhand', country: 'India', population: '40M' },
            { code: 'IN-CG', name: 'Chhattisgarh', country: 'India', population: '30M' },
            { code: 'IN-HP', name: 'Himachal Pradesh', country: 'India', population: '7M' },
        ],
        tier: 1,
        speakers: '600M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'ShareChat', 'Moj', 'Josh'],
        hashtags: ['#हिंदी', '#भारत', '#डिजिटलमार्केटिंग', '#AIमार्केटिंग', '#बिजनेस'],
        flag: '🇮🇳',
    },
    {
        code: 'ta',
        name: 'Tamil',
        nativeName: 'தமிழ்',
        script: 'Tamil',
        regions: [
            { code: 'IN-TN', name: 'Tamil Nadu', country: 'India', population: '85M' },
            { code: 'IN-PY', name: 'Puducherry', country: 'India', population: '1.5M' },
            { code: 'LK', name: 'Sri Lanka (North/East)', country: 'Sri Lanka', population: '5M' },
            { code: 'SG', name: 'Singapore', country: 'Singapore', population: '0.2M' },
            { code: 'MY', name: 'Malaysia', country: 'Malaysia', population: '2M' },
        ],
        tier: 2,
        speakers: '85M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'ShareChat', 'Moj'],
        hashtags: ['#தமிழ்', '#தமிழ்நாடு', '#டிஜிட்டல்மார்கெட்டிங்', '#வணிகம்', '#AIமார்கெட்டிங்'],
        flag: '🇮🇳',
    },
    {
        code: 'te',
        name: 'Telugu',
        nativeName: 'తెలుగు',
        script: 'Telugu',
        regions: [
            { code: 'IN-AP', name: 'Andhra Pradesh', country: 'India', population: '55M' },
            { code: 'IN-TG', name: 'Telangana', country: 'India', population: '40M' },
        ],
        tier: 2,
        speakers: '85M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'Moj', 'Josh'],
        hashtags: ['#తెలుగు', '#ఆంధ్రప్రదేశ్', '#తెలంగాణ', '#డిజిటల్మార్కెటింగ్', '#వ్యాపారం'],
        flag: '🇮🇳',
    },
    {
        code: 'kn',
        name: 'Kannada',
        nativeName: 'ಕನ್ನಡ',
        script: 'Kannada',
        regions: [
            { code: 'IN-KA', name: 'Karnataka', country: 'India', population: '70M' },
        ],
        tier: 2,
        speakers: '50M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'Josh', 'ShareChat'],
        hashtags: ['#ಕನ್ನಡ', '#ಕರ್ನಾಟಕ', '#ಬೆಂಗಳೂರು', '#ಡಿಜಿಟಲ್ಮಾರ್ಕೆಟಿಂಗ್', '#ವ್ಯಾಪಾರ'],
        flag: '🇮🇳',
    },
    {
        code: 'ml',
        name: 'Malayalam',
        nativeName: 'മലയാളം',
        script: 'Malayalam',
        regions: [
            { code: 'IN-KL', name: 'Kerala', country: 'India', population: '35M' },
            { code: 'IN-LD', name: 'Lakshadweep', country: 'India', population: '0.07M' },
        ],
        tier: 2,
        speakers: '38M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'ShareChat'],
        hashtags: ['#മലയാളം', '#കേരളം', '#ഡിജിറ്റൽമാർക്കറ്റിംഗ്', '#ബിസിനസ്', '#AIമാർക്കറ്റിംഗ്'],
        flag: '🇮🇳',
    },
    {
        code: 'bn',
        name: 'Bengali',
        nativeName: 'বাংলা',
        script: 'Bengali',
        regions: [
            { code: 'IN-WB', name: 'West Bengal', country: 'India', population: '100M' },
            { code: 'IN-TR', name: 'Tripura', country: 'India', population: '4M' },
            { code: 'BD', name: 'Bangladesh', country: 'Bangladesh', population: '170M' },
        ],
        tier: 1,
        speakers: '270M',
        platforms: ['YouTube', 'Facebook', 'Instagram', 'ShareChat'],
        hashtags: ['#বাংলা', '#পশ্চিমবঙ্গ', '#কলকাতা', '#ডিজিটালমার্কেটিং', '#ব্যবসা'],
        flag: '🇮🇳',
    },
    {
        code: 'mr',
        name: 'Marathi',
        nativeName: 'मराठी',
        script: 'Devanagari',
        regions: [
            { code: 'IN-MH', name: 'Maharashtra', country: 'India', population: '130M' },
            { code: 'IN-GA', name: 'Goa', country: 'India', population: '2M' },
        ],
        tier: 2,
        speakers: '95M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'ShareChat', 'Josh'],
        hashtags: ['#मराठी', '#महाराष्ट्र', '#मुंबई', '#पुणे', '#डिजिटलमार्केटिंग', '#व्यवसाय'],
        flag: '🇮🇳',
    },
    {
        code: 'gu',
        name: 'Gujarati',
        nativeName: 'ગુજરાતી',
        script: 'Gujarati',
        regions: [
            { code: 'IN-GJ', name: 'Gujarat', country: 'India', population: '70M' },
            { code: 'IN-DD', name: 'Dadra & Nagar Haveli', country: 'India', population: '0.6M' },
            { code: 'IN-DN', name: 'Daman & Diu', country: 'India', population: '0.3M' },
        ],
        tier: 2,
        speakers: '60M',
        platforms: ['YouTube', 'Instagram', 'LinkedIn', 'Facebook'],
        hashtags: ['#ગુજરાતી', '#ગુજરાત', '#અમદાવાદ', '#ડિજિટલમાર્કેટિંગ', '#બિઝનેસ'],
        flag: '🇮🇳',
    },
    {
        code: 'pa',
        name: 'Punjabi',
        nativeName: 'ਪੰਜਾਬੀ',
        script: 'Gurmukhi',
        regions: [
            { code: 'IN-PB', name: 'Punjab (India)', country: 'India', population: '30M' },
            { code: 'PK-PB', name: 'Punjab (Pakistan)', country: 'Pakistan', population: '100M' },
            { code: 'CA', name: 'Canada (Diaspora)', country: 'Canada', population: '1M' },
            { code: 'UK', name: 'United Kingdom (Diaspora)', country: 'UK', population: '0.7M' },
        ],
        tier: 2,
        speakers: '125M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'TikTok'],
        hashtags: ['#ਪੰਜਾਬੀ', '#ਪੰਜਾਬ', '#ਡਿਜੀਟਲਮਾਰਕੀਟਿੰਗ', '#ਕਾਰੋਬਾਰ'],
        flag: '🇮🇳',
    },
    {
        code: 'or',
        name: 'Odia',
        nativeName: 'ଓଡ଼ିଆ',
        script: 'Odia',
        regions: [
            { code: 'IN-OD', name: 'Odisha', country: 'India', population: '46M' },
        ],
        tier: 3,
        speakers: '40M',
        platforms: ['YouTube', 'Facebook', 'Instagram', 'ShareChat'],
        hashtags: ['#ଓଡ଼ିଆ', '#ଓଡ଼ିଶା', '#ଭୁବନେଶ୍ୱର', '#ଡିଜିଟାଲମାର୍କେଟିଂ'],
        flag: '🇮🇳',
    },
    {
        code: 'as',
        name: 'Assamese',
        nativeName: 'অসমীয়া',
        script: 'Bengali',
        regions: [
            { code: 'IN-AS', name: 'Assam', country: 'India', population: '35M' },
            { code: 'IN-AR', name: 'Arunachal Pradesh', country: 'India', population: '2M' },
        ],
        tier: 3,
        speakers: '25M',
        platforms: ['YouTube', 'Facebook', 'Instagram'],
        hashtags: ['#অসমীয়া', '#অসম', '#গুৱাহাটী', '#ডিজিটেলমাৰ্কেটিং'],
        flag: '🇮🇳',
    },
    {
        code: 'ur',
        name: 'Urdu',
        nativeName: 'اردو',
        script: 'Perso-Arabic',
        regions: [
            { code: 'PK', name: 'Pakistan', country: 'Pakistan', population: '230M' },
            { code: 'IN-UP', name: 'Uttar Pradesh', country: 'India', population: '50M' },
            { code: 'IN-JK', name: 'Jammu & Kashmir', country: 'India', population: '14M' },
            { code: 'IN-TG', name: 'Telangana (Hyderabad)', country: 'India', population: '5M' },
        ],
        tier: 1,
        speakers: '230M',
        platforms: ['YouTube', 'Facebook', 'Instagram', 'TikTok'],
        hashtags: ['#اردو', '#پاکستان', '#ڈیجیٹل_مارکیٹنگ', '#کاروبار'],
        flag: '🇵🇰',
    },
    {
        code: 'bho',
        name: 'Bhojpuri',
        nativeName: 'भोजपुरी',
        script: 'Devanagari',
        regions: [
            { code: 'IN-BR', name: 'Bihar (Eastern)', country: 'India', population: '40M' },
            { code: 'IN-UP', name: 'Uttar Pradesh (Eastern)', country: 'India', population: '30M' },
            { code: 'IN-JH', name: 'Jharkhand', country: 'India', population: '10M' },
        ],
        tier: 2,
        speakers: '50M',
        platforms: ['YouTube', 'Facebook', 'ShareChat', 'Moj'],
        hashtags: ['#भोजपुरी', '#बिहार', '#भोजपुरीमीडिया', '#देसीमार्केटिंग'],
        flag: '🇮🇳',
    },
];

// ============================================
// 🌏 ASIAN LANGUAGES (Non-Indian)
// ============================================
export const ASIAN_LANGUAGES: LanguageConfig[] = [
    {
        code: 'zh',
        name: 'Chinese (Mandarin)',
        nativeName: '中文',
        script: 'Simplified Chinese',
        regions: [
            { code: 'CN', name: 'Mainland China', country: 'China', population: '1.1B' },
            { code: 'TW', name: 'Taiwan', country: 'Taiwan', population: '24M' },
            { code: 'SG', name: 'Singapore', country: 'Singapore', population: '3M' },
            { code: 'MY', name: 'Malaysia', country: 'Malaysia', population: '7M' },
        ],
        tier: 1,
        speakers: '1.1B',
        platforms: ['WeChat', 'Weibo', 'Douyin', 'Bilibili', 'Xiaohongshu'],
        hashtags: ['#营销', '#数字营销', '#AI营销', '#商业', '#创业'],
        flag: '🇨🇳',
    },
    {
        code: 'ja',
        name: 'Japanese',
        nativeName: '日本語',
        script: 'Japanese (Kanji/Hiragana/Katakana)',
        regions: [
            { code: 'JP', name: 'Japan', country: 'Japan', population: '125M' },
        ],
        tier: 1,
        speakers: '125M',
        platforms: ['Twitter', 'YouTube', 'LINE', 'Instagram', 'TikTok'],
        hashtags: ['#マーケティング', '#デジタルマーケティング', '#AI', '#ビジネス'],
        flag: '🇯🇵',
    },
    {
        code: 'ko',
        name: 'Korean',
        nativeName: '한국어',
        script: 'Hangul',
        regions: [
            { code: 'KR', name: 'South Korea', country: 'South Korea', population: '52M' },
            { code: 'KP', name: 'North Korea', country: 'North Korea', population: '26M' },
        ],
        tier: 2,
        speakers: '80M',
        platforms: ['KakaoTalk', 'Naver', 'YouTube', 'Instagram', 'TikTok'],
        hashtags: ['#마케팅', '#디지털마케팅', '#AI마케팅', '#비즈니스', '#창업'],
        flag: '🇰🇷',
    },
    {
        code: 'id',
        name: 'Indonesian',
        nativeName: 'Bahasa Indonesia',
        script: 'Latin',
        regions: [
            { code: 'ID', name: 'Indonesia', country: 'Indonesia', population: '275M' },
        ],
        tier: 1,
        speakers: '200M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Twitter'],
        hashtags: ['#MarketingDigital', '#AIMarketing', '#Bisnis', '#Startup', '#Indonesia'],
        flag: '🇮🇩',
    },
    {
        code: 'th',
        name: 'Thai',
        nativeName: 'ไทย',
        script: 'Thai',
        regions: [
            { code: 'TH', name: 'Thailand', country: 'Thailand', population: '70M' },
        ],
        tier: 2,
        speakers: '70M',
        platforms: ['LINE', 'Facebook', 'YouTube', 'Instagram', 'TikTok'],
        hashtags: ['#การตลาดดิจิทัล', '#AIการตลาด', '#ธุรกิจ', '#สตาร์ทอัพ'],
        flag: '🇹🇭',
    },
    {
        code: 'vi',
        name: 'Vietnamese',
        nativeName: 'Tiếng Việt',
        script: 'Latin (with diacritics)',
        regions: [
            { code: 'VN', name: 'Vietnam', country: 'Vietnam', population: '100M' },
        ],
        tier: 2,
        speakers: '100M',
        platforms: ['Zalo', 'Facebook', 'YouTube', 'TikTok', 'Instagram'],
        hashtags: ['#MarketingSố', '#AIMarketing', '#KinhDoanh', '#Startup'],
        flag: '🇻🇳',
    },
    {
        code: 'ms',
        name: 'Malay',
        nativeName: 'Bahasa Melayu',
        script: 'Latin',
        regions: [
            { code: 'MY', name: 'Malaysia', country: 'Malaysia', population: '32M' },
            { code: 'SG', name: 'Singapore', country: 'Singapore', population: '0.5M' },
            { code: 'BN', name: 'Brunei', country: 'Brunei', population: '0.4M' },
        ],
        tier: 2,
        speakers: '80M',
        platforms: ['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Twitter'],
        hashtags: ['#PemasaranDigital', '#AIMarketing', '#Perniagaan', '#Malaysia'],
        flag: '🇲🇾',
    },
    {
        code: 'fil',
        name: 'Filipino (Tagalog)',
        nativeName: 'Tagalog',
        script: 'Latin',
        regions: [
            { code: 'PH', name: 'Philippines', country: 'Philippines', population: '115M' },
        ],
        tier: 2,
        speakers: '100M',
        platforms: ['Facebook', 'YouTube', 'Instagram', 'TikTok', 'Twitter'],
        hashtags: ['#DigitalMarketing', '#AIMarketing', '#Negosyo', '#Pilipinas'],
        flag: '🇵🇭',
    },
];

// ============================================
// 🌍 EUROPEAN LANGUAGES
// ============================================
export const EUROPEAN_LANGUAGES: LanguageConfig[] = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        script: 'Latin',
        regions: [
            { code: 'US', name: 'United States', country: 'USA', population: '330M' },
            { code: 'UK', name: 'United Kingdom', country: 'UK', population: '67M' },
            { code: 'CA', name: 'Canada', country: 'Canada', population: '38M' },
            { code: 'AU', name: 'Australia', country: 'Australia', population: '26M' },
            { code: 'IN', name: 'India (English speakers)', country: 'India', population: '150M' },
            { code: 'GLOBAL', name: 'Global (Second Language)', country: 'Worldwide', population: '1B' },
        ],
        tier: 1,
        speakers: '1.5B',
        platforms: ['Instagram', 'YouTube', 'LinkedIn', 'Twitter', 'TikTok', 'Facebook'],
        hashtags: ['#DigitalMarketing', '#AIMarketing', '#ContentCreation', '#MarTech', '#Business'],
        flag: '🇺🇸',
    },
    {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        script: 'Latin',
        regions: [
            { code: 'ES', name: 'Spain', country: 'Spain', population: '47M' },
            { code: 'MX', name: 'Mexico', country: 'Mexico', population: '130M' },
            { code: 'AR', name: 'Argentina', country: 'Argentina', population: '46M' },
            { code: 'CO', name: 'Colombia', country: 'Colombia', population: '52M' },
            { code: 'PE', name: 'Peru', country: 'Peru', population: '34M' },
            { code: 'CL', name: 'Chile', country: 'Chile', population: '19M' },
            { code: 'US-LATAM', name: 'USA (Hispanic)', country: 'USA', population: '60M' },
        ],
        tier: 1,
        speakers: '550M',
        platforms: ['Instagram', 'YouTube', 'Facebook', 'TikTok', 'Twitter', 'LinkedIn'],
        hashtags: ['#MarketingDigital', '#IAMarketing', '#Emprendedores', '#Negocios', '#Contenido'],
        flag: '🇪🇸',
    },
    {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
        script: 'Latin',
        regions: [
            { code: 'BR', name: 'Brazil', country: 'Brazil', population: '215M' },
            { code: 'PT', name: 'Portugal', country: 'Portugal', population: '10M' },
            { code: 'AO', name: 'Angola', country: 'Angola', population: '35M' },
            { code: 'MZ', name: 'Mozambique', country: 'Mozambique', population: '32M' },
        ],
        tier: 1,
        speakers: '290M',
        platforms: ['Instagram', 'YouTube', 'Facebook', 'TikTok', 'Twitter', 'LinkedIn'],
        hashtags: ['#MarketingDigital', '#IAMarketing', '#Empreendedorismo', '#Negócios', '#Brasil'],
        flag: '🇧🇷',
    },
    {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        script: 'Latin',
        regions: [
            { code: 'FR', name: 'France', country: 'France', population: '67M' },
            { code: 'CA-QC', name: 'Quebec, Canada', country: 'Canada', population: '8M' },
            { code: 'BE', name: 'Belgium', country: 'Belgium', population: '5M' },
            { code: 'CH', name: 'Switzerland', country: 'Switzerland', population: '2M' },
            { code: 'AFRICA', name: 'Francophone Africa', country: 'Africa', population: '200M' },
        ],
        tier: 1,
        speakers: '320M',
        platforms: ['Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok'],
        hashtags: ['#MarketingDigital', '#IAMarketing', '#Entrepreneuriat', '#Affaires', '#France'],
        flag: '🇫🇷',
    },
    {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        script: 'Latin',
        regions: [
            { code: 'DE', name: 'Germany', country: 'Germany', population: '84M' },
            { code: 'AT', name: 'Austria', country: 'Austria', population: '9M' },
            { code: 'CH', name: 'Switzerland', country: 'Switzerland', population: '6M' },
        ],
        tier: 1,
        speakers: '130M',
        platforms: ['LinkedIn', 'YouTube', 'Instagram', 'Facebook', 'Xing', 'Twitter'],
        hashtags: ['#DigitalesMarketing', '#KIMarketing', '#Unternehmer', '#Business', '#Germany'],
        flag: '🇩🇪',
    },
    {
        code: 'it',
        name: 'Italian',
        nativeName: 'Italiano',
        script: 'Latin',
        regions: [
            { code: 'IT', name: 'Italy', country: 'Italy', population: '60M' },
            { code: 'CH', name: 'Switzerland (Ticino)', country: 'Switzerland', population: '0.5M' },
        ],
        tier: 2,
        speakers: '70M',
        platforms: ['Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'TikTok'],
        hashtags: ['#MarketingDigitale', '#IAMarketing', '#Imprenditori', '#Business', '#Italia'],
        flag: '🇮🇹',
    },
    {
        code: 'ru',
        name: 'Russian',
        nativeName: 'Русский',
        script: 'Cyrillic',
        regions: [
            { code: 'RU', name: 'Russia', country: 'Russia', population: '145M' },
            { code: 'BY', name: 'Belarus', country: 'Belarus', population: '9M' },
            { code: 'KZ', name: 'Kazakhstan', country: 'Kazakhstan', population: '19M' },
            { code: 'UA', name: 'Ukraine (Russian speakers)', country: 'Ukraine', population: '20M' },
        ],
        tier: 1,
        speakers: '250M',
        platforms: ['VK', 'Telegram', 'YouTube', 'Instagram', 'Odnoklassniki'],
        hashtags: ['#ЦифровойМаркетинг', '#ИИМаркетинг', '#Бизнес', '#Предприниматель'],
        flag: '🇷🇺',
    },
    {
        code: 'nl',
        name: 'Dutch',
        nativeName: 'Nederlands',
        script: 'Latin',
        regions: [
            { code: 'NL', name: 'Netherlands', country: 'Netherlands', population: '17M' },
            { code: 'BE', name: 'Belgium (Flanders)', country: 'Belgium', population: '7M' },
        ],
        tier: 3,
        speakers: '28M',
        platforms: ['LinkedIn', 'Instagram', 'YouTube', 'Facebook', 'Twitter'],
        hashtags: ['#DigitaleMarketing', '#AIMarketing', '#Ondernemen', '#Zakelijk'],
        flag: '🇳🇱',
    },
    {
        code: 'pl',
        name: 'Polish',
        nativeName: 'Polski',
        script: 'Latin',
        regions: [
            { code: 'PL', name: 'Poland', country: 'Poland', population: '38M' },
        ],
        tier: 2,
        speakers: '45M',
        platforms: ['Facebook', 'YouTube', 'Instagram', 'LinkedIn', 'TikTok'],
        hashtags: ['#MarketingCyfrowy', '#SztucznaInteligencja', '#Biznes', '#Polska'],
        flag: '🇵🇱',
    },
    {
        code: 'uk',
        name: 'Ukrainian',
        nativeName: 'Українська',
        script: 'Cyrillic',
        regions: [
            { code: 'UA', name: 'Ukraine', country: 'Ukraine', population: '40M' },
        ],
        tier: 2,
        speakers: '45M',
        platforms: ['Telegram', 'YouTube', 'Instagram', 'Facebook', 'TikTok'],
        hashtags: ['#ЦифровийМаркетинг', '#ШтучнийІнтелект', '#Бізнес', '#Україна'],
        flag: '🇺🇦',
    },
    {
        code: 'tr',
        name: 'Turkish',
        nativeName: 'Türkçe',
        script: 'Latin',
        regions: [
            { code: 'TR', name: 'Turkey', country: 'Turkey', population: '85M' },
            { code: 'CY', name: 'Northern Cyprus', country: 'Cyprus', population: '0.3M' },
        ],
        tier: 2,
        speakers: '85M',
        platforms: ['Instagram', 'YouTube', 'Twitter', 'Facebook', 'TikTok', 'LinkedIn'],
        hashtags: ['#DijitalPazarlama', '#YapayZeka', '#Girişimcilik', '#İşDünyası', '#Türkiye'],
        flag: '🇹🇷',
    },
    {
        code: 'sv',
        name: 'Swedish',
        nativeName: 'Svenska',
        script: 'Latin',
        regions: [
            { code: 'SE', name: 'Sweden', country: 'Sweden', population: '10M' },
        ],
        tier: 3,
        speakers: '10M',
        platforms: ['LinkedIn', 'Instagram', 'YouTube', 'Facebook'],
        hashtags: ['#DigitalMarknadsföring', '#AIMarknadsföring', '#Företagande', '#Sverige'],
        flag: '🇸🇪',
    },
];

// ============================================
// 🌍 MIDDLE EAST & AFRICA LANGUAGES
// ============================================
export const MENA_LANGUAGES: LanguageConfig[] = [
    {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        script: 'Arabic',
        regions: [
            { code: 'SA', name: 'Saudi Arabia', country: 'Saudi Arabia', population: '35M' },
            { code: 'EG', name: 'Egypt', country: 'Egypt', population: '105M' },
            { code: 'AE', name: 'UAE', country: 'UAE', population: '10M' },
            { code: 'IQ', name: 'Iraq', country: 'Iraq', population: '42M' },
            { code: 'MA', name: 'Morocco', country: 'Morocco', population: '37M' },
            { code: 'DZ', name: 'Algeria', country: 'Algeria', population: '45M' },
            { code: 'SD', name: 'Sudan', country: 'Sudan', population: '45M' },
            { code: 'JO', name: 'Jordan', country: 'Jordan', population: '11M' },
        ],
        tier: 1,
        speakers: '400M',
        platforms: ['Instagram', 'YouTube', 'Twitter', 'Facebook', 'TikTok', 'Snapchat'],
        hashtags: ['#التسويق_الرقمي', '#الذكاء_الاصطناعي', '#ريادة_الأعمال', '#أعمال'],
        flag: '🇸🇦',
    },
    {
        code: 'fa',
        name: 'Persian (Farsi)',
        nativeName: 'فارسی',
        script: 'Perso-Arabic',
        regions: [
            { code: 'IR', name: 'Iran', country: 'Iran', population: '88M' },
            { code: 'AF', name: 'Afghanistan (Dari)', country: 'Afghanistan', population: '15M' },
            { code: 'TJ', name: 'Tajikistan', country: 'Tajikistan', population: '10M' },
        ],
        tier: 2,
        speakers: '110M',
        platforms: ['Instagram', 'Telegram', 'YouTube', 'Twitter'],
        hashtags: ['#بازاریابی_دیجیتال', '#هوش_مصنوعی', '#کسب_و_کار', '#ایران'],
        flag: '🇮🇷',
    },
    {
        code: 'he',
        name: 'Hebrew',
        nativeName: 'עברית',
        script: 'Hebrew',
        regions: [
            { code: 'IL', name: 'Israel', country: 'Israel', population: '9M' },
        ],
        tier: 3,
        speakers: '9M',
        platforms: ['Facebook', 'Instagram', 'YouTube', 'LinkedIn', 'Twitter'],
        hashtags: ['#שיווק_דיגיטלי', '#בינה_מלאכותית', '#עסקים', '#ישראל'],
        flag: '🇮🇱',
    },
    {
        code: 'sw',
        name: 'Swahili',
        nativeName: 'Kiswahili',
        script: 'Latin',
        regions: [
            { code: 'TZ', name: 'Tanzania', country: 'Tanzania', population: '65M' },
            { code: 'KE', name: 'Kenya', country: 'Kenya', population: '55M' },
            { code: 'UG', name: 'Uganda', country: 'Uganda', population: '47M' },
            { code: 'RW', name: 'Rwanda', country: 'Rwanda', population: '14M' },
        ],
        tier: 2,
        speakers: '100M',
        platforms: ['Facebook', 'YouTube', 'Instagram', 'Twitter', 'TikTok'],
        hashtags: ['#MasokoYaDigital', '#AIMarketing', '#Biashara', '#Afrika'],
        flag: '🇰🇪',
    },
];

// ============================================
// 📊 COMBINED FULL LIST
// ============================================
export const ALL_LANGUAGES: LanguageConfig[] = [
    ...INDIAN_LANGUAGES,
    ...ASIAN_LANGUAGES,
    ...EUROPEAN_LANGUAGES,
    ...MENA_LANGUAGES,
];

// ============================================
// 📈 STATISTICS
// ============================================
export const LANGUAGE_STATS = {
    totalLanguages: ALL_LANGUAGES.length,
    indianLanguages: INDIAN_LANGUAGES.length,
    asianLanguages: ASIAN_LANGUAGES.length,
    europeanLanguages: EUROPEAN_LANGUAGES.length,
    menaLanguages: MENA_LANGUAGES.length,

    tier1Count: ALL_LANGUAGES.filter(l => l.tier === 1).length,
    tier2Count: ALL_LANGUAGES.filter(l => l.tier === 2).length,
    tier3Count: ALL_LANGUAGES.filter(l => l.tier === 3).length,

    totalRegions: ALL_LANGUAGES.reduce((sum, l) => sum + l.regions.length, 0),

    getLanguageByCode: (code: string) => ALL_LANGUAGES.find(l => l.code === code),
    getLanguagesByTier: (tier: 1 | 2 | 3) => ALL_LANGUAGES.filter(l => l.tier === tier),
    getIndianLanguages: () => INDIAN_LANGUAGES,
    getAsianLanguages: () => ASIAN_LANGUAGES,
    getEuropeanLanguages: () => EUROPEAN_LANGUAGES,
    getMenaLanguages: () => MENA_LANGUAGES,
};

console.log(`🌍 Loaded ${ALL_LANGUAGES.length} languages covering 7+ billion people`);
console.log(`🇮🇳 Indian Languages: ${INDIAN_LANGUAGES.length}`);
console.log(`🌏 Asian Languages: ${ASIAN_LANGUAGES.length}`);
console.log(`🌍 European Languages: ${EUROPEAN_LANGUAGES.length}`);
console.log(`🌍 MENA Languages: ${MENA_LANGUAGES.length}`);
