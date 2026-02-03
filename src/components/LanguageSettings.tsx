'use client';

import { useState } from 'react';
import { Globe, Sparkles, ChevronDown, Search, X, Check, Lock, Crown, Zap, ArrowUpRight } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/translations';
import {
    PLAN_CONFIG,
    isLanguageAvailableForPlan,
    getLanguageStatsByPlan,
    type SubscriptionPlan
} from '@/lib/config/languageTiers';

export interface ContentLanguage {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    rtl: boolean;
    tier?: 'free' | 'pro' | 'enterprise'; // Which tier unlocks this language
    aiQuality: 'excellent' | 'good' | 'moderate' | 'limited'; // AI generation quality
    regions?: string[]; // Key regions for this language
}

// AI Quality Legend:
// excellent = Native-level quality, reliable
// good = High quality, minor review needed
// moderate = Usable but may need editing
// limited = Basic quality, requires significant review

// All supported languages for content generation with tier info
export const ALL_CONTENT_LANGUAGES: ContentLanguage[] = [
    // FREE TIER - Major World Languages (5) - All Excellent AI Quality
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false, tier: 'free', aiQuality: 'excellent', regions: ['USA', 'UK', 'Canada', 'Australia', 'Global'] },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, tier: 'free', aiQuality: 'excellent', regions: ['Spain', 'Mexico', 'Argentina', 'Colombia', 'Latin America'] },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false, tier: 'free', aiQuality: 'good', regions: ['UP', 'MP', 'Bihar', 'Delhi', 'Rajasthan'] },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', rtl: false, tier: 'free', aiQuality: 'excellent', regions: ['Brazil', 'Portugal', 'Angola'] },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, tier: 'free', aiQuality: 'excellent', regions: ['France', 'Canada (Quebec)', 'Africa'] },

    // PRO TIER - Additional Major Languages (+10) - Excellent to Good AI Quality
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false, tier: 'pro', aiQuality: 'excellent', regions: ['Germany', 'Austria', 'Switzerland'] },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false, tier: 'pro', aiQuality: 'excellent', regions: ['China', 'Taiwan', 'Singapore', 'Malaysia'] },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, tier: 'pro', aiQuality: 'good', regions: ['Saudi Arabia', 'UAE', 'Egypt', 'Morocco'] },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false, tier: 'pro', aiQuality: 'excellent', regions: ['Japan'] },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false, tier: 'pro', aiQuality: 'excellent', regions: ['South Korea', 'North Korea'] },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false, tier: 'pro', aiQuality: 'excellent', regions: ['Italy', 'Switzerland'] },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false, tier: 'pro', aiQuality: 'good', regions: ['Russia', 'CIS Countries'] },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false, tier: 'pro', aiQuality: 'good', regions: ['Indonesia'] },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false, tier: 'pro', aiQuality: 'good', regions: ['Turkey', 'Cyprus'] },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false, tier: 'pro', aiQuality: 'good', regions: ['Netherlands', 'Belgium'] },

    // ENTERPRISE TIER - All Other Languages
    // Indian Regional Languages - Moderate to Limited AI Quality
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Tamil Nadu', 'Sri Lanka', 'Singapore'] },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Andhra Pradesh', 'Telangana'] },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'limited', regions: ['Karnataka'] },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'limited', regions: ['Kerala'] },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['West Bengal', 'Bangladesh'] },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Maharashtra'] },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Gujarat'] },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Punjab (India)', 'Punjab (Pakistan)'] },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'limited', regions: ['Odisha'] },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', rtl: false, tier: 'enterprise', aiQuality: 'limited', regions: ['Assam'] },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true, tier: 'enterprise', aiQuality: 'good', regions: ['Pakistan', 'UP', 'J&K'] },

    // Asian Languages - Good to Moderate AI Quality
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Vietnam'] },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Thailand'] },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Malaysia', 'Singapore', 'Brunei'] },
    { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Philippines'] },

    // European Languages - Good AI Quality
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Poland'] },
    { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Ukraine'] },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Sweden'] },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Czech Republic'] },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Romania'] },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Greece', 'Cyprus'] },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Hungary'] },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Denmark'] },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Finland'] },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['Norway'] },

    // Middle Eastern Languages
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true, tier: 'enterprise', aiQuality: 'good', regions: ['Israel'] },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true, tier: 'enterprise', aiQuality: 'moderate', regions: ['Iran', 'Afghanistan'] },

    // African Languages
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', rtl: false, tier: 'enterprise', aiQuality: 'moderate', regions: ['Kenya', 'Tanzania', 'Uganda'] },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', rtl: false, tier: 'enterprise', aiQuality: 'good', regions: ['South Africa'] },
];

// Get AI quality indicator
export const getAIQualityBadge = (quality: string) => {
    switch (quality) {
        case 'excellent': return { color: 'bg-green-500/20 text-green-400', label: '⭐ Excellent', icon: '🟢' };
        case 'good': return { color: 'bg-blue-500/20 text-blue-400', label: '✓ Good', icon: '🟡' };
        case 'moderate': return { color: 'bg-amber-500/20 text-amber-400', label: '⚠ Moderate', icon: '🟠' };
        case 'limited': return { color: 'bg-red-500/20 text-red-400', label: '! Limited', icon: '🔴' };
        default: return { color: 'bg-slate-500/20 text-slate-400', label: 'Unknown', icon: '⚪' };
    }
};

// Helper to check if language is available for a plan
const isLangAvailable = (langCode: string, plan: SubscriptionPlan): boolean => {
    const lang = ALL_CONTENT_LANGUAGES.find(l => l.code === langCode);
    if (!lang) return false;

    if (plan === 'global_admin' || plan === 'enterprise') return true;
    if (plan === 'pro' && (lang.tier === 'free' || lang.tier === 'pro')) return true;
    if (plan === 'free' && lang.tier === 'free') return true;
    return false;
};

interface LanguageSettingsProps {
    primaryLanguage?: string;
    targetMarkets?: string[];
    onSave?: (settings: { primaryLanguage: string; targetMarkets: string[] }) => void;
    currentLanguage: string;
    userPlan?: SubscriptionPlan; // New prop for user's subscription plan
}

export default function LanguageSettings({
    primaryLanguage = 'en',
    targetMarkets = [],
    onSave,
    currentLanguage,
    userPlan = 'free' // Default to free plan
}: LanguageSettingsProps) {
    const t = (key: string) => getTranslation(currentLanguage, key);
    const [selectedPrimary, setSelectedPrimary] = useState(primaryLanguage);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>(targetMarkets);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [autoTranslate, setAutoTranslate] = useState(true);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeTarget, setUpgradeTarget] = useState<ContentLanguage | null>(null);

    const filteredLanguages = ALL_CONTENT_LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLanguageClick = (lang: ContentLanguage) => {
        if (!isLangAvailable(lang.code, userPlan)) {
            setUpgradeTarget(lang);
            setShowUpgradeModal(true);
            return;
        }
        toggleMarket(lang.code);
    };

    const toggleMarket = (code: string) => {
        if (code === selectedPrimary) return; // Can't select primary as target
        if (!isLangAvailable(code, userPlan)) return; // Can't select locked languages

        setSelectedMarkets(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );
    };

    const primaryLang = ALL_CONTENT_LANGUAGES.find(l => l.code === selectedPrimary);
    const marketLangs = ALL_CONTENT_LANGUAGES.filter(l => selectedMarkets.includes(l.code));

    const handleSave = () => {
        onSave?.({ primaryLanguage: selectedPrimary, targetMarkets: selectedMarkets });
    };

    // Languages by tier for display
    const freeLanguages = ALL_CONTENT_LANGUAGES.filter(l => l.tier === 'free');
    const proLanguages = ALL_CONTENT_LANGUAGES.filter(l => l.tier === 'pro');
    const enterpriseLanguages = ALL_CONTENT_LANGUAGES.filter(l => l.tier === 'enterprise');

    // Stats
    const availableCount = ALL_CONTENT_LANGUAGES.filter(l => isLangAvailable(l.code, userPlan)).length;
    const lockedCount = ALL_CONTENT_LANGUAGES.length - availableCount;

    // Get tier badge color
    const getTierBadge = (tier: string | undefined) => {
        switch (tier) {
            case 'free': return { color: 'bg-slate-500/20 text-slate-300', label: 'Free' };
            case 'pro': return { color: 'bg-blue-500/20 text-blue-300', label: 'Pro' };
            case 'enterprise': return { color: 'bg-violet-500/20 text-violet-300', label: 'Enterprise' };
            default: return { color: 'bg-slate-500/20 text-slate-300', label: 'Free' };
        }
    };

    // Get required plan for upgrade
    const getRequiredPlan = (lang: ContentLanguage): string => {
        if (lang.tier === 'pro') return 'Pro ($29/mo)';
        return 'Enterprise ($99/mo)';
    };

    return (
        <div className="space-y-6">
            {/* Header with Plan Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{t('languageSettingsTitle')}</h2>
                        <p className="text-white/60 text-sm">{t('languageSettingsDesc')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${userPlan === 'enterprise' || userPlan === 'global_admin'
                        ? 'bg-violet-500/20 text-violet-300'
                        : userPlan === 'pro'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}>
                        {userPlan === 'global_admin' ? '👑 Admin' :
                            userPlan === 'enterprise' ? '🚀 Enterprise' :
                                userPlan === 'pro' ? '⭐ Pro' : '🆓 Free'}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {availableCount}/{ALL_CONTENT_LANGUAGES.length} {t('languagesCount')}
                    </span>
                </div>
            </div>

            {/* Upgrade Banner (for non-enterprise users) */}
            {userPlan !== 'enterprise' && userPlan !== 'global_admin' && (
                <div className="p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Crown className="w-8 h-8 text-violet-400" />
                            <div>
                                <p className="text-white font-medium">
                                    Unlock All {ALL_CONTENT_LANGUAGES.length} Languages
                                </p>
                                <p className="text-white/60 text-sm">
                                    {lockedCount} languages locked • Upgrade to access Tamil, Telugu, Kannada & more
                                </p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                            <Zap className="w-4 h-4" />
                            Upgrade
                        </button>
                    </div>
                </div>
            )}

            {/* Primary Content Language */}
            <div className="card p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    {t('primaryLanguageLabel')}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                    {t('primaryLanguageDesc')}
                </p>

                <button
                    onClick={() => setShowLanguageModal(true)}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{primaryLang?.flag}</span>
                        <div className="text-left">
                            <p className="text-white font-medium">{primaryLang?.name}</p>
                            <p className="text-white/60 text-sm">{primaryLang?.nativeName}</p>
                        </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </button>
            </div>

            {/* Target Markets with Tier Sections */}
            <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{t('targetMarketsLabel')}</h3>
                    <span className="text-white/60 text-sm">{selectedMarkets.length} {t('selectedCount')}</span>
                </div>

                {/* Selected Markets */}
                {marketLangs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {marketLangs.map(lang => (
                            <span
                                key={lang.code}
                                className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                                <button
                                    onClick={() => toggleMarket(lang.code)}
                                    className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('searchLanguagesPlaceholder')}
                        className="input w-full pl-10"
                    />
                </div>

                {/* FREE Tier Languages */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                        🆓 Free Plan Languages ({freeLanguages.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {filteredLanguages.filter(l => l.tier === 'free').map(lang => {
                            const isSelected = selectedMarkets.includes(lang.code);
                            const isPrimary = lang.code === selectedPrimary;

                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageClick(lang)}
                                    disabled={isPrimary}
                                    className={`p-3 rounded-lg border transition-all flex items-center gap-2 text-left ${isPrimary
                                        ? 'bg-yellow-500/10 border-yellow-500/30 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-purple-500/20 border-purple-500'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isPrimary ? 'text-yellow-400' : 'text-white'}`}>
                                            {lang.name}
                                        </p>
                                    </div>
                                    {isSelected && !isPrimary && (
                                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* PRO Tier Languages */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                        ⭐ Pro Plan Languages (+{proLanguages.length})
                        {userPlan === 'free' && <Lock className="w-3 h-3" />}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {filteredLanguages.filter(l => l.tier === 'pro').map(lang => {
                            const isSelected = selectedMarkets.includes(lang.code);
                            const isPrimary = lang.code === selectedPrimary;
                            const isLocked = !isLangAvailable(lang.code, userPlan);

                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageClick(lang)}
                                    className={`p-3 rounded-lg border transition-all flex items-center gap-2 text-left relative ${isLocked
                                        ? 'bg-slate-800/50 border-slate-700/50 opacity-60'
                                        : isPrimary
                                            ? 'bg-yellow-500/10 border-yellow-500/30 cursor-not-allowed'
                                            : isSelected
                                                ? 'bg-purple-500/20 border-purple-500'
                                                : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isLocked ? 'text-slate-400' : 'text-white'}`}>
                                            {lang.name}
                                        </p>
                                    </div>
                                    {isLocked && <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                                    {isSelected && !isLocked && <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ENTERPRISE Tier Languages */}
                <div>
                    <h4 className="text-sm font-medium text-violet-400 mb-2 flex items-center gap-2">
                        🚀 Enterprise Languages (+{enterpriseLanguages.length})
                        {(userPlan === 'free' || userPlan === 'pro') && <Lock className="w-3 h-3" />}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {filteredLanguages.filter(l => l.tier === 'enterprise').map(lang => {
                            const isSelected = selectedMarkets.includes(lang.code);
                            const isPrimary = lang.code === selectedPrimary;
                            const isLocked = !isLangAvailable(lang.code, userPlan);

                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageClick(lang)}
                                    className={`p-3 rounded-lg border transition-all flex items-center gap-2 text-left relative ${isLocked
                                        ? 'bg-slate-800/50 border-slate-700/50 opacity-60'
                                        : isPrimary
                                            ? 'bg-yellow-500/10 border-yellow-500/30 cursor-not-allowed'
                                            : isSelected
                                                ? 'bg-purple-500/20 border-purple-500'
                                                : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isLocked ? 'text-slate-400' : 'text-white'}`}>
                                            {lang.name}
                                        </p>
                                    </div>
                                    {isLocked && <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                                    {isSelected && !isLocked && <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Auto-Translation Toggle */}
            <div className="card p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">{t('autoTranslationLabel')}</h3>
                        <p className="text-white/60 text-sm mt-1">
                            {t('autoTranslationDesc')}
                        </p>
                    </div>
                    <button
                        onClick={() => setAutoTranslate(!autoTranslate)}
                        className={`relative w-14 h-8 rounded-full transition-colors ${autoTranslate ? 'bg-green-500' : 'bg-white/20'
                            }`}
                    >
                        <div
                            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${autoTranslate ? 'translate-x-6' : 'translate-x-0'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Coverage Summary */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-blue-400" />
                    <div>
                        <p className="text-white font-medium">
                            {t('coverageSummary').replace('{percentage}', ((selectedMarkets.length + 1) / availableCount * 100).toFixed(0))}
                        </p>
                        <p className="text-white/60 text-sm">
                            {t('coverageDetailsPrimary')}{primaryLang?.name}{t('coverageDetailsTranslations')}{selectedMarkets.length}{t('coverageDetailsLanguages')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                >
                    <Globe className="w-4 h-4" />
                    {t('saveLanguageSettings')}
                </button>
            </div>

            {/* Upgrade Modal */}
            {showUpgradeModal && upgradeTarget && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-md p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-violet-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {upgradeTarget.name} is Locked
                            </h3>
                            <p className="text-white/60">
                                Upgrade to <span className="text-violet-400 font-medium">{getRequiredPlan(upgradeTarget)}</span> to unlock {upgradeTarget.nativeName} and more languages.
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="p-3 bg-slate-700/50 rounded-lg flex items-center gap-3">
                                <span className="text-2xl">{upgradeTarget.flag}</span>
                                <div>
                                    <p className="text-white font-medium">{upgradeTarget.name}</p>
                                    <p className="text-white/60 text-sm">{upgradeTarget.nativeName}</p>
                                </div>
                                <span className={`ml-auto px-2 py-1 rounded-md text-xs font-medium ${getTierBadge(upgradeTarget.tier).color}`}>
                                    {getTierBadge(upgradeTarget.tier).label}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowUpgradeModal(false)}
                                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:from-violet-600 hover:to-purple-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Language Selection Modal */}
            {showLanguageModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-2xl max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">{t('selectPrimaryLanguage')}</h3>
                            <button
                                onClick={() => setShowLanguageModal(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-white/60" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <input
                                    type="text"
                                    placeholder={t('searchLanguagesPlaceholder')}
                                    className="input w-full pl-10"
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                                {ALL_CONTENT_LANGUAGES.filter(l => isLangAvailable(l.code, userPlan)).map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setSelectedPrimary(lang.code);
                                            setSelectedMarkets(prev => prev.filter(m => m !== lang.code));
                                            setShowLanguageModal(false);
                                        }}
                                        className={`p-4 rounded-lg border transition-all flex items-center gap-3 ${lang.code === selectedPrimary
                                            ? 'bg-purple-500/20 border-purple-500'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        <span className="text-2xl">{lang.flag}</span>
                                        <div className="text-left">
                                            <p className="text-white font-medium">{lang.name}</p>
                                            <p className="text-white/60 text-sm">{lang.nativeName}</p>
                                        </div>
                                        {lang.code === selectedPrimary && (
                                            <Check className="w-5 h-5 text-purple-400 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
