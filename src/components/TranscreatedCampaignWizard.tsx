'use client';

import { useState } from 'react';
import {
    Globe, Zap, ShieldCheck, Sparkles, Send,
    MessageCircle, Video, Layers, CheckCircle2,
    AlertCircle, ArrowRight, RefreshCw, X
} from 'lucide-react';

export default function TranscreatedCampaignWizard({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishProgress, setPublishProgress] = useState(0);

    const CAMPAIGN_MAPPING = [
        {
            market: 'Global (TikTok)',
            node: 'US-East-1 (Virginia)',
            language: 'English',
            status: 'pending',
            icon: Video,
            color: 'text-violet-400'
        },
        {
            market: 'China (WeChat)',
            node: 'Hong Kong -> Shenzhen',
            language: 'Mandarin (Simplified)',
            status: 'pending',
            icon: MessageCircle,
            color: 'text-red-400'
        },
        {
            market: 'Russia (VK)',
            node: 'Dubai -> Almaty',
            language: 'Russian',
            status: 'pending',
            icon: Globe,
            color: 'text-blue-400'
        }
    ];

    const handlePublish = async () => {
        setIsPublishing(true);
        for (let i = 0; i <= 100; i += 5) {
            setPublishProgress(i);
            await new Promise(r => setTimeout(r, 150));
        }
        await new Promise(r => setTimeout(r, 500));
        setStep(3);
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-white">
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-600/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">Transcreated Blast</h2>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Global Market Orchestrator</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Campaign Base Content (English)</span>
                                    <textarea
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none h-24"
                                        placeholder="Describe your global launch offer..."
                                        defaultValue="Explosive growth for your enterprise with DigitalMEng AI. Join now!"
                                    />
                                </label>
                                <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold">
                                    <ShieldCheck className="w-4 h-4" />
                                    Guardian AI: Cultural Safety Filters ACTIVE
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Deployment Targets</span>
                                <div className="grid gap-3">
                                    {CAMPAIGN_MAPPING.map((m, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-white/5 ${m.color}`}>
                                                    <m.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{m.market}</p>
                                                    <p className="text-[10px] text-slate-500">Auto-Translation: {m.language}</p>
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-md uppercase">
                                                {m.node}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-600/20 transition-all active:scale-95"
                            >
                                Proceed to Transcreation Preview
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="text-center space-y-2 mb-6">
                                <h3 className="text-xl font-bold">Orchestration Preview</h3>
                                <p className="text-slate-400 text-sm">AI-Linguist has adapted your message for each local context.</p>
                            </div>

                            <div className="grid gap-4">
                                <div className="p-5 rounded-3xl bg-red-600/10 border border-red-600/20 group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">WeChat (Simplified Chinese)</span>
                                        <span className="text-[10px] bg-red-600/20 px-2 py-0.5 rounded-full text-red-200">92% Engagement Match</span>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed italic">"利用 DigitalMEng AI 助您的企业实现爆炸式增长。立即加入！"</p>
                                </div>
                                <div className="p-5 rounded-3xl bg-blue-600/10 border border-blue-600/20">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">VKontakte (Russian)</span>
                                        <span className="text-[10px] bg-blue-600/20 px-2 py-0.5 rounded-full text-blue-200">88% Cultural Score</span>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed italic">"Взрывной рост вашего предприятия с DigitalMEng AI. Присоединяйтесь сейчас!"</p>
                                </div>
                            </div>

                            {!isPublishing ? (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
                                    >
                                        Back to Edit
                                    </button>
                                    <button
                                        onClick={handlePublish}
                                        className="flex-[2] py-4 bg-emerald-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 transition-all active:scale-95"
                                    >
                                        <Send className="w-4 h-4" />
                                        Launch Global Blast
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-emerald-400 animate-pulse">Publishing Through Secure Tunnels...</p>
                                            <p className="text-[10px] text-slate-500">Route: Mumbai -&gt; Dubai -&gt; Almaty -&gt; VK-Main</p>
                                        </div>
                                        <span className="text-2xl font-black">{publishProgress}%</span>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            style={{ width: `${publishProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-12 text-center space-y-8 animate-in zoom-in slide-in-from-top-4 duration-700">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                                <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-3xl font-black">Global Impact Live!</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">
                                    Your campaign has been successfully deployed across all restricted nodes.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-bold text-slate-500 mb-1">TIKTOK</p>
                                    <p className="text-xs font-black text-emerald-400">ACTIVE</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-bold text-slate-500 mb-1">WECHAT</p>
                                    <p className="text-xs font-black text-emerald-400">LIVE</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-bold text-slate-500 mb-1">VK</p>
                                    <p className="text-xs font-black text-emerald-400">POSTED</p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
                            >
                                Return to Command Center
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
