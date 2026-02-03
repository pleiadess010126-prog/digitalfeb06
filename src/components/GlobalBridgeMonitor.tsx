'use client';

import { useState, useEffect } from 'react';
import {
    Globe, ShieldCheck, Zap, ArrowRight, MapPin,
    Lock, Server, Signal, ExternalLink, Info, Video
} from 'lucide-react';

export default function GlobalBridgeMonitor() {
    const [activeNode, setActiveNode] = useState('US-East-1 (Virginia)');
    const [latency, setLatency] = useState('42ms');
    const [isBypassing, setIsBypassing] = useState(true);

    const NODES = [
        { id: 'us', name: 'US-East-1 (Virginia)', status: 'Optimal', latency: '42ms' },
        { id: 'uk', name: 'London-2 (UK)', status: 'Stable', latency: '118ms' },
        { id: 'sg', name: 'Singapore-APAC', status: 'Optimal', latency: '65ms' },
        { id: 'jp', name: 'Tokyo-North', status: 'Maintenance', latency: '--' },
    ];

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white border border-white/10 shadow-2xl overflow-hidden relative group">
            {/* Background World Map Pattern (Simplified) */}
            <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12 transition-all group-hover:text-white/10" />

            <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            TikTok Global Bridge
                        </h3>
                        <p className="text-slate-400 text-sm max-w-md">
                            Publishing from restricted regions? Our Remote Node Swarm bypasses local limitations by executing commands through our worldwide AWS cluster.
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <Signal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Proxy: Active</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Local Origin</p>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-indigo-400" />
                            <span className="font-bold">Mumbai, India</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-violet-600 rounded-full">
                                <Lock className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-violet-600/20 border border-violet-500/30">
                        <p className="text-[10px] font-black text-violet-300 uppercase tracking-widest mb-2">Publishing Node</p>
                        <div className="flex items-center gap-3">
                            <Server className="w-5 h-5 text-emerald-400" />
                            <div className="flex flex-col">
                                <span className="font-bold text-emerald-400">{activeNode}</span>
                                <span className="text-[10px] text-white/40">Latency: {latency}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-white/70">
                        <Video className="w-4 h-4 text-violet-400" />
                        Active TikTok Tunneling Strategy
                    </h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>Geographical Obfuscation</span>
                            </div>
                            <span className="text-emerald-400 font-bold">VERIFIED</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>Global Trend Injection</span>
                            </div>
                            <span className="text-emerald-400 font-bold">VERIFIED</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span>Transcreation (Local -&gt; Global)</span>
                            </div>
                            <span className="text-blue-400 font-bold underline cursor-pointer flex items-center gap-1">
                                Linguist_Agent
                                <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
                        <Zap className="w-4 h-4" />
                        Switch Active Node
                    </button>
                    <button className="px-6 py-4 bg-white/10 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10">
                        <Info className="w-4 h-4" />
                        VPN Compliance Info
                    </button>
                </div>
            </div>
        </div>
    );
}
