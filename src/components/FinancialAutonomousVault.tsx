'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck,
    Zap,
    CreditCard,
    DollarSign,
    Lock,
    Unlock,
    Activity,
    Cpu,
    Briefcase
} from 'lucide-react';

interface Transaction {
    id: string;
    amount: number;
    type: 'spend' | 'revenue';
    gateway: 'Stripe' | 'PayPal' | 'ETH' | 'USDT';
    label: string;
    timestamp: string;
    status: 'completed' | 'processing';
}

export default function FinancialAutonomousVault() {
    const [isLocked, setIsLocked] = useState(false);
    const [balance, setBalance] = useState(45200.50);
    const [revenueToDate, setRevenueToDate] = useState(124800.00);
    const [autoSpendEnabled, setAutoSpendEnabled] = useState(true);

    const transactions: Transaction[] = [
        { id: '1', amount: 50.00, type: 'spend', gateway: 'Stripe', label: 'Meta Ads Injection', timestamp: '2 mins ago', status: 'completed' },
        { id: '2', amount: 450.00, type: 'revenue', gateway: 'PayPal', label: 'Pro Plan Subscription (Global)', timestamp: '15 mins ago', status: 'completed' },
        { id: '3', amount: 12.50, type: 'spend', gateway: 'USDT', label: 'Gas Fee Optimization', timestamp: '1 hour ago', status: 'completed' },
        { id: '4', amount: 1200.00, type: 'revenue', gateway: 'Stripe', label: 'Enterprise Custom Node Setup', timestamp: '3 hours ago', status: 'completed' },
    ];

    return (
        <div className="p-8 bg-slate-950 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Autonomous Treasurer Vault</h3>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">FINANCIAL CORE v.1.2 // SECURE STATUS: {isLocked ? 'LOCKED' : 'HYPER-ACTIVE'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsLocked(!isLocked)}
                        className={`p-3 rounded-2xl border transition-all ${isLocked ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'}`}
                    >
                        {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    </button>
                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                        <span className="text-[10px] font-bold text-emerald-400 block mb-1">REAL-TIME ROI</span>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-lg font-black text-white">4.2x</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                {/* Main Balance Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-8 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 rounded-[2.5rem] border border-emerald-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <Activity className="w-12 h-12 text-emerald-500/20 animate-pulse" />
                        </div>
                        <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Available liquidity</span>
                        <h4 className="text-5xl font-black text-white mt-2 mb-8">${balance.toLocaleString()}</h4>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-[10px] text-white/40 uppercase block mb-1">Autonomous Spend</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-emerald-400 inline-flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> ON
                                    </span>
                                    <span className="text-xs text-white/60">$2,400 / day max</span>
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                <span className="text-[10px] text-white/40 uppercase block mb-1">Settlement Gateways</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Feed */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h5 className="text-xs font-black text-white uppercase tracking-widest">Autonomous Ledger</h5>
                            <button className="text-[10px] text-emerald-400 font-bold hover:underline">EXPORT AUDIT →</button>
                        </div>
                        <div className="space-y-3">
                            {transactions.map(tx => (
                                <div key={tx.id} className="p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all flex items-center justify-between group/tx">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl ${tx.type === 'revenue' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                            {tx.type === 'revenue' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover/tx:text-emerald-400 transition-colors">{tx.label}</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-tighter">{tx.gateway} // {tx.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-black ${tx.type === 'revenue' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {tx.type === 'revenue' ? '+' : '-'}${tx.amount.toFixed(2)}
                                        </p>
                                        <span className="text-[9px] text-white/20 font-mono">tx_sync_active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Autonomous Budget Allocation */}
                <div className="space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem]">
                        <h5 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-emerald-400" />
                            Budget Allocation
                        </h5>
                        <div className="space-y-4">
                            {[
                                { label: 'Ad-Spend Injection', val: 65, color: 'bg-emerald-500' },
                                { label: 'Influencer Escrow', val: 20, color: 'bg-blue-500' },
                                { label: 'Gas / Infra Fees', val: 15, color: 'bg-slate-500' },
                            ].map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-[10px] font-bold text-white/60 mb-1">
                                        <span>{item.label}</span>
                                        <span>{item.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-[2rem]">
                        <div className="flex items-center gap-2 text-emerald-400 mb-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="text-xs font-black uppercase italic">AI Treasurer Tip</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed italic">
                            "I have moved $1,200 from underperforming European search nodes to high-velocity South Indian social channels. Predicted ROI increase: +18%."
                        </p>
                        <button className="mt-4 w-full py-2 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-xl hover:bg-emerald-400 transition-all transform active:scale-95">
                            APPROVE SWAP
                        </button>
                    </div>

                    <div className="p-6 bg-slate-900 border border-white/10 rounded-[2rem] text-center">
                        <Cpu className="w-8 h-8 text-white/20 mx-auto mb-3" />
                        <p className="text-[9px] text-white/40 uppercase tracking-widest leading-tight">
                            Encrypted Gateway Handshake:<br />
                            STRIPE_API_V3 // ACTIVE<br />
                            METAMASK_RPC // ACTIVE
                        </p>
                    </div>
                </div>
            </div>

            {/* Scanning Line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent top-24 animate-[scan_4s_ease-in-out_infinite]" />
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
