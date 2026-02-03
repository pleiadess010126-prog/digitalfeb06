'use client';

import { useState } from 'react';
import {
    ShieldAlert, Globe, Zap, Network, Lock,
    CheckCircle2, AlertCircle, Info, RefreshCw,
    MessageCircle, Share2, Layers
} from 'lucide-react';

type Market = 'CN' | 'RU' | 'IR';

export default function RestrictedMarketBridge() {
    const [activeMarket, setActiveMarket] = useState<Market>('CN');

    const MARKETS = {
        CN: {
            name: 'China Expansion',
            tagline: 'Inside the Great Firewall',
            risk: 'High (State Compliance)',
            platforms: ['WeChat (Official)', 'Weibo', 'Douyin', 'Xiaohongshu'],
            strategy: 'HK-Mainland Tunneling',
            nodes: ['Hong Kong (Gate)', 'Shenzhen (Internal)', 'Shanghai (CDN)'],
            color: 'text-red-500 bg-red-500/10 border-red-500/20'
        },
        RU: {
            name: 'Russia Expansion',
            tagline: 'Sanction-Neutral Corridor',
            risk: 'Medium (API Connectivity)',
            platforms: ['VKontakte', 'Telegram (Premium)', 'OK.ru', 'Yandex'],
            strategy: 'Dubai-Almaty Relay',
            nodes: ['Dubai (Financial)', 'Almaty (Technical)', 'Moscow (Local)'],
            color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
        },
        IR: {
            name: 'Middle East Restricted',
            tagline: 'Bypassing Local ISP Blocks',
            risk: 'Medium (Uptime)',
            platforms: ['Telegram', 'WhatsApp Proxy', 'Instagram (Bypass)'],
            strategy: 'Istanbul-Tehran Mesh',
            nodes: ['Istanbul (Exit)', 'Frankfurt (Master)', 'Local Proxy Node'],
            color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
        }
    };

    const market = MARKETS[activeMarket];

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black flex items-center gap-2">
                        <Layers className="w-6 h-6 text-violet-400" />
                        Restricted Market Gateways
                    </h3>
                    <p className="text-slate-400 text-sm">Deploying special-purpose infrastructure for high-friction regions.</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    {(Object.keys(MARKETS) as Market[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setActiveMarket(m)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeMarket === m
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className={`p-6 rounded-3xl border ${market.color}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold">{market.name}</h4>
                                <p className="text-xs opacity-70 italic">{market.tagline}</p>
                            </div>
                            <ShieldAlert className="w-8 h-8 opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compliance Status</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-bold">READY</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Risk</p>
                                <div className="flex items-center gap-2 text-amber-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm font-bold">{market.risk}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Network Route</h5>
                        <div className="flex items-center justify-between relative">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
                            {market.nodes.map((node, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full border-2 border-slate-900 ${i === 2 ? 'bg-violet-400 animate-pulse' : 'bg-slate-500'}`} />
                                    <span className="text-[10px] font-bold text-slate-400">{node}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Local Connectors</h5>
                    <div className="grid gap-3">
                        {market.platforms.map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-violet-500/20 transition-colors">
                                        <Zap className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{p}</p>
                                        <p className="text-[10px] text-slate-500">Node Strategy: {market.strategy}</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:text-violet-400 transition-colors">
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] flex gap-3">
                        <Info className="w-5 h-5 flex-shrink-0" />
                        <p>
                            <strong>LEGAL NOTICE:</strong> Deploying content to these regions requires "Guardian Mode" to be active.
                            Our AI automatically filters for regional legal sensitivities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
