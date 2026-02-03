'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import {
    Brain, Image, Mic, Video, MessageSquare, Mail,
    Key, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2,
    ExternalLink, Sparkles, ChevronDown, ChevronUp,
    Crown, Gift, Star, Info, Shield, RefreshCw, Zap,
    Globe, Server, Cloud, Cpu, Lock, Trash2, Save
} from 'lucide-react';
import {
    ProviderCategory,
    ProviderOption,
    getProvidersByCategory,
    getFreeProviders,
    CATEGORY_LABELS,
    AI_TEXT_PROVIDERS,
    AI_IMAGE_PROVIDERS,
    AI_VOICE_PROVIDERS,
    AI_VIDEO_PROVIDERS,
    SMS_PROVIDERS,
    EMAIL_PROVIDERS,
} from '@/lib/providers/providerConfig';

interface ProviderCredentials {
    [providerId: string]: {
        [fieldKey: string]: string;
    };
}

interface SelectedProviders {
    [category: string]: string; // category -> selected provider id
}

const CATEGORY_ICONS: Record<ProviderCategory, React.ReactNode> = {
    ai_text: <Brain className="w-5 h-5" />,
    ai_image: <Image className="w-5 h-5" />,
    ai_voice: <Mic className="w-5 h-5" />,
    ai_video: <Video className="w-5 h-5" />,
    sms: <MessageSquare className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
    storage: <Mail className="w-5 h-5" />,
    analytics: <Mail className="w-5 h-5" />,
};

const PRICING_BADGES = {
    free: { label: 'FREE', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    freemium: { label: 'FREE TIER', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    paid: { label: 'PAID', className: 'bg-amber-100 text-amber-700 border-amber-200' },
};

export default function AIProviderSettings() {
    const [selectedProviders, setSelectedProviders] = useState<SelectedProviders>({
        ai_text: 'openai',
        ai_image: 'openai_dalle',
        ai_voice: 'elevenlabs',
        ai_video: 'd-id',
        sms: 'twilio',
        email: 'sendgrid',
    });

    const [hostingStrategy, setHostingStrategy] = useState<'managed' | 'byo'>('managed');
    const [privateServerUrl, setPrivateServerUrl] = useState('');
    const [credentials, setCredentials] = useState<ProviderCredentials>({});
    const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        ai_text: true,
        ai_image: false,
        ai_voice: false,
        ai_video: false,
        sms: false,
        email: false,
    });
    const [testingProvider, setTestingProvider] = useState<string | null>(null);
    const [testResults, setTestResults] = useState<Record<string, 'success' | 'error' | null>>({});
    const [saving, setSaving] = useState(false);
    const [showFreeOnly, setShowFreeOnly] = useState(false);

    const { user } = useAuth();
    const organizationId = user?.organizationId || 'demo_org_123';

    // Load existing settings
    useEffect(() => {
        const fetchSettings = async () => {
            if (!organizationId) return;
            try {
                const res = await fetch(`/api/organizations?id=${organizationId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.settings) {
                        if (data.settings.hostingStrategy) setHostingStrategy(data.settings.hostingStrategy);
                        if (data.settings.privateCloudUrl) setPrivateServerUrl(data.settings.privateCloudUrl);
                        if (data.settings.aiCredentials) setCredentials(data.settings.aiCredentials);
                    }
                }
            } catch (err) {
                console.error('Failed to load infrastructure settings:', err);
            }
        };
        fetchSettings();
    }, [organizationId]);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const selectProvider = (category: string, providerId: string) => {
        setSelectedProviders(prev => ({
            ...prev,
            [category]: providerId,
        }));
    };

    const updateCredential = (providerId: string, fieldKey: string, value: string) => {
        setCredentials(prev => ({
            ...prev,
            [providerId]: {
                ...(prev[providerId] || {}),
                [fieldKey]: value,
            },
        }));
    };

    const toggleShowSecret = (key: string) => {
        setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const testProvider = async (providerId: string) => {
        setTestingProvider(providerId);
        setTestResults(prev => ({ ...prev, [providerId]: null }));

        const providerCreds = credentials[providerId] || {};
        const hasCredentials = Object.values(providerCreds).some(v => v && (v as string).length > 0);

        if (!hasCredentials) {
            setTestResults(prev => ({ ...prev, [providerId]: 'error' }));
            setTestingProvider(null);
            return;
        }

        try {
            const response = await fetch('/api/ai/test-provider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    providerId,
                    credentials: providerCreds
                }),
            });

            const data = await response.json();

            setTestResults(prev => ({
                ...prev,
                [providerId]: data.success ? 'success' : 'error',
            }));

        } catch (error) {
            console.error('Test error:', error);
            setTestResults(prev => ({ ...prev, [providerId]: 'error' }));
        } finally {
            setTestingProvider(null);
        }
    };

    const clearProviderCredentials = async (providerId: string) => {
        if (!confirm(`Are you sure you want to clear credentials for ${providerId}?`)) return;

        const updatedCreds = { ...credentials };
        delete updatedCreds[providerId];

        setCredentials(updatedCreds);
        setTestResults(prev => {
            const updated = { ...prev };
            delete updated[providerId];
            return updated;
        });

        // Immediately save the deletion
        await handleSaveAll(updatedCreds, true);
    };

    const handleSaveAll = async (providedCreds?: ProviderCredentials, silent = false) => {
        setSaving(true);
        const credsToSave = providedCreds || credentials;

        try {
            // Save to organization settings in database
            const response = await fetch('/api/organizations', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: organizationId,
                    settings: {
                        hostingStrategy,
                        privateCloudUrl: privateServerUrl,
                        aiCredentials: credsToSave
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save settings to database');
            }

            console.log('Infrastructure settings persisted:', {
                organizationId,
                hostingStrategy,
                privateServerUrl,
            });

            if (!silent) {
                alert('Infrastructure settings saved successfully!');
            }
        } catch (error) {
            console.error('Save error:', error);
            if (!silent) {
                alert('Failed to save settings. Please check your connection.');
            }
        } finally {
            setSaving(false);
        }
    };

    const renderProviderCard = (provider: ProviderOption, category: ProviderCategory) => {
        const isSelected = selectedProviders[category] === provider.id;
        const providerCreds = credentials[provider.id] || {};
        const testResult = testResults[provider.id];

        return (
            <div
                key={provider.id}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${isSelected
                    ? 'border-violet-500 bg-violet-50/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                onClick={() => selectProvider(category, provider.id)}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-800">{provider.name}</h4>
                            {provider.recommended && (
                                <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold flex items-center gap-1">
                                    <Star className="w-3 h-3" /> Recommended
                                </span>
                            )}
                            {provider.demoAvailable && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                                    <Gift className="w-3 h-3" /> Demo Ready
                                </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${PRICING_BADGES[provider.pricing].className}`}>
                                {PRICING_BADGES[provider.pricing].label}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{provider.description}</p>
                        {provider.freeTier && (
                            <p className="text-xs text-emerald-600 mt-1 font-medium">
                                ✨ {provider.freeTier}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {isSelected && (
                            <div className="flex items-center gap-1 animate-fade-in">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearProviderCredentials(provider.id);
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600 transition-all"
                                    title="Delete/Clear Credentials"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSaveAll();
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-violet-100 text-slate-400 hover:text-violet-600 transition-all"
                                    title="Save Credentials"
                                >
                                    <Save className="w-4 h-4" />
                                </button>
                                <div className="ml-1 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mt-3">
                    {provider.features.slice(0, 4).map((feature, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Credentials (when selected) */}
                {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3" onClick={e => e.stopPropagation()}>
                        {provider.requiredFields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    {field.label}
                                    {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <div className="relative">
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={providerCreds[field.key] || ''}
                                            onChange={(e) => updateCredential(provider.id, field.key, e.target.value)}
                                            placeholder={field.placeholder}
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
                                        />
                                    ) : (
                                        <input
                                            type={field.type === 'password' && !showSecrets[`${provider.id}-${field.key}`] ? 'password' : 'text'}
                                            value={providerCreds[field.key] || ''}
                                            onChange={(e) => updateCredential(provider.id, field.key, e.target.value)}
                                            placeholder={field.placeholder}
                                            className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        />
                                    )}
                                    {field.type === 'password' && (
                                        <button
                                            type="button"
                                            onClick={() => toggleShowSecret(`${provider.id}-${field.key}`)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showSecrets[`${provider.id}-${field.key}`] ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    )}
                                </div>
                                {field.helpText && (
                                    <p className="text-xs text-slate-400 mt-1">{field.helpText}</p>
                                )}
                            </div>
                        ))}

                        {/* Test & Links */}
                        <div className="flex items-center justify-between pt-2">
                            <a
                                href={provider.docsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Documentation
                            </a>
                            <div className="flex items-center gap-2">
                                {testResult === 'success' && (
                                    <span className="text-emerald-600 text-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" /> Connected
                                    </span>
                                )}
                                {testResult === 'error' && (
                                    <span className="text-red-600 text-sm flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" /> Failed
                                    </span>
                                )}
                                <button
                                    onClick={() => testProvider(provider.id)}
                                    disabled={testingProvider === provider.id}
                                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 flex items-center gap-1 disabled:opacity-50"
                                >
                                    {testingProvider === provider.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <RefreshCw className="w-4 h-4" />
                                    )}
                                    Test
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderCategory = (category: ProviderCategory) => {
        const categoryInfo = CATEGORY_LABELS[category];
        const providers = getProvidersByCategory(category);
        const filteredProviders = showFreeOnly
            ? providers.filter(p => p.pricing === 'free' || p.demoAvailable)
            : providers;
        const isExpanded = expandedCategories[category];
        const selectedProvider = providers.find(p => p.id === selectedProviders[category]);

        return (
            <div key={category} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Category Header */}
                <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                            {CATEGORY_ICONS[category]}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                {categoryInfo.icon} {categoryInfo.label}
                            </h3>
                            <p className="text-sm text-slate-500">{categoryInfo.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {selectedProvider && (
                            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
                                {selectedProvider.name}
                            </span>
                        )}
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                    </div>
                </button>

                {/* Provider List */}
                {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100">
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredProviders.map(provider => renderProviderCard(provider, category))}
                        </div>
                        {filteredProviders.length === 0 && (
                            <div className="text-center py-8 text-slate-400">
                                No free providers available in this category. Disable the "Free Only" filter to see all options.
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const freeProviders = getFreeProviders();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Key className="w-5 h-5 text-violet-600" />
                            AI Infrastructure Model
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Choose between our managed infrastructure or your private cloud setup
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showFreeOnly}
                                onChange={(e) => setShowFreeOnly(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                            />
                            <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                                <Gift className="w-4 h-4 text-emerald-500" />
                                Show Free
                            </span>
                        </label>
                    </div>
                </div>

                {/* Infrastructure Selection Tabs */}
                <div className="mt-8 grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    <button
                        onClick={() => setHostingStrategy('managed')}
                        className={`flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-bold transition-all ${hostingStrategy === 'managed'
                            ? 'bg-white text-violet-600 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Cloud className={`w-5 h-5 ${hostingStrategy === 'managed' ? 'animate-pulse' : ''}`} />
                        DigitalMEng Cloud
                    </button>
                    <button
                        onClick={() => setHostingStrategy('byo')}
                        className={`flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-bold transition-all ${hostingStrategy === 'byo'
                            ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Server className="w-5 h-5" />
                        Private BYO Cloud
                    </button>
                </div>
            </div>

            {/* Strategy Context Banner */}
            {hostingStrategy === 'managed' ? (
                <div className="p-4 bg-violet-50 border-b border-violet-100">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-violet-600 rounded-xl text-white shadow-lg shadow-violet-500/20">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-violet-900">Zero Configuration Mode</h3>
                            <p className="text-sm text-violet-700 mt-0.5 leading-relaxed">
                                DigitalMEng handles all AI infrastructure, API keys, and model hosting. You simply pay based on usage tokens.
                                <span className="ml-2 font-bold underline cursor-pointer">View current limits →</span>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-emerald-50 border-b border-emerald-100">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div className="max-w-xl">
                                <h3 className="font-bold text-emerald-900">Private Enterprise Bridge</h3>
                                <p className="text-sm text-emerald-700 mt-0.5 leading-relaxed">
                                    Use your own API keys and point DigitalMEng to your private inference servers or proxies.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 max-w-sm">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Cpu className="h-4 w-4 text-emerald-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Private Cloud URL (Optional)"
                                    value={privateServerUrl}
                                    onChange={(e) => setPrivateServerUrl(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Provider Categories - Only show full list in BYO mode */}
            {
                hostingStrategy === 'byo' ? (
                    (['ai_text', 'ai_image', 'ai_voice', 'ai_video', 'sms', 'email'] as ProviderCategory[]).map(
                        category => renderCategory(category)
                    )
                ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Managed Infrastructure Active</h3>
                        <p className="text-slate-500 max-w-md mx-auto mt-2">
                            Advanced provider configuration is hidden in Managed Mode.
                            Switch to <span className="text-violet-600 font-bold">Private BYO Cloud</span> to enter your own API keys.
                        </p>
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-40">
                            {['OpenAI', 'Anthropic', 'Google', 'Stability'].map(p => (
                                <div key={p} className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-400">
                                    {p} Enabled
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Security Notice */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-amber-800">Security Notice</h3>
                        <p className="text-sm text-amber-700 mt-1">
                            All API keys are encrypted at rest using AES-256 and transmitted over HTTPS.
                            Never share your API keys publicly. Consider using environment variables for production deployments.
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end">
                <button
                    onClick={handleSaveAll}
                    disabled={saving}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5" />
                            Save All Provider Settings
                        </>
                    )}
                </button>
            </div>
        </div >
    );
}
