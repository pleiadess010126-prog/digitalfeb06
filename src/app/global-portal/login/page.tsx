'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Lock, Mail, Shield, Zap, Languages, Users, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function GlobalPortalLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Demo credentials
    const VALID_CREDENTIALS = [
        { email: 'admin@digitalmeng.com', password: 'admin123', role: 'Super Admin' },
        { email: 'global@digitalmeng.com', password: 'global123', role: 'Global Admin' },
        { email: 'priya@digitalmeng.com', password: 'priya123', role: 'Global User' },
    ];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = VALID_CREDENTIALS.find(
            cred => cred.email === email && cred.password === password
        );

        if (user) {
            // Store session
            localStorage.setItem('globalPortalUser', JSON.stringify(user));
            router.push('/global-portal/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }

        setIsLoading(false);
    };

    const stats = [
        { label: 'Languages', value: '44+', icon: Languages },
        { label: 'Regions', value: '190+', icon: Globe },
        { label: 'Reach', value: '7B+', icon: Users },
        { label: 'Platforms', value: '15+', icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-cyan-600/20" />

                {/* Globe Animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-pulse" />
                    <div className="absolute inset-8 rounded-full border border-indigo-500/20 animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-16 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-24 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: '25s' }} />

                    {/* Center Globe Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                            <Globe className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-12 left-12 right-12 flex justify-between">
                    {stats.map((stat, idx) => (
                        <div
                            key={stat.label}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 transform hover:scale-105 transition-transform"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <stat.icon className="w-6 h-6 text-violet-400 mb-2" />
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Title */}
                <div className="absolute top-12 left-12 right-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Global Promotion Portal
                    </h1>
                    <p className="text-lg text-slate-300">
                        Reach 7+ billion users across 44 languages and 190+ regions
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">DigitalMEng</h2>
                            <p className="text-sm text-violet-400">Global Portal</p>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                            <p className="text-slate-400">Sign in to access Global Promotion Portal</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@digitalmeng.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Access Portal
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Demo Credentials (Click to autofill)
                            </p>
                            <div className="space-y-2">
                                {VALID_CREDENTIALS.map((cred) => (
                                    <button
                                        key={cred.email}
                                        type="button"
                                        onClick={() => {
                                            setEmail(cred.email);
                                            setPassword(cred.password);
                                        }}
                                        className="w-full p-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-left text-sm transition-colors"
                                    >
                                        <span className="text-violet-400">{cred.role}:</span>{' '}
                                        <span className="text-slate-300">{cred.email}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Restricted Access • DigitalMEng Admin & Global Users Only
                    </p>
                </div>
            </div>
        </div>
    );
}
