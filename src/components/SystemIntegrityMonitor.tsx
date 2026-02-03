'use client';

import { useState } from 'react';
import {
    ShieldCheck, AlertTriangle, TrendingUp, DollarSign,
    Clock, Activity, BarChart3, Lock, CheckCircle2
} from 'lucide-react';

export default function SystemIntegrityMonitor() {
    const [healthScore] = useState(94);
    const [roi] = useState(12.4); // 12.4x ROI

    const CRITICAL_METRICS = [
        {
            label: 'Token Health',
            value: 'Stable',
            detail: 'Next expiry in 12 days',
            status: 'success',
            icon: Lock,
            color: 'text-emerald-500 bg-emerald-500/10'
        },
        {
            label: 'Legal Compliance',
            value: '98%',
            detail: '2 items flagged for review',
            status: 'warning',
            icon: ShieldCheck,
            color: 'text-amber-500 bg-amber-500/10'
        },
        {
            label: 'API Efficiency',
            value: 'Low Latency',
            detail: 'Avg response: 184ms',
            status: 'success',
            icon: Activity,
            color: 'text-violet-500 bg-violet-500/10'
        },
        {
            label: 'Revenue ROI',
            value: '12.4x',
            detail: '$1.4k spend -> $17.3k rev',
            status: 'success',
            icon: DollarSign,
            color: 'text-emerald-500 bg-emerald-500/10'
        }
    ];

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        Integrity & ROI Command
                    </h3>
                    <p className="text-xs text-slate-500">Real-time governance and revenue tracking</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-2xl font-black text-indigo-600">{healthScore}%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health Score</div>
                </div>
            </div>

            <div className="p-6 flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {CRITICAL_METRICS.map((metric, i) => (
                        <div key={i} className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-xl ${metric.color}`}>
                                    <metric.icon className="w-4 h-4" />
                                </div>
                                {metric.status === 'success' ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                    <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                                )}
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                {metric.label}
                            </p>
                            <h4 className="text-lg font-black text-slate-800">{metric.value}</h4>
                            <p className="text-[10px] text-slate-500 mt-1">{metric.detail}</p>
                        </div>
                    ))}
                </div>

                {/* Predictive Warning */}
                <div className="mt-2 p-4 rounded-2xl bg-indigo-600 text-white relative overflow-hidden group">
                    <TrendingUp className="absolute -bottom-2 -right-2 w-16 h-16 text-white/10 group-hover:rotate-12 transition-all" />
                    <div className="relative z-10">
                        <h5 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Growth Prediction</h5>
                        <p className="text-sm font-medium leading-tight">
                            AI Swarm predicted to deliver <span className="text-emerald-300 font-bold">+14% conversion</span> in the next 7 days based on current engagement trends.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                <button className="w-full py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Export Compliance Log
                </button>
            </div>
        </div>
    );
}
