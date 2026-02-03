/**
 * Language Tier Configuration
 * Tiered access to languages based on subscription plan
 */

import { ALL_LANGUAGES, INDIAN_LANGUAGES, type LanguageConfig } from './globalLanguages';

// Subscription Plans
export type SubscriptionPlan = 'free' | 'pro' | 'enterprise' | 'global_admin';

// Free Tier Languages (5 - Most commonly used)
export const FREE_TIER_LANGUAGES = ['en', 'es', 'hi', 'pt', 'fr'];

// Pro Tier Languages (15 - Free + Major languages)
export const PRO_TIER_LANGUAGES = [
    ...FREE_TIER_LANGUAGES,
    'de', 'zh', 'ar', 'ja', 'ko',      // +5 major
    'it', 'ru', 'id', 'tr', 'nl'       // +5 more
];

// Enterprise Tier Languages (All 44)
export const ENTERPRISE_TIER_LANGUAGES = ALL_LANGUAGES.map(l => l.code);

// Plan Configuration
export const PLAN_CONFIG: Record<SubscriptionPlan, {
    name: string;
    languageCodes: string[];
    maxLanguages: number;
    features: string[];
    price: string;
    color: string;
}> = {
    free: {
        name: 'Free',
        languageCodes: FREE_TIER_LANGUAGES,
        maxLanguages: 5,
        features: [
            '5 languages (English, Spanish, Hindi, Portuguese, French)',
            'Basic content generation',
            '50 pieces/month',
            'Manual publishing only',
        ],
        price: '$0',
        color: 'slate',
    },
    pro: {
        name: 'Pro',
        languageCodes: PRO_TIER_LANGUAGES,
        maxLanguages: 15,
        features: [
            '15 languages (includes Chinese, Arabic, Japanese, etc.)',
            'Advanced content generation',
            '500 pieces/month',
            'Approval-based publishing',
            'Analytics dashboard',
        ],
        price: '$29/month',
        color: 'blue',
    },
    enterprise: {
        name: 'Enterprise',
        languageCodes: ENTERPRISE_TIER_LANGUAGES,
        maxLanguages: 44,
        features: [
            'All 44 languages',
            'Unlimited content generation',
            'All publishing modes',
            'Dedicated support',
            'Custom integrations',
            'API access',
        ],
        price: '$99/month',
        color: 'violet',
    },
    global_admin: {
        name: 'Global Admin',
        languageCodes: ENTERPRISE_TIER_LANGUAGES,
        maxLanguages: 44,
        features: [
            'All 44 languages',
            'Unlimited everything',
            'Global Portal access',
            'Admin controls',
            'White-label options',
        ],
        price: 'Internal',
        color: 'amber',
    },
};

// Get languages available for a specific plan
export function getLanguagesForPlan(plan: SubscriptionPlan): LanguageConfig[] {
    const planConfig = PLAN_CONFIG[plan];
    return ALL_LANGUAGES.filter(lang => planConfig.languageCodes.includes(lang.code));
}

// Check if a language is available for a plan
export function isLanguageAvailableForPlan(languageCode: string, plan: SubscriptionPlan): boolean {
    return PLAN_CONFIG[plan].languageCodes.includes(languageCode);
}

// Get upgrade message for locked languages
export function getUpgradeMessage(currentPlan: SubscriptionPlan, targetLanguageCode: string): string | null {
    if (isLanguageAvailableForPlan(targetLanguageCode, currentPlan)) {
        return null; // No upgrade needed
    }

    const targetLang = ALL_LANGUAGES.find(l => l.code === targetLanguageCode);
    if (!targetLang) return null;

    if (currentPlan === 'free') {
        if (PRO_TIER_LANGUAGES.includes(targetLanguageCode)) {
            return `Upgrade to Pro ($29/mo) to access ${targetLang.name}`;
        }
        return `Upgrade to Enterprise ($99/mo) to access ${targetLang.name}`;
    }

    if (currentPlan === 'pro') {
        return `Upgrade to Enterprise ($99/mo) to access ${targetLang.name}`;
    }

    return null;
}

// Get language stats by plan
export function getLanguageStatsByPlan(plan: SubscriptionPlan) {
    const available = getLanguagesForPlan(plan);
    const locked = ALL_LANGUAGES.filter(l => !PLAN_CONFIG[plan].languageCodes.includes(l.code));

    // Calculate total speaker reach
    const parsePopulation = (pop: string): number => {
        const num = parseFloat(pop.replace(/[^0-9.]/g, ''));
        if (pop.includes('B')) return num * 1000;
        return num;
    };

    const availableReach = available.reduce((sum, l) => sum + parsePopulation(l.speakers), 0);
    const totalReach = ALL_LANGUAGES.reduce((sum, l) => sum + parsePopulation(l.speakers), 0);

    return {
        totalLanguages: ALL_LANGUAGES.length,
        availableLanguages: available.length,
        lockedLanguages: locked.length,
        availableReach: `${(availableReach / 1000).toFixed(1)}B`,
        totalReach: `${(totalReach / 1000).toFixed(1)}B`,
        reachPercentage: Math.round((availableReach / totalReach) * 100),
        available,
        locked,
    };
}

// Indian languages by tier
export const INDIAN_LANGUAGES_BY_TIER = {
    free: INDIAN_LANGUAGES.filter(l => FREE_TIER_LANGUAGES.includes(l.code)),
    pro: INDIAN_LANGUAGES.filter(l => PRO_TIER_LANGUAGES.includes(l.code)),
    enterprise: INDIAN_LANGUAGES,
};

// Summary for display
export const TIER_SUMMARY = {
    free: {
        languages: 5,
        indianLanguages: 1, // Only Hindi
        globalReach: '~2.5B',
        platforms: 3,
    },
    pro: {
        languages: 15,
        indianLanguages: 1, // Still only Hindi in base
        globalReach: '~5B',
        platforms: 8,
    },
    enterprise: {
        languages: 44,
        indianLanguages: 13, // All Indian languages
        globalReach: '~7B+',
        platforms: 15,
    },
    global_admin: {
        languages: 44,
        indianLanguages: 13,
        globalReach: '~7B+',
        platforms: 15,
    },
};

console.log('📊 Language Tiers Loaded:');
console.log(`   Free: ${FREE_TIER_LANGUAGES.length} languages`);
console.log(`   Pro: ${PRO_TIER_LANGUAGES.length} languages`);
console.log(`   Enterprise: ${ENTERPRISE_TIER_LANGUAGES.length} languages`);
