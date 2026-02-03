'use client';

import { useState } from 'react';
import {
    ShieldAlert, ShieldCheck, AlertTriangle, ToggleLeft as Toggle,
    Lock, Trash2, Plus, Search, Shield, Info, Eye,
    AlertCircle, CheckCircle2, XCircle, Zap, Ban, FileText
} from 'lucide-react';

interface GuardrailRule {
    id: string;
    type: 'keyword' | 'compliance' | 'sentiment' | 'legal';
    name: string;
    description: string;
    action: 'block' | 'flag' | 'replace';
    status: 'active' | 'inactive';
    severity: 'low' | 'medium' | 'high' | 'critical';
}

const INITIAL_RULES: GuardrailRule[] = [
    {
        id: '1',
        type: 'legal',
        name: 'Standard Financial Disclaimer',
        description: 'Must include "Not financial advice" if mentioning ROI, Profit, or Gains.',
        action: 'flag',
        status: 'active',
        severity: 'critical'
    },
    {
        id: '2',
        type: 'keyword',
        name: 'Competitor Mentions',
        description: 'Do not allow mentions of main competitors: AppZone, MarketingFlow, AdMaster.',
        action: 'block',
        status: 'active',
        severity: 'medium'
    },
    {
        id: '3',
        type: 'sentiment',
        name: 'Controversy Filter',
        description: 'Flag any content with "Controversial" sentiment score higher than 40%.',
        action: 'flag',
        status: 'active',
        severity: 'high'
    },
    {
        id: '4',
        type: 'legal',
        name: 'Copyright Check',
        description: 'Ensures AI doesn\'t claim trademarked terminology of partners without permission.',
        action: 'flag',
        status: 'active',
        severity: 'high'
    },
    {
        id: '5',
        type: 'keyword',
        name: 'Forbidden Slang',
        description: 'Maintain corporate professionalism. Block informal slang like "vibes", "bet", "no cap".',
        action: 'replace',
        status: 'active',
        severity: 'low'
    }
];

export default function BrandSafetyGuard() {
    const [rules, setRules] = useState<GuardrailRule[]>(INITIAL_RULES);
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const [activeTab, setActiveTab] = useState<'rules' | 'audit' | 'settings'>('rules');

    const toggleRule = (id: string) => {
        setRules(prev => prev.map(rule =>
            rule.id === id ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' } : rule
        ));
    };

    const getSeverityColor = (severity: GuardrailRule['severity']) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getActionIcon = (action: GuardrailRule['action']) => {
        switch (action) {
            case 'block': return <XCircle className="w-4 h-4 text-red-500" />;
            case 'flag': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            case 'replace': return <RefreshCwIcon />;
            default: return <Info className="w-4 h-4 text-slate-500" />;
        }
    };

    const RefreshCwIcon = () => (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Emergency Executive Switch */}
            <div className={`p-8 rounded-[2.5rem] border-4 transition-all ${isEmergencyActive
                    ? 'bg-red-50 border-red-500 shadow-2xl shadow-red-500/20'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-3xl ${isEmergencyActive ? 'bg-red-500 animate-pulse' : 'bg-slate-100'}`}>
                            <Ban className={`w-8 h-8 ${isEmergencyActive ? 'text-white' : 'text-slate-400'}`} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Emergency Brand Kill-Switch</h2>
                            <p className="text-slate-500">Suspend all AI activity (Content, DMs, Emails) across all 18 platforms immediately.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEmergencyActive(!isEmergencyActive)}
                        className={`px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl ${isEmergencyActive
                                ? 'bg-red-600 text-white border-b-4 border-red-800'
                                : 'bg-slate-900 text-white border-b-4 border-black hover:bg-red-600'
                            }`}
                    >
                        {isEmergencyActive ? 'REACTIVATE SYSTEM' : 'ENGAGE GLOBAL FREEZE'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Rules Column */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                                <h3 className="font-black text-xl">Active Safety Guardrails</h3>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search rules..."
                                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 overflow-hidden text-slate-900">
                                    <Plus className="w-4 h-4" />
                                    New Rule
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {rules.map((rule) => (
                                <div key={rule.id} className={`p-6 transition-all hover:bg-slate-50/50 group ${rule.status === 'inactive' ? 'opacity-50' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 p-2 rounded-lg ${getSeverityColor(rule.severity)}`}>
                                                {rule.severity === 'critical' ? <ShieldAlert className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-bold text-slate-900 text-lg">{rule.name}</h4>
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getSeverityColor(rule.severity)}`}>
                                                        {rule.severity}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500 mt-1">{rule.description}</p>
                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                                        {getActionIcon(rule.action)}
                                                        Action: <span className="uppercase text-slate-900">{rule.action}</span>
                                                    </div>
                                                    <div className="w-px h-3 bg-slate-200" />
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 capitalize">
                                                        <FileText className="w-3.5 h-3.5" />
                                                        Type: {rule.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleRule(rule.id)}
                                                className={`p-2 rounded-xl transition-all ${rule.status === 'active'
                                                        ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                                        : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
                                                    }`}
                                            >
                                                <Lock className={`w-5 h-5 ${rule.status === 'active' ? '' : 'rotate-12 opacity-50'}`} />
                                            </button>
                                            <button className="p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Analytics */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-amber-400" />
                            Real-time Scan Metrics
                        </h3>
                        <p className="text-slate-400 text-sm mb-8">AI Content Scanner performance over the last 24h.</p>

                        <div className="space-y-6">
                            {[
                                { label: 'Scanned Items', value: '4,281', color: 'bg-indigo-500' },
                                { label: 'Blocked (Critical)', value: '12', color: 'bg-red-500' },
                                { label: 'Flagged (Auto-Fix)', value: '89', color: 'bg-amber-500' },
                                { label: 'Avg Scan Time', value: '42ms', color: 'bg-emerald-500' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-white">{stat.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: i === 0 ? '100%' : '35%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                            <Eye className="w-4 h-4" />
                            View Security Audit Log
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <AlertCircle className="w-12 h-12 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-4">Latest Intervention</h4>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                            <div className="flex items-center gap-2 text-amber-600 text-xs font-black uppercase">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                Flagged in Instagram Draft
                            </div>
                            <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                "We guarantee 200% returns in 30 days!"
                            </p>
                            <div className="h-px bg-amber-200" />
                            <div className="text-[10px] text-slate-500">
                                Rule: <span className="text-slate-900 font-bold underline italic">Standard Financial Disclaimer</span>
                            </div>
                            <div className="flex gap-1.5 pt-1">
                                <button className="flex-1 py-1.5 bg-white border border-amber-200 rounded-lg text-[10px] font-bold text-amber-700 hover:bg-amber-100">Edit Draft</button>
                                <button className="flex-1 py-1.5 bg-amber-600 rounded-lg text-[10px] font-bold text-white hover:bg-amber-700">Dismiss Alert</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold">Compliance Score</h4>
                        </div>
                        <div className="text-5xl font-black mb-2">99.2%</div>
                        <p className="text-indigo-100 text-xs mb-4">Your content is currently in high compliance with global brand standards.</p>
                        <div className="h-1.5 bg-white/20 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '99.2%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
