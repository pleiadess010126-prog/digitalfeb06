'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    X,
    Check,
    Crown,
    Zap,
    Star,
    Building2,
    ArrowRight,
    Globe,
    Languages,
    Video,
    BarChart3,
    Users,
    Headphones,
    Shield,
    Sparkles
} from 'lucide-react';

interface PlanComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlan?: 'free' | 'lite' | 'starter' | 'growth' | 'pro' | 'enterprise';
    highlightPlan?: 'pro' | 'enterprise';
    triggerReason?: string; // e.g., "You tried to access Tamil language"
}

const PLANS = [
    {
        id: 'free',
        name: 'Free Trial',
        price: 0,
        icon: Sparkles,
        color: 'from-slate-400 to-slate-500',
        features: {
            languages: 5,
            indianLanguages: 'Hindi only',
            content: '50/mo',
            video: '1 min',
            platforms: 3,
            analytics: 'Basic',
            support: 'Email',
            api: false,
        },
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 299,
        icon: Crown,
        color: 'from-violet-500 to-fuchsia-500',
        popular: true,
        features: {
            languages: 20,
            indianLanguages: 'Hindi + 5',
            content: '400/mo',
            video: '20 min',
            platforms: 5,
            analytics: 'Advanced',
            support: 'Priority',
            api: false,
        },
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 999,
        icon: Building2,
        color: 'from-orange-500 to-amber-500',
        features: {
            languages: 44,
            indianLanguages: 'All 13',
            content: 'Unlimited',
            video: '60 min',
            platforms: '15+',
            analytics: 'Custom',
            support: 'Dedicated',
            api: true,
        },
    },
];

const FEATURES = [
    { key: 'languages', label: 'Languages', icon: Languages },
    { key: 'indianLanguages', label: 'Indian Languages', icon: Globe },
    { key: 'content', label: 'Content/Month', icon: Zap },
    { key: 'video', label: 'AI Video', icon: Video },
    { key: 'platforms', label: 'Platforms', icon: Star },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'support', label: 'Support', icon: Headphones },
    { key: 'api', label: 'API Access', icon: Shield },
];

export default function PlanComparisonModal({
    isOpen,
    onClose,
    currentPlan = 'free',
    highlightPlan = 'pro',
    triggerReason,
}: PlanComparisonModalProps) {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    if (!isOpen) return null;

    const getPrice = (plan: typeof PLANS[0]) => {
        const basePrice = plan.price;
        return billingPeriod === 'yearly' ? Math.round(basePrice * 0.8) : basePrice;
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <Crown className="w-8 h-8" />
                        <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
                    </div>
                    {triggerReason && (
                        <p className="text-white/90 text-sm bg-white/10 rounded-lg px-4 py-2 inline-block mt-2">
                            {triggerReason}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 p-1 bg-slate-100 rounded-full">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingPeriod === 'monthly'
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingPeriod === 'yearly'
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                Yearly
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                    -20%
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Plan Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {PLANS.map((plan) => {
                            const Icon = plan.icon;
                            const isHighlighted = plan.id === highlightPlan;
                            const isCurrent = plan.id === currentPlan;

                            return (
                                <div
                                    key={plan.id}
                                    className={`rounded-2xl border-2 p-5 transition-all ${isHighlighted
                                            ? 'border-violet-500 bg-violet-50 scale-[1.02]'
                                            : isCurrent
                                                ? 'border-slate-300 bg-slate-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="text-center -mt-2 mb-3">
                                            <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold rounded-full">
                                                MOST POPULAR
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-xl bg-gradient-to-br ${plan.color}`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{plan.name}</h3>
                                            {isCurrent && (
                                                <span className="text-xs text-slate-500">Current Plan</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-3xl font-bold text-slate-800">
                                            ${getPrice(plan)}
                                        </span>
                                        <span className="text-slate-500 text-sm">/mo</span>
                                    </div>

                                    {!isCurrent && (
                                        <Link
                                            href={`/signup?plan=${plan.id}`}
                                            className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${isHighlighted
                                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                        >
                                            Choose {plan.name}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Feature Comparison */}
                    <div className="bg-slate-50 rounded-2xl p-4">
                        <h3 className="font-semibold text-slate-800 mb-4 text-center">Feature Comparison</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-3 text-sm font-medium text-slate-500">Feature</th>
                                        {PLANS.map((plan) => (
                                            <th key={plan.id} className="text-center py-2 px-3 text-sm font-medium text-slate-800">
                                                {plan.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {FEATURES.map((feature, idx) => {
                                        const Icon = feature.icon;
                                        return (
                                            <tr key={feature.key} className={idx % 2 === 0 ? 'bg-white' : ''}>
                                                <td className="py-2.5 px-3 text-sm text-slate-700 flex items-center gap-2">
                                                    <Icon className="w-4 h-4 text-slate-400" />
                                                    {feature.label}
                                                </td>
                                                {PLANS.map((plan) => {
                                                    const value = plan.features[feature.key as keyof typeof plan.features];
                                                    return (
                                                        <td key={plan.id} className="text-center py-2.5 px-3">
                                                            {typeof value === 'boolean' ? (
                                                                value ? (
                                                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                                                ) : (
                                                                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                                                                )
                                                            ) : (
                                                                <span className={`text-sm font-medium ${plan.id === highlightPlan ? 'text-violet-700' : 'text-slate-700'
                                                                    }`}>
                                                                    {value}
                                                                </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm mb-4">
                            Not sure which plan is right for you?{' '}
                            <Link href="/contact" className="text-violet-600 hover:underline">
                                Talk to our team
                            </Link>
                        </p>
                        <Link
                            href={`/signup?plan=${highlightPlan}`}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-violet-500/25"
                        >
                            <Crown className="w-5 h-5" />
                            Upgrade Now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hook for easy usage
export function usePlanComparison() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<{
        highlightPlan?: 'pro' | 'enterprise';
        triggerReason?: string;
    }>({});

    const openModal = (options?: { highlightPlan?: 'pro' | 'enterprise'; triggerReason?: string }) => {
        setConfig(options || {});
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        config,
        openModal,
        closeModal,
    };
}
