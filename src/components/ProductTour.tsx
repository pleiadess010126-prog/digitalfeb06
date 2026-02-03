'use client';

import { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, ChevronLeft, X, Sparkles,
    Play, CheckCircle2, Info, ArrowRight,
    LayoutDashboard, Bot, Zap, Globe, Target
} from 'lucide-react';

interface TourStep {
    targetId: string;
    title: string;
    description: string;
    icon: any;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const STEPS: TourStep[] = [
    {
        targetId: 'tour-sidebar',
        title: 'Central Command',
        description: 'Navigate between your overview, content AI, analytics, and automation center from here.',
        icon: LayoutDashboard,
        position: 'right'
    },
    {
        targetId: 'tour-stats',
        title: 'Real-time Pulse',
        description: 'Track your omnichannel reach, engagement, and AI-driven growth metrics at a glance.',
        icon: Zap,
        position: 'bottom'
    },
    {
        targetId: 'tour-automation',
        title: 'Automation & Autopilot',
        description: 'This is where the magic happens. Configure your AI Agents, set your publishing velocity, and turn on the Master Autopilot switch.',
        icon: Bot,
        position: 'bottom'
    },
    {
        targetId: 'tour-localization',
        title: 'Global Scale',
        description: 'Reach an international audience instantly. Use our cultural localization engine to post in 20+ languages.',
        icon: Globe,
        position: 'bottom'
    },
    {
        targetId: 'tour-geoscore',
        title: 'GEO Scorecard',
        description: 'Monitor how "AI-Ready" your content is. Ensure you are being cited by ChatGPT, Perplexity, and Claude.',
        icon: Target,
        position: 'top'
    },
    {
        targetId: 'tour-profile',
        title: 'Brand DNA',
        description: 'Finally, ensure your brand settings and API credentials are up to date to keep your engine running at peak efficiency.',
        icon: CheckCircle2,
        position: 'left'
    }
];

export default function ProductTour({ onComplete }: { onComplete?: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const tourRef = useRef<HTMLDivElement>(null);

    // Load tour status
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenProductTour');
        if (!hasSeenTour) {
            setTimeout(() => setIsVisible(true), 2000); // Small delay for dashboard to load
        }
    }, []);

    // Update target position
    useEffect(() => {
        if (!isVisible) return;

        const updatePosition = () => {
            const step = STEPS[currentStep];
            const element = document.getElementById(step.targetId);
            if (element) {
                setRect(element.getBoundingClientRect());
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [isVisible, currentStep]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenProductTour', 'true');
        onComplete?.();
    };

    const skipTour = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenProductTour', 'true');
    };

    if (!isVisible || !rect) return null;

    const step = STEPS[currentStep];
    const Icon = step.icon;

    // Calculate spotlight position
    const spotlightStyle = {
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
    };

    // Calculate tooltip position
    const getTooltipStyle = () => {
        const gap = 16;
        switch (step.position) {
            case 'right':
                return { top: rect.top, left: rect.right + gap };
            case 'left':
                return { top: rect.top, left: rect.left - 320 - gap };
            case 'top':
                return { top: rect.top - 200 - gap, left: rect.left + (rect.width / 2) - 160 };
            case 'bottom':
            default:
                return { top: rect.bottom + gap, left: rect.left + (rect.width / 2) - 160 };
        }
    };

    const tooltipStyle = getTooltipStyle();

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Dark Backdrop with Spotlight */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] pointer-events-auto"
                onClick={skipTour}
                style={{
                    clipPath: `polygon(
                        0% 0%, 0% 100%, 
                        ${spotlightStyle.left}px 100%, 
                        ${spotlightStyle.left}px ${spotlightStyle.top}px, 
                        ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top}px, 
                        ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top + spotlightStyle.height}px, 
                        ${spotlightStyle.left}px ${spotlightStyle.top + spotlightStyle.height}px, 
                        ${spotlightStyle.left}px 100%, 
                        100% 100%, 100% 0%
                    )`
                }}
            />

            {/* Spotlight Border */}
            <div
                className="absolute border-2 border-primary rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
                style={spotlightStyle}
            />

            {/* Tooltip Content */}
            <div
                ref={tourRef}
                className="absolute w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 pointer-events-auto transition-all duration-300 animate-in fade-in zoom-in-95"
                style={tooltipStyle}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <button
                        onClick={skipTour}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {step.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all ${i === currentStep ? 'w-4 bg-primary' : 'w-1 bg-slate-200 dark:bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {currentStep > 0 && (
                            <button
                                onClick={handleBack}
                                className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            {currentStep === STEPS.length - 1 ? (
                                <>
                                    Finish <Play className="w-4 h-4 fill-current" />
                                </>
                            ) : (
                                <>
                                    Next <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Arrow Pointer */}
                <div
                    className={`absolute w-3 h-3 bg-white dark:bg-slate-900 border-l border-t border-slate-200 dark:border-slate-800 transform rotate-[45deg] ${step.position === 'bottom' ? '-top-1.5 left-1/2 -ml-1.5' :
                            step.position === 'top' ? '-bottom-1.5 left-1/2 -ml-1.5 rotate-[225deg]' :
                                step.position === 'right' ? 'top-8 -left-1.5 -rotate-[45deg]' :
                                    'top-8 -right-1.5 rotate-[135deg]'
                        }`}
                />
            </div>
        </div>
    );
}
