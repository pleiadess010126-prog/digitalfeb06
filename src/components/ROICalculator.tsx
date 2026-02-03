'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, Users, FileText, Video, Languages, Cloud, Server } from 'lucide-react';

interface ROIInputs {
    contentPiecesPerWeek: number;
    hoursPerContent: number;
    hourlyRate: number;
    teamSize: number;
    currentLanguages: number;
    targetLanguages: number;
    hostingStrategy: 'managed' | 'byo';
}

interface ROIResult {
    currentMonthlyCost: number;
    withDigitalMEngCost: number;
    monthlySavings: number;
    yearlySavings: number;
    hoursFreedPerMonth: number;
    roiPercentage: number;
    paybackDays: number;
    contentIncrease: string;
}

const PLAN_COSTS = {
    free: 0,
    lite: 29,
    starter: 79,
    growth: 149,
    pro: 299,
    enterprise: 999,
};

export default function ROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        contentPiecesPerWeek: 10,
        hoursPerContent: 2,
        hourlyRate: 25,
        teamSize: 2,
        currentLanguages: 1,
        targetLanguages: 5,
        hostingStrategy: 'managed',
    });

    const [showResults, setShowResults] = useState(false);

    const calculateROI = (): ROIResult => {
        // Current costs (manual)
        const weeklyHours = inputs.contentPiecesPerWeek * inputs.hoursPerContent;
        const monthlyHours = weeklyHours * 4;
        const currentMonthlyCost = monthlyHours * inputs.hourlyRate * inputs.teamSize;

        // With DigitalMEng (assume 85% time reduction)
        const timeReduction = 0.85;
        const hoursWithAI = monthlyHours * (1 - timeReduction);
        const laborCostWithAI = hoursWithAI * inputs.hourlyRate * inputs.teamSize;

        // Determine recommended plan based on content volume and languages
        let recommendedPlan: keyof typeof PLAN_COSTS = 'starter';
        const monthlyContent = inputs.contentPiecesPerWeek * 4;

        if (monthlyContent <= 40 && inputs.targetLanguages <= 2) recommendedPlan = 'lite';
        else if (monthlyContent <= 100 && inputs.targetLanguages <= 5) recommendedPlan = 'starter';
        else if (monthlyContent <= 200 && inputs.targetLanguages <= 10) recommendedPlan = 'growth';
        else if (monthlyContent <= 400) recommendedPlan = 'pro';
        else recommendedPlan = 'enterprise';

        // Platform Cost Adjustment for BYO
        let platformCost = PLAN_COSTS[recommendedPlan];
        let infraCost = 0;

        if (inputs.hostingStrategy === 'byo') {
            // Platform fee is reduced for BYO (e.g. 20% discount on platform software fee)
            platformCost = platformCost * 0.8;
            // But user pays for their own infrastructure (estimated tokens/server cost)
            infraCost = (monthlyContent * 0.5); // $0.50 average per high-quality content item
        }

        const withDigitalMEngCost = laborCostWithAI + platformCost + infraCost;

        // Savings
        const monthlySavings = currentMonthlyCost - withDigitalMEngCost;
        const yearlySavings = monthlySavings * 12;
        const hoursFreedPerMonth = monthlyHours * timeReduction;

        // ROI calculation
        const roiPercentage = ((monthlySavings / (platformCost + infraCost)) * 100) || 0;
        const paybackDays = (platformCost + infraCost) > 0 ? Math.ceil(((platformCost + infraCost) / (monthlySavings / 30))) : 0;

        // Content increase (multiply by language expansion)
        const contentMultiplier = inputs.targetLanguages / Math.max(inputs.currentLanguages, 1);
        const contentIncrease = `${Math.round(contentMultiplier * 100)}%`;

        return {
            currentMonthlyCost,
            withDigitalMEngCost,
            monthlySavings: Math.max(0, monthlySavings),
            yearlySavings: Math.max(0, yearlySavings),
            hoursFreedPerMonth,
            roiPercentage: Math.max(0, roiPercentage),
            paybackDays: Math.max(0, paybackDays),
            contentIncrease,
        };
    };

    const results = calculateROI();

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">ROI Calculator</h2>
                </div>
                <p className="text-white/80">See how much you can save with AI-powered content creation</p>
            </div>

            <div className="p-6">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Content Volume */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Content pieces per week
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={inputs.contentPiecesPerWeek}
                            onChange={(e) => setInputs({ ...inputs, contentPiecesPerWeek: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>5</span>
                            <span className="font-bold text-violet-600">{inputs.contentPiecesPerWeek}</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Hours per Content */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Clock className="w-4 h-4 inline mr-2" />
                            Hours per content piece
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="8"
                            step="0.5"
                            value={inputs.hoursPerContent}
                            onChange={(e) => setInputs({ ...inputs, hoursPerContent: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>0.5h</span>
                            <span className="font-bold text-violet-600">{inputs.hoursPerContent}h</span>
                            <span>8h</span>
                        </div>
                    </div>

                    {/* Hourly Rate */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-2" />
                            Hourly rate ($/hr)
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={inputs.hourlyRate}
                            onChange={(e) => setInputs({ ...inputs, hourlyRate: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>$10</span>
                            <span className="font-bold text-violet-600">${inputs.hourlyRate}</span>
                            <span>$100</span>
                        </div>
                    </div>

                    {/* Team Size */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Users className="w-4 h-4 inline mr-2" />
                            Team size
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.teamSize}
                            onChange={(e) => setInputs({ ...inputs, teamSize: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>1</span>
                            <span className="font-bold text-violet-600">{inputs.teamSize}</span>
                            <span>10</span>
                        </div>
                    </div>

                    {/* Current Languages */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Languages className="w-4 h-4 inline mr-2" />
                            Current languages
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={inputs.currentLanguages}
                            onChange={(e) => setInputs({ ...inputs, currentLanguages: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>1</span>
                            <span className="font-bold text-violet-600">{inputs.currentLanguages}</span>
                            <span>10</span>
                        </div>
                    </div>

                    {/* Target Languages */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Languages className="w-4 h-4 inline mr-2" />
                            Target languages (with DigitalMEng)
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="44"
                            value={inputs.targetLanguages}
                            onChange={(e) => setInputs({ ...inputs, targetLanguages: Number(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                        />
                        <div className="flex justify-between text-sm text-slate-500 mt-1">
                            <span>1</span>
                            <span className="font-bold text-violet-600">{inputs.targetLanguages}</span>
                            <span>44</span>
                        </div>
                    </div>

                    {/* Infrastructure Toggle */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Infrastructure Type
                        </label>
                        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                            <button
                                onClick={() => setInputs({ ...inputs, hostingStrategy: 'managed' })}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${inputs.hostingStrategy === 'managed'
                                    ? 'bg-white text-violet-600 shadow-sm'
                                    : 'text-slate-500'
                                    }`}
                            >
                                <Cloud className="w-4 h-4" />
                                Managed Cloud
                            </button>
                            <button
                                onClick={() => setInputs({ ...inputs, hostingStrategy: 'byo' })}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${inputs.hostingStrategy === 'byo'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-slate-500'
                                    }`}
                            >
                                <Server className="w-4 h-4" />
                                Private BYO Cloud
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">
                            {inputs.hostingStrategy === 'managed'
                                ? "Zero configuration. Platform handles all AI costs."
                                : "20% platform discount. You pay your AI provider directly for usage."}
                        </p>
                    </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-r from-slate-50 to-violet-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-violet-600" />
                        Your Potential Savings
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {/* Monthly Savings */}
                        <div className="bg-white rounded-xl p-4 border border-green-200">
                            <p className="text-sm text-slate-500 mb-1">Monthly Savings</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${results.monthlySavings.toLocaleString()}
                            </p>
                        </div>

                        {/* Yearly Savings */}
                        <div className="bg-white rounded-xl p-4 border border-green-200">
                            <p className="text-sm text-slate-500 mb-1">Yearly Savings</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${results.yearlySavings.toLocaleString()}
                            </p>
                        </div>

                        {/* Hours Freed */}
                        <div className="bg-white rounded-xl p-4 border border-blue-200">
                            <p className="text-sm text-slate-500 mb-1">Hours Freed/Month</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round(results.hoursFreedPerMonth)}h
                            </p>
                        </div>

                        {/* Content Increase */}
                        <div className="bg-white rounded-xl p-4 border border-violet-200">
                            <p className="text-sm text-slate-500 mb-1">Content Increase</p>
                            <p className="text-2xl font-bold text-violet-600">
                                {results.contentIncrease}
                            </p>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                            <p className="text-sm font-medium text-red-600 mb-2">❌ Without DigitalMEng</p>
                            <p className="text-3xl font-bold text-red-700">${results.currentMonthlyCost.toLocaleString()}/mo</p>
                            <p className="text-sm text-red-600 mt-1">
                                {Math.round(inputs.contentPiecesPerWeek * inputs.hoursPerContent * 4)} hours of manual work
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                            <p className="text-sm font-medium text-green-600 mb-2">✅ With DigitalMEng</p>
                            <p className="text-3xl font-bold text-green-700">${results.withDigitalMEngCost.toLocaleString()}/mo</p>
                            <p className="text-sm text-green-600 mt-1">
                                {inputs.targetLanguages} languages, {Math.round(results.hoursFreedPerMonth)}h saved
                            </p>
                        </div>
                    </div>

                    {/* ROI Metrics */}
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <div className="px-4 py-2 bg-violet-100 rounded-full">
                            <span className="text-sm text-violet-700">
                                <strong>{Math.round(results.roiPercentage)}%</strong> ROI
                            </span>
                        </div>
                        {results.paybackDays > 0 && results.paybackDays < 365 && (
                            <div className="px-4 py-2 bg-green-100 rounded-full">
                                <span className="text-sm text-green-700">
                                    Payback in <strong>{results.paybackDays}</strong> days
                                </span>
                            </div>
                        )}
                        <div className="px-4 py-2 bg-blue-100 rounded-full">
                            <span className="text-sm text-blue-700">
                                <strong>85%</strong> time reduction
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25">
                        <Sparkles className="w-5 h-5 inline mr-2" />
                        Start Saving Today - Free Trial
                    </button>
                </div>
            </div>
        </div>
    );
}
