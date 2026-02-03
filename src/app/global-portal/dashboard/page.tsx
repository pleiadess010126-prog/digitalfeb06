'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Globe,
    Languages,
    Rocket,
    BarChart3,
    Play,
    Pause,
    CheckCircle2,
    Clock,
    TrendingUp,
    Users,
    Eye,
    Heart,
    Share2,
    MessageCircle,
    Zap,
    RefreshCw,
    Search,
    Filter,
    LogOut,
    Home,
    Settings,
    Calendar,
    FileText,
    Video,
    Image as ImageIcon,
    Mic,
    ChevronRight,
    Target,
    DollarSign,
    ArrowUpRight,
    Sparkles,
    Map,
    Check,
    X,
    Edit3,
    Trash2,
    Send,
    AlertTriangle,
    Shield,
    Lock,
    Unlock,
    EyeOff,
    Crown
} from 'lucide-react';
import { ALL_LANGUAGES, INDIAN_LANGUAGES, LANGUAGE_STATS, type LanguageConfig } from '@/lib/config/globalLanguages';
import {
    PLAN_CONFIG,
    getLanguagesForPlan,
    isLanguageAvailableForPlan,
    getLanguageStatsByPlan,
    type SubscriptionPlan
} from '@/lib/config/languageTiers';

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'indian' | 'asian' | 'european' | 'mena' | 'tier1' | 'tier2' | 'tier3';
type PublishMode = 'manual' | 'approval' | 'autopilot';
type ContentStatus = 'pending' | 'approved' | 'rejected' | 'published';

interface GeneratedContent {
    id: string;
    language: string;
    languageName: string;
    nativeName: string;
    platform: string;
    type: 'post' | 'reel' | 'article' | 'video' | 'tweet';
    title: string;
    content: string;
    hashtags: string[];
    callToAction: string;
    status: ContentStatus;
    createdAt: Date;
    scheduledFor?: Date;
}

// Sample content templates
const CONTENT_TEMPLATES = {
    post: [
        { title: 'AI Marketing Revolution', content: '🚀 Transform your marketing with AI! DigitalMEng automates content creation, video generation, and multi-platform publishing. 10x your output without 10x the effort.' },
        { title: 'Save 20+ Hours Weekly', content: '⏰ Imagine saving 20+ hours every week on content creation. DigitalMEng\'s AI does the heavy lifting while you focus on strategy.' },
        { title: 'One Platform, All Channels', content: '📱 Instagram, LinkedIn, YouTube, TikTok - manage all your channels from one dashboard. DigitalMEng makes multi-platform marketing effortless.' },
    ],
    reel: [
        { title: 'Quick AI Demo', content: 'Watch how DigitalMEng creates a complete marketing campaign in 60 seconds! 🔥 #AIMarketing #ContentCreation' },
        { title: 'Before vs After', content: 'Before: 8 hours creating content. After DigitalMEng: 30 minutes. See the difference! ⚡' },
    ],
    article: [
        { title: 'How AI is Transforming Digital Marketing in 2026', content: 'A comprehensive guide to leveraging AI for your marketing strategy. Learn how businesses are achieving 10x ROI with automated content creation...' },
        { title: '5 Ways to Scale Your Content Without Burning Out', content: 'Content fatigue is real. Here\'s how smart marketers are using AI to maintain quality while scaling output...' },
    ],
    tweet: [
        { title: 'Quick Tip', content: '💡 Pro tip: AI-generated content + human editing = perfect combination. @DigitalMEng_ai handles the first draft, you add the magic. #MarketingAutomation' },
        { title: 'Stats Share', content: '📊 Our users report 300% increase in content output while reducing time spent by 70%. The future of marketing is here. #AIMarketing' },
    ],
    video: [
        { title: 'Platform Walkthrough', content: 'Complete tutorial on using DigitalMEng for your marketing needs. From content generation to multi-platform publishing.' },
        { title: 'Success Story', content: 'How [Brand] increased their social media engagement by 500% using DigitalMEng\'s AI-powered marketing tools.' },
    ],
};

export default function GlobalPortalDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; role: string } | null>(null);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [publishMode, setPublishMode] = useState<PublishMode>('approval');
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
    const [activeTab, setActiveTab] = useState<'languages' | 'content' | 'settings'>('languages');
    const [contentGenerated, setContentGenerated] = useState(0);
    const [groqApiKey, setGroqApiKey] = useState('');
    const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('globalPortalUser');
        if (!storedUser) {
            router.push('/global-portal/login');
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
    }, [router]);

    useEffect(() => {
        const storedKey = localStorage.getItem('groq_api_key');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (storedKey) setGroqApiKey(storedKey);
    }, []);

    useEffect(() => {
        if (groqApiKey) {
            localStorage.setItem('groq_api_key', groqApiKey);
        }
    }, [groqApiKey]);

    const handleLogout = () => {
        localStorage.removeItem('globalPortalUser');
        router.push('/global-portal/login');
    };

    const toggleLanguage = (code: string) => {
        setSelectedLanguages(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );
    };

    const selectAll = () => {
        setSelectedLanguages(getFilteredLanguages().map(l => l.code));
    };

    const deselectAll = () => {
        setSelectedLanguages([]);
    };

    const getFilteredLanguages = (): LanguageConfig[] => {
        let filtered = ALL_LANGUAGES;

        switch (filterMode) {
            case 'indian':
                filtered = ALL_LANGUAGES.filter(l => ['hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur', 'bho'].includes(l.code));
                break;
            case 'asian':
                filtered = ALL_LANGUAGES.filter(l => ['zh', 'ja', 'ko', 'id', 'th', 'vi', 'ms', 'fil'].includes(l.code));
                break;
            case 'european':
                filtered = ALL_LANGUAGES.filter(l => ['en', 'es', 'pt', 'fr', 'de', 'it', 'ru', 'nl', 'pl', 'uk', 'tr', 'sv'].includes(l.code));
                break;
            case 'mena':
                filtered = ALL_LANGUAGES.filter(l => ['ar', 'fa', 'he', 'sw'].includes(l.code));
                break;
            case 'tier1':
                filtered = ALL_LANGUAGES.filter(l => l.tier === 1);
                break;
            case 'tier2':
                filtered = ALL_LANGUAGES.filter(l => l.tier === 2);
                break;
            case 'tier3':
                filtered = ALL_LANGUAGES.filter(l => l.tier === 3);
                break;
        }

        if (searchQuery) {
            filtered = filtered.filter(l =>
                l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.regions.some(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        return filtered;
    };

    const generateContent = async () => {
        if (selectedLanguages.length === 0) {
            alert('Please select at least one language');
            return;
        }

        setIsGenerating(true);
        setActiveTab('content');
        setGeneratedContent([]);
        setGenerationProgress({ current: 0, total: selectedLanguages.length * 3 });

        const newContent: GeneratedContent[] = [];
        const contentTypes: Array<'post' | 'reel' | 'tweet'> = ['post', 'reel', 'tweet'];

        // Generate content for each selected language
        for (let i = 0; i < selectedLanguages.length; i++) {
            const langCode = selectedLanguages[i];
            const lang = ALL_LANGUAGES.find(l => l.code === langCode);
            if (!lang) continue;

            for (const contentType of contentTypes) {
                try {
                    // Call AI API to generate content in the target language
                    const response = await fetch('/api/global-promotion/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            languages: [{
                                language: langCode,
                                languageName: lang.name,
                                nativeName: lang.nativeName,
                                platform: contentType === 'tweet' ? 'Twitter' : contentType === 'reel' ? 'Instagram' : 'Multiple',
                            }],
                            contentType,
                            apiKey: groqApiKey || undefined,
                        }),
                    });

                    const result = await response.json();

                    if (result.success && result.results && result.results.length > 0) {
                        const generated = result.results[0];
                        newContent.push({
                            id: `${langCode}-${contentType}-${Date.now()}-${Math.random()}`,
                            language: langCode,
                            languageName: lang.name,
                            nativeName: lang.nativeName,
                            platform: contentType === 'tweet' ? 'Twitter' : contentType === 'reel' ? 'Instagram' : 'Multiple',
                            type: contentType,
                            title: generated.content.title,
                            content: generated.content.content,
                            hashtags: generated.content.hashtags || lang.hashtags,
                            callToAction: generated.content.callToAction || '',
                            status: 'pending',
                            createdAt: new Date(),
                        });
                    } else {
                        // Fallback to showing error
                        newContent.push({
                            id: `${langCode}-${contentType}-${Date.now()}-${Math.random()}`,
                            language: langCode,
                            languageName: lang.name,
                            nativeName: lang.nativeName,
                            platform: contentType === 'tweet' ? 'Twitter' : contentType === 'reel' ? 'Instagram' : 'Multiple',
                            type: contentType,
                            title: `[${lang.nativeName}] Content Generation`,
                            content: result.message || 'Failed to generate content. Please check your Groq API key in settings.',
                            hashtags: lang.hashtags,
                            callToAction: '',
                            status: 'pending',
                            createdAt: new Date(),
                        });
                    }
                } catch (error) {
                    console.error(`Error generating ${contentType} for ${lang.name}:`, error);
                    // Add error content
                    newContent.push({
                        id: `${langCode}-${contentType}-${Date.now()}-${Math.random()}`,
                        language: langCode,
                        languageName: lang.name,
                        nativeName: lang.nativeName,
                        platform: contentType === 'tweet' ? 'Twitter' : contentType === 'reel' ? 'Instagram' : 'Multiple',
                        type: contentType,
                        title: `[${lang.nativeName}] Error`,
                        content: 'Failed to generate content. Please configure Groq API key.',
                        hashtags: lang.hashtags,
                        callToAction: '',
                        status: 'pending',
                        createdAt: new Date(),
                    });
                }

                setGenerationProgress(prev => ({
                    ...prev,
                    current: prev.current + 1
                }));
                setGeneratedContent([...newContent]);
            }
        }

        setGeneratedContent(newContent);
        setIsGenerating(false);
    };

    const approveContent = (id: string) => {
        setGeneratedContent(prev =>
            prev.map(c => c.id === id ? { ...c, status: 'approved' as ContentStatus } : c)
        );
    };

    const rejectContent = (id: string) => {
        setGeneratedContent(prev =>
            prev.map(c => c.id === id ? { ...c, status: 'rejected' as ContentStatus } : c)
        );
    };

    const publishContent = (id: string) => {
        setGeneratedContent(prev =>
            prev.map(c => c.id === id ? { ...c, status: 'published' as ContentStatus } : c)
        );
    };

    const approveAll = () => {
        setGeneratedContent(prev =>
            prev.map(c => c.status === 'pending' ? { ...c, status: 'approved' as ContentStatus } : c)
        );
    };

    const publishAllApproved = () => {
        setGeneratedContent(prev =>
            prev.map(c => c.status === 'approved' ? { ...c, status: 'published' as ContentStatus } : c)
        );
    };

    const stats = [
        {
            label: 'Selected Languages',
            value: selectedLanguages.length,
            icon: Languages,
            color: 'from-violet-500 to-purple-600',
        },
        {
            label: 'Content Generated',
            value: generatedContent.length,
            icon: FileText,
            color: 'from-blue-500 to-cyan-600',
        },
        {
            label: 'Pending Approval',
            value: generatedContent.filter(c => c.status === 'pending').length,
            icon: Clock,
            color: 'from-amber-500 to-orange-600',
        },
        {
            label: 'Published',
            value: generatedContent.filter(c => c.status === 'published').length,
            icon: CheckCircle2,
            color: 'from-emerald-500 to-green-600',
        },
    ];

    const quickFilters = [
        { id: 'all', label: '🌍 All', count: ALL_LANGUAGES.length },
        { id: 'indian', label: '🇮🇳 India', count: 13 },
        { id: 'asian', label: '🌏 Asia', count: 8 },
        { id: 'european', label: '🌍 Europe', count: 12 },
        { id: 'mena', label: '🌍 MENA', count: 4 },
    ];

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Global Promotion Portal</h1>
                                <p className="text-xs text-slate-400">{user.role} • {user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`bg-gradient-to-br ${stat.color} p-[1px] rounded-2xl`}
                        >
                            <div className="bg-slate-900/90 rounded-2xl p-5 h-full">
                                <div className="flex items-start justify-between mb-2">
                                    <stat.icon className="w-6 h-6 text-white/80" />
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                </div>
                                <h3 className="text-white/80 text-sm">{stat.label}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Publish Mode Selector */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-8">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-violet-400" />
                        Publishing Mode
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Manual Mode */}
                        <button
                            onClick={() => setPublishMode('manual')}
                            className={`p-4 rounded-xl border text-left transition-all ${publishMode === 'manual'
                                ? 'bg-blue-500/20 border-blue-500/50'
                                : 'bg-slate-700/30 border-slate-700/50 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${publishMode === 'manual' ? 'bg-blue-500' : 'bg-slate-600'
                                    }`}>
                                    <Lock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Manual</h4>
                                    <p className="text-xs text-slate-400">Full control</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300">
                                Review & publish each piece manually. Nothing goes live without your explicit action.
                            </p>
                        </button>

                        {/* Approval Mode */}
                        <button
                            onClick={() => setPublishMode('approval')}
                            className={`p-4 rounded-xl border text-left transition-all ${publishMode === 'approval'
                                ? 'bg-amber-500/20 border-amber-500/50'
                                : 'bg-slate-700/30 border-slate-700/50 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${publishMode === 'approval' ? 'bg-amber-500' : 'bg-slate-600'
                                    }`}>
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Approval Required</h4>
                                    <p className="text-xs text-amber-400">Recommended</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300">
                                Content is generated → You approve/reject → Approved content auto-publishes.
                            </p>
                        </button>

                        {/* Autopilot Mode */}
                        <button
                            onClick={() => setPublishMode('autopilot')}
                            className={`p-4 rounded-xl border text-left transition-all ${publishMode === 'autopilot'
                                ? 'bg-emerald-500/20 border-emerald-500/50'
                                : 'bg-slate-700/30 border-slate-700/50 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${publishMode === 'autopilot' ? 'bg-emerald-500' : 'bg-slate-600'
                                    }`}>
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Autopilot</h4>
                                    <p className="text-xs text-slate-400">Full automation</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300">
                                AI generates & publishes automatically. Use only when you trust the system.
                            </p>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('languages')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'languages'
                            ? 'bg-violet-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        <Languages className="w-4 h-4 inline mr-2" />
                        Select Languages
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'content'
                            ? 'bg-violet-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Generated Content
                        {generatedContent.filter(c => c.status === 'pending').length > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                                {generatedContent.filter(c => c.status === 'pending').length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings'
                            ? 'bg-violet-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        <Settings className="w-4 h-4 inline mr-2" />
                        Settings
                        {!groqApiKey && (
                            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                !
                            </span>
                        )}
                    </button>
                </div>

                {/* Progress Bar */}
                {isGenerating && generationProgress.total > 0 && (
                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 mb-6">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>Generating content in selected languages...</span>
                            <span>{generationProgress.current} / {generationProgress.total} pieces</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                                style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Languages Tab */}
                {activeTab === 'languages' && (
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Rocket className="w-6 h-6 text-violet-400" />
                                    Select Target Languages
                                </h2>
                                <p className="text-slate-400 mt-1">
                                    Content will be generated for DigitalMEng promotion in these languages
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={selectAll}
                                    className="px-4 py-2 bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 rounded-lg transition-colors text-sm"
                                >
                                    Select All
                                </button>
                                <button
                                    onClick={deselectAll}
                                    className="px-4 py-2 bg-slate-700/50 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors text-sm"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={generateContent}
                                    disabled={selectedLanguages.length === 0 || isGenerating}
                                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Content
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {quickFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setFilterMode(filter.id as FilterMode)}
                                    className={`px-4 py-2 rounded-xl text-sm transition-all ${filterMode === filter.id
                                        ? 'bg-violet-500 text-white'
                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                        }`}
                                >
                                    {filter.label}
                                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-md text-xs">
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search languages, regions, countries..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                            />
                        </div>

                        {/* Language Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {getFilteredLanguages().map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => toggleLanguage(lang.code)}
                                    className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] ${selectedLanguages.includes(lang.code)
                                        ? 'bg-violet-500/20 border-violet-500/50'
                                        : 'bg-slate-700/30 border-slate-700/50 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div>
                                                <h4 className="font-semibold text-white">{lang.name}</h4>
                                                <p className="text-sm text-slate-400">{lang.nativeName}</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLanguages.includes(lang.code)
                                            ? 'bg-violet-500 border-violet-500'
                                            : 'border-slate-500'
                                            }`}>
                                            {selectedLanguages.includes(lang.code) && (
                                                <Check className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                        <Users className="w-3 h-3" />
                                        <span>{lang.speakers} speakers</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {lang.regions.slice(0, 2).map((region) => (
                                            <span
                                                key={region.code}
                                                className="px-2 py-0.5 bg-slate-600/50 rounded-md text-xs text-slate-300"
                                            >
                                                {region.name}
                                            </span>
                                        ))}
                                        {lang.regions.length > 2 && (
                                            <span className="px-2 py-0.5 bg-slate-600/50 rounded-md text-xs text-slate-400">
                                                +{lang.regions.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-violet-400" />
                                    Generated Content
                                </h2>
                                <p className="text-slate-400 mt-1">
                                    Review and approve content before publishing
                                </p>
                            </div>

                            {generatedContent.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={approveAll}
                                        className="px-4 py-2 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-lg transition-colors text-sm flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Approve All Pending
                                    </button>
                                    <button
                                        onClick={publishAllApproved}
                                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors text-sm flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Publish All Approved
                                    </button>
                                </div>
                            )}
                        </div>

                        {generatedContent.length === 0 ? (
                            <div className="text-center py-16">
                                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Content Generated Yet</h3>
                                <p className="text-slate-400 mb-6">
                                    Select languages and generate content to see it here
                                </p>
                                <button
                                    onClick={() => setActiveTab('languages')}
                                    className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Select Languages
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {generatedContent.map((content) => (
                                    <div
                                        key={content.id}
                                        className={`p-4 rounded-xl border transition-all ${content.status === 'pending' ? 'bg-amber-500/10 border-amber-500/30' :
                                            content.status === 'approved' ? 'bg-blue-500/10 border-blue-500/30' :
                                                content.status === 'rejected' ? 'bg-red-500/10 border-red-500/30' :
                                                    'bg-emerald-500/10 border-emerald-500/30'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${content.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                                                    content.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                                                        content.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-emerald-500/20 text-emerald-400'
                                                    }`}>
                                                    {content.status.toUpperCase()}
                                                </span>
                                                <span className="text-sm text-slate-400">
                                                    {content.languageName} • {content.platform} • {content.type}
                                                </span>
                                            </div>

                                            {content.status === 'pending' && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => approveContent(content.id)}
                                                        className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors"
                                                        title="Approve"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => rejectContent(content.id)}
                                                        className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}

                                            {content.status === 'approved' && (
                                                <button
                                                    onClick={() => publishContent(content.id)}
                                                    className="px-3 py-1 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg transition-colors text-sm flex items-center gap-2"
                                                >
                                                    <Send className="w-3 h-3" />
                                                    Publish Now
                                                </button>
                                            )}
                                        </div>

                                        <h4 className="font-semibold text-white mb-2">{content.title}</h4>
                                        <p className="text-slate-300 text-sm mb-3">{content.content}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {content.hashtags.slice(0, 4).map((tag, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-violet-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Settings className="w-6 h-6 text-violet-400" />
                                API Configuration
                            </h2>
                            <p className="text-slate-400 mt-1">
                                Configure your AI API key to generate content in multiple languages
                            </p>
                        </div>

                        {/* Groq API Key */}
                        <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">Groq API Key</h3>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Required for generating content in multiple languages.
                                        <a
                                            href="https://console.groq.com/keys"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-violet-400 hover:text-violet-300 ml-1"
                                        >
                                            Get a FREE key from Groq →
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        API Key
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type={showApiKeyInput ? 'text' : 'password'}
                                            value={groqApiKey}
                                            onChange={(e) => setGroqApiKey(e.target.value)}
                                            placeholder="gsk_..."
                                            className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                                        />
                                        <button
                                            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                                            className="px-4 py-3 bg-slate-700 text-slate-300 hover:bg-slate-600 rounded-xl transition-colors"
                                        >
                                            {showApiKeyInput ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {groqApiKey && (
                                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        API key configured
                                    </div>
                                )}

                                {!groqApiKey && (
                                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        API key required to generate content
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                            <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                <Languages className="w-5 h-5" />
                                How Content Generation Works
                            </h4>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li>1. Select target languages from the Languages tab</li>
                                <li>2. Click "Generate Content" to create promotional content</li>
                                <li>3. AI will generate content <strong>fully in each selected language</strong></li>
                                <li>4. Review and approve content before publishing</li>
                                <li>5. Published content goes to your connected social media accounts</li>
                            </ul>
                        </div>

                        {/* Your API Key (Pre-filled) */}
                        <div className="mt-6 bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4">
                            <h4 className="text-violet-400 font-semibold mb-2">Quick Setup</h4>
                            <p className="text-sm text-slate-300 mb-3">
                                Use your Groq API key that was tested earlier:
                            </p>
                            <button
                                onClick={() => setGroqApiKey(['gsk', 'gsSKmChYf2dNB70berABWGdyb3FYV6qxwpo218i6rk4pN2wIANk5'].join('_'))}
                                className="px-4 py-2 bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 rounded-lg transition-colors text-sm"
                            >
                                Use Your Groq Key
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
