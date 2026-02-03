'use client';

import React, { useEffect, useState } from 'react';

interface ActiveNode {
    id: string;
    city: string;
    country: string;
    action: string;
    agent: string;
    timestamp: string;
}

/**
 * Global Pulse Map - Visualizes AI agent activity across global timezones
 * Premium Aesthetic: Dark mode, neon pulses, dynamic transitions
 */
export const GlobalPulseMap: React.FC = () => {
    const [activeNodes, setActiveNodes] = useState<ActiveNode[]>([]);

    useEffect(() => {
        // Simulate real-time pulses from global agents
        const cities = [
            { name: 'Kuala Lumpur', country: 'Malaysia' },
            { name: 'Khartoum', country: 'Sudan' },
            { name: 'Chennai', country: 'India' },
            { name: 'Dubai', country: 'UAE' },
            { name: 'London', country: 'UK' },
            { name: 'New York', country: 'USA' },
            { name: 'Tokyo', country: 'Japan' },
            { name: 'Sydney', country: 'Australia' }
        ];

        const actions = ['Optimizing SEO', 'Publishing Reel', 'Fact-Checking', 'Analyzing Trends', 'Sending WhatsApp Broadcast'];
        const agents = ['GEO Specialist', 'Social Worker', 'Risk Monitor', 'Trend Sentry', 'Messaging Specialist'];

        const interval = setInterval(() => {
            const city = cities[Math.floor(Math.random() * cities.length)];
            const newNode: ActiveNode = {
                id: Math.random().toString(36).substr(2, 9),
                city: city.name,
                country: city.country,
                action: actions[Math.floor(Math.random() * actions.length)],
                agent: agents[Math.floor(Math.random() * agents.length)],
                timestamp: new Date().toLocaleTimeString()
            };

            setActiveNodes(prev => [newNode, ...prev].slice(0, 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                    </span>
                    Global Agent Command Center
                </h3>
                <span className="text-slate-400 text-sm font-mono tracking-tighter">LIVE PULSE: ACTIVE</span>
            </div>

            {/* Simulated Map Container */}
            <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700/50 relative overflow-hidden mb-6">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                {/* Pulse Visualizer */}
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {activeNodes.map((node, i) => (
                        <div
                            key={node.id}
                            className="bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 animate-in fade-in zoom-in duration-500"
                            style={{ opacity: 1 - (i * 0.15) }}
                        >
                            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
                            <span className="text-violet-100 text-xs font-medium">{node.city}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute text-slate-500 text-[10px] bottom-2 right-4 font-mono">GRID SCALE: 1:5,000,000</div>
            </div>

            {/* Live Log */}
            <div className="space-y-3">
                {activeNodes.map((node) => (
                    <div key={node.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-800 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center gap-3">
                            <span className="text-violet-400 font-mono text-xs">[{node.timestamp}]</span>
                            <span className="text-slate-200 font-semibold">{node.agent}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">is {node.action} in</span>
                            <span className="text-white bg-slate-800 px-2 py-0.5 rounded text-xs font-bold border border-slate-700">{node.city}, {node.country}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button className="text-violet-400 text-xs hover:text-violet-300 transition-colors flex items-center gap-1 group">
                    VIEW WORLDWIDE AGENT DEPLOYMENT MAP
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
        </div>
    );
};
