'use client';

import { useState } from 'react';
import {
    Globe, Video, Mic, Image as ImageIcon, MessageSquare, Mail,
    CheckCircle2, XCircle, Loader2, ExternalLink, Sparkles, Gift
} from 'lucide-react';

interface ApiTestResult {
    status: 'idle' | 'testing' | 'success' | 'error';
    message?: string;
}

interface AdminApiProvidersProps {
    apiKeys: Record<string, string>;
    testResults: Record<string, ApiTestResult>;
    onKeyChange: (service: any, value: string) => void;
    onTestConnection: (service: string, apiKey: string) => void;
}

// Provider configuration
const PROVIDERS = {
    text: [
        { id: 'openai', name: 'OpenAI', placeholder: 'ENTER_OPENAI_KEY', url: 'platform.openai.com/api-keys', desc: 'GPT-4, GPT-3.5' },
        { id: 'anthropic', name: 'Anthropic Claude', placeholder: 'ENTER_CLAUDE_KEY', url: 'console.anthropic.com', desc: 'Claude 3 Opus/Sonnet' },
        { id: 'gemini', name: 'Google Gemini', placeholder: 'ENTER_GOOGLE_KEY', url: 'ai.google.dev', desc: 'FREE: 60 req/min', free: true },
        { id: 'groq', name: 'Groq', placeholder: 'ENTER_GROQ_KEY', url: 'console.groq.com', desc: 'FREE: Fast LLaMA/Mixtral', free: true },
        { id: 'together', name: 'Together AI', placeholder: 'your-key', url: 'api.together.xyz', desc: '$25 free credits' },
        { id: 'cohere', name: 'Cohere', placeholder: 'your-key', url: 'dashboard.cohere.ai', desc: 'Command R+' },
        { id: 'openrouter', name: 'OpenRouter', placeholder: 'ENTER_OPENROUTER_KEY', url: 'openrouter.ai', desc: '100+ models' },
        { id: 'ollamaUrl', name: 'Ollama (Local)', placeholder: 'http://localhost:11434', url: 'ollama.ai', desc: 'FREE: 100% local', free: true, isUrl: true },
    ],
    video: [
        { id: 'did', name: 'D-ID', placeholder: 'your-key', url: 'studio.d-id.com', desc: 'AI Avatar Videos' },
        { id: 'heygen', name: 'HeyGen', placeholder: 'your-key', url: 'heygen.com', desc: '100+ avatars' },
        { id: 'synthesia', name: 'Synthesia', placeholder: 'your-key', url: 'synthesia.io', desc: 'Enterprise avatars' },
        { id: 'pictory', name: 'Pictory', placeholder: 'your-key', url: 'pictory.ai', desc: 'Text to video' },
        { id: 'runway', name: 'Runway', placeholder: 'your-key', url: 'runway.ml', desc: 'Gen-2 AI video' },
    ],
    voice: [
        { id: 'elevenlabs', name: 'ElevenLabs', placeholder: 'ENTER_ELEVENLABS_KEY', url: 'elevenlabs.io', desc: '10K chars/mo free' },
        { id: 'playht', name: 'PlayHT', placeholder: 'your-key', url: 'play.ht', desc: '12.5K words/mo free' },
        { id: 'murf', name: 'Murf.ai', placeholder: 'your-key', url: 'murf.ai', desc: '10 min/mo free' },
        { id: 'googleTts', name: 'Google Cloud TTS', placeholder: 'service-account-json', url: 'cloud.google.com/text-to-speech', desc: 'FREE: 4M chars/mo', free: true },
        { id: 'azureTts', name: 'Azure Speech', placeholder: 'subscription-key', url: 'portal.azure.com', desc: '5 hrs/mo free' },
    ],
    image: [
        { id: 'stabilityai', name: 'Stability AI', placeholder: 'ENTER_STABILITY_KEY', url: 'platform.stability.ai', desc: 'SDXL, SD3' },
        { id: 'leonardo', name: 'Leonardo.ai', placeholder: 'your-key', url: 'leonardo.ai', desc: 'FREE: 150 tokens/day', free: true },
        { id: 'replicate', name: 'Replicate', placeholder: 'ENTER_REPLICATE_KEY', url: 'replicate.com', desc: 'Open-source models' },
        { id: 'clipdrop', name: 'ClipDrop', placeholder: 'your-key', url: 'clipdrop.co', desc: 'BG removal, cleanup' },
    ],
    sms: [
        { id: 'twilio', name: 'Twilio', placeholder: 'auth-token', url: 'twilio.com/console', desc: '$15.50 trial credit' },
        { id: 'msg91', name: 'MSG91', placeholder: 'auth-key', url: 'msg91.com', desc: 'FREE: 5000 SMS India', free: true },
        { id: 'textlocal', name: 'Textlocal', placeholder: 'api-key', url: 'textlocal.in', desc: '10 free SMS' },
        { id: 'plivo', name: 'Plivo', placeholder: 'auth-token', url: 'plivo.com', desc: 'Global SMS' },
    ],
    email: [
        { id: 'sendgrid', name: 'SendGrid', placeholder: 'ENTER_SENDGRID_KEY', url: 'app.sendgrid.com', desc: 'FREE: 100/day forever', free: true },
        { id: 'resend', name: 'Resend', placeholder: 'ENTER_RESEND_KEY', url: 'resend.com', desc: 'FREE: 3000/mo', free: true },
        { id: 'mailgun', name: 'Mailgun', placeholder: 'key-...', url: 'mailgun.com', desc: '5000 for 3 months' },
        { id: 'postmark', name: 'Postmark', placeholder: 'server-token', url: 'postmarkapp.com', desc: '100/mo free' },
        { id: 'sesAccessKey', name: 'AWS SES Access Key', placeholder: 'ENTER_AWS_KEY', url: 'aws.amazon.com/ses', desc: '62K/mo from EC2' },
    ],
    social: [
        { id: 'metaAppId', name: 'Meta App ID', placeholder: '123456789...', url: 'developers.facebook.com', desc: 'For Instagram/FB posting' },
        { id: 'metaAppSecret', name: 'Meta App Secret', placeholder: '••••••••', url: 'developers.facebook.com', desc: 'Keep secure' },
        { id: 'youtubeApiKey', name: 'YouTube API Key', placeholder: 'ENTER_YOUTUBE_KEY', url: 'console.cloud.google.com', desc: 'For video uploads' },
        { id: 'tiktokKey', name: 'TikTok Client Key', placeholder: 'your-key', url: 'developers.tiktok.com', desc: 'Video sharing API' },
        { id: 'wechatAppId', name: 'WeChat App ID', placeholder: 'wx...', url: 'open.weixin.qq.com', desc: 'For China Gateways' },
        { id: 'vkToken', name: 'VK Access Token', placeholder: 'ENTER_VK_TOKEN', url: 'vk.com/dev', desc: 'For Russia Gateways' },
    ],
};

const CATEGORIES = [
    { key: 'text', label: 'AI Text Generation', icon: Globe, color: 'violet' },
    { key: 'video', label: 'AI Video Generation', icon: Video, color: 'pink' },
    { key: 'voice', label: 'AI Voice Generation', icon: Mic, color: 'cyan' },
    { key: 'image', label: 'AI Image Generation', icon: ImageIcon, color: 'purple' },
    { key: 'social', label: 'Social & Platform APIs', icon: MessageSquare, color: 'blue' },
    { key: 'sms', label: 'SMS & Messaging', icon: MessageSquare, color: 'emerald' },
    { key: 'email', label: 'Email Delivery', icon: Mail, color: 'blue' },
];

export default function AdminApiProviders({
    apiKeys,
    testResults,
    onKeyChange,
    onTestConnection,
}: AdminApiProvidersProps) {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
        text: true, video: true, voice: true, image: true, sms: false, email: false,
    });

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const getTestButtonStyle = (status: string) => {
        switch (status) {
            case 'testing': return 'bg-blue-500/20 text-blue-400 cursor-wait';
            case 'success': return 'bg-emerald-500/20 text-emerald-400';
            case 'error': return 'bg-red-500/20 text-red-400';
            default: return 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30';
        }
    };

    const renderProvider = (provider: typeof PROVIDERS.text[0]) => {
        const result = testResults[provider.id] || { status: 'idle' };
        const value = apiKeys[provider.id] || '';

        return (
            <div key={provider.id} className="space-y-1">
                <label className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    {provider.name}
                    {provider.free && (
                        <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold flex items-center gap-1">
                            <Gift className="w-3 h-3" /> FREE
                        </span>
                    )}
                </label>
                <div className="flex gap-2">
                    <input
                        type={provider.isUrl ? 'text' : 'password'}
                        placeholder={provider.placeholder}
                        value={value}
                        onChange={(e) => onKeyChange(provider.id, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none"
                    />
                    <button
                        onClick={() => onTestConnection(provider.id, value)}
                        disabled={result.status === 'testing'}
                        className={`px-3 py-2 rounded-lg text-xs flex items-center gap-1 ${getTestButtonStyle(result.status)}`}
                    >
                        {result.status === 'testing' ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Testing</>
                        ) : result.status === 'success' ? (
                            <><CheckCircle2 className="w-3 h-3" /> OK</>
                        ) : result.status === 'error' ? (
                            <><XCircle className="w-3 h-3" /> Fail</>
                        ) : 'Test'}
                    </button>
                </div>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    {provider.desc} •
                    <a href={`https://${provider.url}`} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline flex items-center gap-0.5">
                        {provider.url} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </p>
            </div>
        );
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">AI & Integration Services</h3>
                        <p className="text-sm text-slate-400">Configure 30+ service providers for AI, SMS, Email</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <Gift className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">FREE providers highlighted</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.map(cat => {
                    const providers = PROVIDERS[cat.key as keyof typeof PROVIDERS];
                    const isExpanded = expandedCategories[cat.key];
                    const colorClass = `text-${cat.color}-400`;

                    return (
                        <div key={cat.key} className="p-4 bg-slate-700/30 rounded-xl">
                            <button
                                onClick={() => toggleCategory(cat.key)}
                                className="w-full flex items-center justify-between mb-3"
                            >
                                <h4 className={`text-sm font-semibold ${colorClass} flex items-center gap-2`}>
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                    <span className="text-xs text-slate-500">({providers.length})</span>
                                </h4>
                                <span className="text-xs text-slate-400">{isExpanded ? '▼' : '▶'}</span>
                            </button>
                            {isExpanded && (
                                <div className="space-y-4">
                                    {providers.map(p => renderProvider(p))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
