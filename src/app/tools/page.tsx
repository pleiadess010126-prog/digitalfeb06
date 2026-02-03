'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Calculator,
    Wand2,
    BarChart3,
    Crown,
    Sparkles,
    TrendingUp,
    Languages,
    Globe
} from 'lucide-react';
import ROICalculator from '@/components/ROICalculator';
import ABContentGenerator from '@/components/ABContentGenerator';
import PlanComparisonModal from '@/components/PlanComparisonModal';

type ToolTab = 'roi' | 'ab-generator' | 'plan-compare';

export default function ToolsPage() {
    const [activeTab, setActiveTab] = useState<ToolTab>('roi');
    const [showPlanModal, setShowPlanModal] = useState(false);

    const tools = [
        {
            id: 'roi' as ToolTab,
            name: 'ROI Calculator',
            description: 'See how much you can save with AI',
            icon: Calculator,
            color: 'from-violet-500 to-fuchsia-500',
        },
        {
            id: 'ab-generator' as ToolTab,
            name: 'A/B Content Generator',
            description: 'Generate multiple content variants',
            icon: Wand2,
            color: 'from-orange-500 to-amber-500',
        },
        {
            id: 'plan-compare' as ToolTab,
            name: 'Plan Comparison',
            description: 'Compare features across plans',
            icon: Crown,
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">Marketing Tools</h1>
                                <p className="text-sm text-slate-500">Free tools to boost your marketing</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/pricing"
                                className="px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                            >
                                View Pricing
                            </Link>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Tool Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = activeTab === tool.id;

                        return (
                            <button
                                key={tool.id}
                                onClick={() => tool.id === 'plan-compare' ? setShowPlanModal(true) : setActiveTab(tool.id)}
                                className={`p-4 rounded-2xl border-2 transition-all text-left ${isActive
                                        ? 'border-violet-500 bg-violet-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">{tool.name}</h3>
                                        <p className="text-sm text-slate-500">{tool.description}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Tool Content */}
                {activeTab === 'roi' && <ROICalculator />}
                {activeTab === 'ab-generator' && <ABContentGenerator />}

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-slate-500">Avg. Time Saved</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">85%</p>
                        <p className="text-xs text-slate-500">Per content piece</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <Languages className="w-5 h-5 text-violet-500" />
                            <span className="text-sm text-slate-500">Languages</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">44</p>
                        <p className="text-xs text-slate-500">Including 13 Indian</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <span className="text-sm text-slate-500">Global Reach</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">190+</p>
                        <p className="text-xs text-slate-500">Regions supported</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <span className="text-sm text-slate-500">Content Quality</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">98%</p>
                        <p className="text-xs text-slate-500">User satisfaction</p>
                    </div>
                </div>
            </main>

            {/* Plan Comparison Modal */}
            <PlanComparisonModal
                isOpen={showPlanModal}
                onClose={() => setShowPlanModal(false)}
                currentPlan="free"
                highlightPlan="pro"
                triggerReason="Compare all plans and features"
            />
        </div>
    );
}
