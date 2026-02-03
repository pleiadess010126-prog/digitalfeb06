'use client';

import { useState } from 'react';
import {
    MessageCircle, Users, Heart, Send, Bot, AlertCircle,
    Clock, TrendingUp, CheckCircle, Zap, Settings, Star,
    Instagram, Youtube, Facebook, Twitter, Linkedin,
    Mail, ArrowRight, Target, Shield, Globe, MessageSquare
} from 'lucide-react';
import CommunityManager from '@/components/CommunityManager';

interface EngagementStrategy {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'paused' | 'disabled';
    platform: string;
    responseTime: string;
    successRate: number;
}

const ENGAGEMENT_STRATEGIES: EngagementStrategy[] = [
    {
        id: '1',
        name: 'Welcome New Followers',
        description: 'Send personalized DM 2 hours after follow with value offer',
        status: 'active',
        platform: 'all',
        responseTime: '2h delay',
        successRate: 42
    },
    {
        id: '2',
        name: 'Hot Lead Capture',
        description: 'Priority response to pricing/buying questions with calendar link',
        status: 'active',
        platform: 'all',
        responseTime: '<15 min',
        successRate: 67
    },
    {
        id: '3',
        name: 'Complaint Resolution',
        description: 'Immediate empathy response + escalation offer for negative sentiment',
        status: 'active',
        platform: 'all',
        responseTime: '<5 min',
        successRate: 89
    },
    {
        id: '4',
        name: 'FAQ Auto-Reply',
        description: 'Answer common questions with helpful links and follow-up',
        status: 'active',
        platform: 'all',
        responseTime: '<30 min',
        successRate: 94
    },
    {
        id: '5',
        name: 'Re-engagement Campaign',
        description: 'Win back dormant subscribers with special offers',
        status: 'paused',
        platform: 'email',
        responseTime: 'Day 30',
        successRate: 23
    }
];

const DM_TEMPLATES = [
    {
        trigger: 'New Follower',
        template: "Hey {name}! 👋 Thanks for following! What brought you here? Reply A) Marketing help, B) AI tools, C) Just browsing",
        timing: '2h after follow'
    },
    {
        trigger: 'Pricing Question',
        template: "Great question! 🎯 Plans start at $29/mo. Want: 1️⃣ Demo video 2️⃣ Quick call 3️⃣ Free trial?",
        timing: 'Immediate'
    },
    {
        trigger: 'Support Issue',
        template: "Oh no, sorry about that! 😔 Tell me: 1) What happened? 2) What did you expect? I'll fix this ASAP!",
        timing: 'Immediate'
    },
    {
        trigger: 'Enterprise Inquiry',
        template: "Thank you for reaching out! For large teams, our Enterprise plan includes unlimited content and a dedicated manager. Would Tuesday or Wednesday work for a call?",
        timing: 'Immediate'
    }
];

export default function EngagementHub() {
    const [activeTab, setActiveTab] = useState<'inbox' | 'strategy' | 'templates' | 'analytics'>('inbox');
    const [strategies, setStrategies] = useState(ENGAGEMENT_STRATEGIES);

    const toggleStrategy = (id: string) => {
        setStrategies(prev => prev.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    status: s.status === 'active' ? 'paused' : 'active'
                };
            }
            return s;
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                Social Engagement Hub
                            </h1>
                            <p className="text-slate-500 mt-1">AI-powered responses for DMs, comments, and subscriber management</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Quick Stats */}
                            <div className="flex items-center gap-6 px-6 py-3 bg-slate-50 rounded-2xl">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-slate-900">147</div>
                                    <div className="text-xs text-slate-500">Today</div>
                                </div>
                                <div className="h-8 w-px bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">94%</div>
                                    <div className="text-xs text-slate-500">Response Rate</div>
                                </div>
                                <div className="h-8 w-px bg-slate-200" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-violet-600">12m</div>
                                    <div className="text-xs text-slate-500">Avg Time</div>
                                </div>
                            </div>

                            <button className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200">
                                <Settings className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 mt-6">
                        {[
                            { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: 4 },
                            { id: 'strategy', label: 'Engagement Strategy', icon: Target },
                            { id: 'templates', label: 'DM Templates', icon: Mail },
                            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-violet-100 text-violet-700'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                                {tab.badge && (
                                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">{tab.badge}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-8">
                {activeTab === 'inbox' && (
                    <CommunityManager />
                )}

                {activeTab === 'strategy' && (
                    <div className="space-y-6">
                        {/* Strategy Header */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Engagement Strategies</h2>
                                    <p className="text-slate-500 text-sm">Configure how AI responds to different scenarios</p>
                                </div>
                                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Add New Strategy
                                </button>
                            </div>

                            <div className="space-y-4">
                                {strategies.map((strategy) => (
                                    <div
                                        key={strategy.id}
                                        className={`p-4 rounded-2xl border transition-colors ${strategy.status === 'active'
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-slate-50 border-slate-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${strategy.status === 'active' ? 'bg-green-500' : 'bg-slate-300'
                                                    }`}>
                                                    <Bot className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">{strategy.name}</h3>
                                                    <p className="text-sm text-slate-500">{strategy.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <div className="text-xs text-slate-400">Response Time</div>
                                                    <div className="font-medium text-slate-900">{strategy.responseTime}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs text-slate-400">Success Rate</div>
                                                    <div className="font-medium text-green-600">{strategy.successRate}%</div>
                                                </div>
                                                <button
                                                    onClick={() => toggleStrategy(strategy.id)}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${strategy.status === 'active' ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${strategy.status === 'active' ? 'translate-x-7' : 'translate-x-1'
                                                        }`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lead Scoring */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-500" />
                                Lead Scoring Model
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { action: 'Follows account', points: '+5', color: 'bg-blue-100 text-blue-700' },
                                    { action: 'Comments on post', points: '+10', color: 'bg-green-100 text-green-700' },
                                    { action: 'Sends DM', points: '+20', color: 'bg-violet-100 text-violet-700' },
                                    { action: 'Asks about pricing', points: '+30', color: 'bg-amber-100 text-amber-700' },
                                    { action: 'Clicks trial link', points: '+40', color: 'bg-orange-100 text-orange-700' },
                                    { action: 'Visits pricing page', points: '+50', color: 'bg-pink-100 text-pink-700' },
                                    { action: 'Books a call', points: '+100', color: 'bg-red-100 text-red-700' },
                                    { action: 'Enterprise inquiry', points: '+150', color: 'bg-purple-100 text-purple-700' }
                                ].map((item, i) => (
                                    <div key={i} className={`p-4 rounded-xl ${item.color}`}>
                                        <div className="text-2xl font-bold">{item.points}</div>
                                        <div className="text-sm opacity-70">{item.action}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">DM Response Templates</h2>
                                    <p className="text-slate-500 text-sm">Pre-built responses for common scenarios</p>
                                </div>
                                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700">
                                    Add Template
                                </button>
                            </div>

                            <div className="space-y-4">
                                {DM_TEMPLATES.map((template, i) => (
                                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-lg">
                                                    {template.trigger}
                                                </span>
                                                <span className="text-xs text-slate-400">• {template.timing}</span>
                                            </div>
                                            <button className="text-sm text-violet-600 hover:text-violet-700">Edit</button>
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed">{template.template}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comment Response Matrix */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Comment Response Matrix</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-xs text-slate-500 uppercase">
                                            <th className="pb-3">Comment Type</th>
                                            <th className="pb-3">AI Response Strategy</th>
                                            <th className="pb-3">Target Time</th>
                                            <th className="pb-3">CTA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[
                                            { type: '🙂 Positive/Praise', strategy: 'Thank + Ask question + Soft CTA', time: '<30 min', cta: 'Follow/Subscribe' },
                                            { type: '❓ Question', strategy: 'Answer + Helpful link + Offer more', time: '<1 hour', cta: 'DM for more' },
                                            { type: '😐 Neutral', strategy: 'Acknowledge + Add value + Engage', time: '<2 hours', cta: 'Content share' },
                                            { type: '😠 Negative', strategy: 'Empathy + Solution + DM offer', time: '<15 min', cta: 'Support DM' },
                                            { type: '🔥 High-Intent', strategy: 'Personalized + Priority + Calendar', time: '<10 min', cta: 'Book call' }
                                        ].map((row, i) => (
                                            <tr key={i} className="border-t border-slate-100">
                                                <td className="py-3 font-medium text-slate-900">{row.type}</td>
                                                <td className="py-3 text-slate-600">{row.strategy}</td>
                                                <td className="py-3 text-slate-600">{row.time}</td>
                                                <td className="py-3">
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">{row.cta}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Engagement Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Total Engagements', value: '2,847', change: '+23%', icon: MessageCircle, color: 'text-violet-600' },
                                { label: 'Response Rate', value: '94%', change: '+5%', icon: CheckCircle, color: 'text-green-600' },
                                { label: 'Leads Captured', value: '156', change: '+34%', icon: Target, color: 'text-amber-600' },
                                { label: 'Avg Response Time', value: '12 min', change: '-40%', icon: Clock, color: 'text-blue-600' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                        <span className="text-sm text-slate-500">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-green-600 mt-1">{stat.change} vs last week</div>
                                </div>
                            ))}
                        </div>

                        {/* Platform Breakdown */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Engagement by Platform</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {[
                                    { platform: 'Instagram', icon: Instagram, messages: 542, color: 'text-pink-500', bgColor: 'bg-pink-50' },
                                    { platform: 'YouTube', icon: Youtube, messages: 328, color: 'text-red-500', bgColor: 'bg-red-50' },
                                    { platform: 'Facebook', icon: Facebook, messages: 215, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                                    { platform: 'Twitter/X', icon: Twitter, messages: 187, color: 'text-sky-500', bgColor: 'bg-sky-50' },
                                    { platform: 'LinkedIn', icon: Linkedin, messages: 89, color: 'text-blue-700', bgColor: 'bg-indigo-50' }
                                ].map((p, i) => (
                                    <div key={i} className={`p-4 rounded-xl ${p.bgColor} text-center`}>
                                        <p.icon className={`w-8 h-8 ${p.color} mx-auto mb-2`} />
                                        <div className="font-bold text-slate-900 text-lg">{p.messages}</div>
                                        <div className="text-xs text-slate-500">{p.platform}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sentiment Analysis */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Sentiment Analysis</h2>
                            <div className="flex items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-slate-600">😊 Positive</span>
                                                <span className="text-sm font-medium text-green-600">84%</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: '84%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-slate-600">😐 Neutral</span>
                                                <span className="text-sm font-medium text-slate-600">12%</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-slate-400 rounded-full" style={{ width: '12%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-slate-600">😠 Negative</span>
                                                <span className="text-sm font-medium text-red-600">4%</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-500 rounded-full" style={{ width: '4%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center px-8 py-6 bg-green-50 rounded-2xl">
                                    <div className="text-4xl font-bold text-green-600">84%</div>
                                    <div className="text-sm text-slate-600 mt-1">Positive Sentiment</div>
                                    <div className="text-xs text-green-600 mt-2">↑ 5% vs last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
