'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    TrendingUp,
    AlertCircle,
    Clock,
    Share2,
    Activity,
    IterationCcw,
    Telescope,
    Cpu
} from 'lucide-react';

interface TimelineEvent {
    id: string;
    time: string;
    label: string;
    probability: number;
    impact: 'high' | 'medium' | 'low';
    type: 'viral' | 'steady' | 'decay';
}

export default function QuantumTimeline() {
    const [activeTimeline, setActiveTimeline] = useState<'alpha' | 'beta' | 'gamma'>('alpha');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const timelines = {
        alpha: {
            name: 'Viral Catalyst (Alpha)',
            events: [
                { id: '1', time: 'T+2h', label: 'Algorithm Hijack', probability: 92, impact: 'high', type: 'viral' },
                { id: '2', time: 'T+12h', label: 'Cross-Platform Resonance', probability: 75, impact: 'high', type: 'viral' },
                { id: '3', time: 'T+48h', label: 'Mainstream Saturation', probability: 40, impact: 'medium', type: 'viral' },
            ],
            description: 'Post hits the algorithmic sweet spot in South Asia, triggering a cascade across 12 networks.',
            color: 'text-violet-400',
            bg: 'bg-violet-500/10'
        },
        beta: {
            name: 'Steady Growth (Beta)',
            events: [
                { id: '4', time: 'T+5h', label: 'Niche Authority Build', probability: 98, impact: 'medium', type: 'steady' },
                { id: '5', time: 'T+3d', label: 'SEO Maturity', probability: 85, impact: 'medium', type: 'steady' },
                { id: '6', time: 'T+1w', label: 'Consistent Lead Gen', probability: 70, impact: 'low', type: 'steady' },
            ],
            description: 'Content establishes long-term authority. Lower peak, but higher LTV and zero risk.',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10'
        },
        gamma: {
            name: 'Rapid Obsolescence (Gamma)',
            events: [
                { id: '7', time: 'T+1h', label: 'Trend Shift Detected', probability: 15, impact: 'high', type: 'decay' },
                { id: '8', time: 'T+6h', label: 'Attention Decay', probability: 80, impact: 'low', type: 'decay' },
                { id: '9', time: 'T+24h', label: 'Baseline Noise', probability: 95, impact: 'low', type: 'decay' },
            ],
            description: 'Post is drowned out by a competing global event. Recommendation: Pivot in T-minus 4h.',
            color: 'text-rose-400',
            bg: 'bg-rose-500/10'
        }
    };

    return (
        <div className="p-8 bg-slate-950 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Year 2036 Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Telescope className="w-5 h-5 text-violet-500" />
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Temporal Impact Simulator</h3>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Kernel v.9.4 // Multiverse Mode: ENABLED</p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-bold text-violet-400 block mb-0.5">COMPUTING POWER</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`w-1 h-3 rounded-full ${i <= 5 ? 'bg-violet-500' : 'bg-white/10'} ${i === 5 ? 'animate-pulse' : ''}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Left: Timeline Selectors */}
                <div className="lg:col-span-4 space-y-4">
                    {(Object.keys(timelines) as Array<keyof typeof timelines>).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTimeline(key)}
                            className={`w-full p-6 rounded-3xl border text-left transition-all duration-500 flex items-center justify-between group/btn
                                ${activeTimeline === key
                                    ? `${timelines[key].bg} border-${key === 'alpha' ? 'violet' : key === 'beta' ? 'emerald' : 'rose'}-500 shadow-[0_0_30px_rgba(var(--color-glow))]`
                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                }
                            `}
                        >
                            <div>
                                <h4 className={`font-black uppercase tracking-tighter mb-1 ${activeTimeline === key ? timelines[key].color : 'text-white/40'}`}>
                                    {timelines[key].name}
                                </h4>
                                <p className="text-[10px] text-white/30 max-w-[150px] leading-tight">
                                    {activeTimeline === key ? 'Simulation Active' : 'Idle Trace'}
                                </p>
                            </div>
                            {activeTimeline === key && <Activity className={`w-5 h-5 ${timelines[key].color} animate-pulse`} />}
                        </button>
                    ))}

                    <div className="p-6 rounded-3xl bg-violet-600/10 border border-violet-500/20 mt-8">
                        <div className="flex items-center gap-2 text-violet-400 mb-2">
                            <Zap className="w-4 h-4" />
                            <span className="text-xs font-black uppercase italic">Neural Insight</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed italic">
                            "Alpha timeline probability increased by 12% due to Meta's recent neural-network patch. Prepare for immediate high-volume engagement."
                        </p>
                    </div>
                </div>

                {/* Right: The Visualizer */}
                <div className="lg:col-span-8 relative min-h-[400px] flex flex-col justify-center">
                    {/* The Path */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-full h-1/2 overflow-visible">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M 0 50 Q 250 -50 500 50 T 1000 50"
                                fill="none"
                                stroke="url(#lineGrad)"
                                strokeWidth="4"
                                strokeDasharray="10 10"
                                animate={{ strokeDashoffset: -100 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        </svg>
                    </div>

                    <div className="relative flex justify-between items-center w-full px-12">
                        <AnimatePresence mode="wait">
                            {timelines[activeTimeline].events.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative flex flex-col items-center group/node"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 
                                        ${event.type === 'viral' ? 'bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.5)]' :
                                            event.type === 'steady' ? 'bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]' :
                                                'bg-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.5)]'}
                                        group-hover/node:scale-125 group-hover/node:rotate-12
                                    `}>
                                        <Cpu className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-[10px] font-black text-white/40 uppercase mb-1">{event.time}</span>
                                        <h5 className="text-xs font-bold text-white mb-1 group-hover/node:text-violet-400 transition-colors">{event.label}</h5>
                                        <div className="flex items-center gap-1 justify-center">
                                            <span className="text-[9px] font-bold text-emerald-400">{event.probability}%</span>
                                            <span className="text-[8px] text-white/20 uppercase tracking-tighter">Prob.</span>
                                        </div>
                                    </div>

                                    {/* Connectivity lines to next node */}
                                    {i < timelines[activeTimeline].events.length - 1 && (
                                        <div className="absolute left-[100%] top-6 w-[200px] h-px bg-gradient-to-r from-white/20 to-transparent flex items-center justify-center">
                                            <motion.div
                                                className="w-2 h-2 rounded-full bg-white/40"
                                                animate={{ x: [-80, 80] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Info Card */}
                    <motion.div
                        key={activeTimeline}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-2xl bg-white/5">
                                <AlertCircle className={`w-6 h-6 ${timelines[activeTimeline].color}`} />
                            </div>
                            <div>
                                <h6 className="text-sm font-black text-white uppercase mb-1">Timeline Briefing</h6>
                                <p className="text-xs text-white/60 leading-relaxed max-w-md">
                                    {timelines[activeTimeline].description}
                                </p>
                            </div>
                            <div className="ml-auto flex gap-4">
                                <div className="text-right">
                                    <span className="text-[10px] text-white/30 uppercase block mb-1">Net ROI Impact</span>
                                    <span className={`text-lg font-black ${timelines[activeTimeline].color}`}>
                                        {activeTimeline === 'alpha' ? 'x12.4' : activeTimeline === 'beta' ? 'x4.2' : 'x0.8'}
                                    </span>
                                </div>
                                <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase rounded-xl hover:bg-violet-500 hover:text-white transition-all transform hover:-translate-y-1">
                                    FORK TIMELINE
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scanning Laser Line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent top-12 animate-[scan_4s_ease-in-out_infinite]" />
        </div>
    );
}

function CircuitBoardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M11 9h4a2 2 0 0 0 2-2V3" />
            <circle cx="9" cy="9" r="2" />
            <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
            <circle cx="15" cy="15" r="2" />
        </svg>
    )
}
