'use client';

import { useState } from 'react';
import { Wand2, RefreshCw, Copy, Check, ThumbsUp, ThumbsDown, Sparkles, Languages, Hash, Megaphone } from 'lucide-react';

interface ContentVariant {
    id: string;
    type: 'A' | 'B' | 'C';
    title: string;
    content: string;
    hashtags: string[];
    cta: string;
    tone: string;
    likes: number;
    selected: boolean;
}

interface ABGeneratorProps {
    language?: string;
    platform?: string;
    topic?: string;
    onSelect?: (variant: ContentVariant) => void;
}

export default function ABContentGenerator({
    language = 'en',
    platform = 'instagram',
    topic = 'AI Marketing',
    onSelect
}: ABGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [variants, setVariants] = useState<ContentVariant[]>([]);
    const [inputTopic, setInputTopic] = useState(topic);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Simulated AI content generation (replace with actual API call)
    const generateVariants = async () => {
        setIsGenerating(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate 3 variants with different tones
        const newVariants: ContentVariant[] = [
            {
                id: 'A',
                type: 'A',
                title: `🚀 Transform Your Marketing with AI`,
                content: `Ready to 10x your content output? Our AI-powered platform helps you create engaging content in ${language === 'en' ? 'multiple languages' : 'your native language'} automatically. Save hours every week while reaching a global audience.\n\nStart your free trial today and see the difference AI can make! 🎯`,
                hashtags: ['#AIMarketing', '#ContentAutomation', '#DigitalMarketing', '#MarketingTech', '#GrowthHacking'],
                cta: 'Start Free Trial →',
                tone: 'Enthusiastic & Bold',
                likes: 0,
                selected: false,
            },
            {
                id: 'B',
                type: 'B',
                title: `How Top Brands Create 100+ Posts/Week`,
                content: `The secret? They don't hire 10 content writers. They use AI.\n\nDigitalMEng helps businesses:\n✅ Generate content in 44 languages\n✅ Publish across 15+ platforms\n✅ Save 85% of content creation time\n\nJoin 1000+ businesses already using AI for marketing.`,
                hashtags: ['#MarketingStrategy', '#AIContent', '#SocialMediaMarketing', '#BusinessGrowth', '#Efficiency'],
                cta: 'See How It Works →',
                tone: 'Educational & Proof-based',
                likes: 0,
                selected: false,
            },
            {
                id: 'C',
                type: 'C',
                title: `Your Marketing Team That Never Sleeps 🌙`,
                content: `While you rest, your AI marketing assistant is:\n\n📝 Writing blog posts\n🎬 Creating video scripts\n📱 Scheduling social posts\n🌍 Translating to 44 languages\n\nImagine waking up to fresh content every day. That's the power of DigitalMEng.`,
                hashtags: ['#MarketingAutomation', '#24x7Marketing', '#AIAssistant', '#ContentCreation', '#WorkSmarter'],
                cta: 'Meet Your AI Team →',
                tone: 'Creative & Story-driven',
                likes: 0,
                selected: false,
            },
        ];

        setVariants(newVariants);
        setIsGenerating(false);
    };

    const handleVote = (id: string, isLike: boolean) => {
        setVariants(prev => prev.map(v =>
            v.id === id
                ? { ...v, likes: v.likes + (isLike ? 1 : -1) }
                : v
        ));
    };

    const handleSelect = (id: string) => {
        const updated = variants.map(v => ({ ...v, selected: v.id === id }));
        setVariants(updated);
        const selected = updated.find(v => v.id === id);
        if (selected && onSelect) {
            onSelect(selected);
        }
    };

    const handleCopy = async (variant: ContentVariant) => {
        const text = `${variant.title}\n\n${variant.content}\n\n${variant.hashtags.join(' ')}\n\n${variant.cta}`;
        await navigator.clipboard.writeText(text);
        setCopiedId(variant.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getToneColor = (tone: string) => {
        if (tone.includes('Bold')) return 'bg-red-100 text-red-700';
        if (tone.includes('Educational')) return 'bg-blue-100 text-blue-700';
        if (tone.includes('Creative')) return 'bg-purple-100 text-purple-700';
        return 'bg-slate-100 text-slate-700';
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Wand2 className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">A/B Content Generator</h2>
                </div>
                <p className="text-white/80">Generate multiple content variants to test which performs best</p>
            </div>

            <div className="p-6">
                {/* Input Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Topic or Product
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputTopic}
                            onChange={(e) => setInputTopic(e.target.value)}
                            placeholder="e.g., AI Marketing Platform, New Product Launch"
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
                        />
                        <button
                            onClick={generateVariants}
                            disabled={isGenerating}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate 3 Variants
                                </>
                            )}
                        </button>
                    </div>
                    <div className="flex gap-3 mt-3">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 flex items-center gap-1">
                            <Languages className="w-4 h-4" />
                            {language.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 flex items-center gap-1">
                            <Megaphone className="w-4 h-4" />
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Variants Grid */}
                {variants.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {variants.map((variant) => (
                            <div
                                key={variant.id}
                                className={`rounded-2xl border-2 transition-all ${variant.selected
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {/* Variant Header */}
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${variant.type === 'A' ? 'bg-red-100 text-red-600' :
                                                variant.type === 'B' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            {variant.type}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToneColor(variant.tone)}`}>
                                            {variant.tone}
                                        </span>
                                    </div>
                                    {variant.selected && (
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                            Selected
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-800 mb-3">{variant.title}</h3>
                                    <p className="text-slate-600 text-sm whitespace-pre-line mb-4">{variant.content}</p>

                                    {/* Hashtags */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {variant.hashtags.map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Preview */}
                                    <div className="p-3 bg-violet-100 rounded-lg text-center">
                                        <span className="text-violet-700 font-medium text-sm">{variant.cta}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleVote(variant.id, true)}
                                            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                                            title="Like this variant"
                                        >
                                            <ThumbsUp className="w-5 h-5 text-green-600" />
                                        </button>
                                        <button
                                            onClick={() => handleVote(variant.id, false)}
                                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Dislike this variant"
                                        >
                                            <ThumbsDown className="w-5 h-5 text-red-600" />
                                        </button>
                                        <span className="text-sm text-slate-500">{variant.likes >= 0 ? '+' : ''}{variant.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleCopy(variant)}
                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                            title="Copy content"
                                        >
                                            {copiedId === variant.id ? (
                                                <Check className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Copy className="w-5 h-5 text-slate-600" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleSelect(variant.id)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${variant.selected
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                                                }`}
                                        >
                                            {variant.selected ? 'Selected ✓' : 'Use This'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {variants.length === 0 && !isGenerating && (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <Wand2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">No variants generated yet</h3>
                        <p className="text-slate-500 mb-4">Enter a topic and click "Generate" to create 3 content variants</p>
                        <button
                            onClick={generateVariants}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all"
                        >
                            <Sparkles className="w-5 h-5 inline mr-2" />
                            Generate Now
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isGenerating && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-2xl border border-slate-200 p-6 animate-pulse">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-slate-200 rounded-full" />
                                    <div className="w-24 h-6 bg-slate-200 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                                    <div className="h-4 bg-slate-200 rounded w-full" />
                                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                                    <div className="h-4 bg-slate-200 rounded w-4/6" />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                                    <div className="h-6 w-20 bg-slate-200 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tips */}
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">💡 A/B Testing Tips</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Test one element at a time (headline, CTA, tone) for clearer insights</li>
                        <li>• Run each variant for at least 48 hours before deciding the winner</li>
                        <li>• Use the "Like/Dislike" buttons to track your team's preferences</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
