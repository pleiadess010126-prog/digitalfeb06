'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles, Shield, ArrowRight, BarChart3, Layers,
  CheckCircle2, Rocket, TrendingUp, Globe, Play,
  Youtube, Instagram, Facebook, FileText, Bot, LineChart, Gift,
  Languages, Crown, Users, Video, Calendar, Star, Check, X,
  MessageCircle, Mail, Phone, MapPin, Twitter, Linkedin,
  ChevronRight, ArrowUpRight, Cpu, Lock, Clock, Target, Award, Ban, Globe2, ShieldAlert, Telescope, Activity, Wallet,
  Terminal, BarChart, Server, Code2, Database, ShieldCheck, Zap as ZapIcon
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LanguageDropdown from '@/components/LanguageDropdown';
import { getTranslation, SUPPORTED_UI_LANGUAGES } from '@/lib/i18n/translations';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languageDetected, setLanguageDetected] = useState(false);
  const [activePlatform, setActivePlatform] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Helper function to get translations
  const t = (key: string) => getTranslation(currentLanguage, key);

  // Detect language from IP on mount
  useEffect(() => {
    setMounted(true);

    // Check localStorage first for saved preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && SUPPORTED_UI_LANGUAGES.some(l => l.code === savedLang)) {
      setCurrentLanguage(savedLang);
      setLanguageDetected(true);
      return;
    }

    // Detect language from IP
    const detectLanguage = async () => {
      try {
        const response = await fetch('/api/detect-language');
        const data = await response.json();
        if (data.success && data.language) {
          if (SUPPORTED_UI_LANGUAGES.some(l => l.code === data.language)) {
            setCurrentLanguage(data.language);
            localStorage.setItem('preferredLanguage', data.language);
          }
        }
      } catch (error) {
        console.log('Language detection failed, using default');
      } finally {
        setLanguageDetected(true);
      }
    };

    detectLanguage();
  }, []);

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  useEffect(() => {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      router.push('/dashboard');
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  if (!mounted) return null;

  const features = [
    { icon: Bot, label: 'AI Content', color: 'from-violet-500 to-purple-500' },
    { icon: Youtube, label: 'YouTube', color: 'from-red-500 to-rose-500' },
    { icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-orange-500' },
    { icon: Facebook, label: 'Facebook', color: 'from-blue-500 to-cyan-500' },
  ];

  const platforms = [
    { name: 'WordPress', icon: FileText, color: 'bg-blue-500' },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { name: 'TikTok', icon: Video, color: 'bg-slate-800' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  // Check if current language is RTL
  const isRTL = ['ar', 'he', 'fa', 'ur'].includes(currentLanguage);

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DigitalMEng",
            "operatingSystem": "Web",
            "applicationCategory": "MarketingApplication",
            "offers": {
              "@type": "Offer",
              "price": "29.00",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1200"
            }
          })
        }}
      />

      {/* Glass Navigation Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated Background Engine */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-violet-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Dynamic Mesh */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        {/* Floating Code Snippets (Ambient) */}
        <div className="absolute top-1/4 left-10 text-[10px] font-mono text-white/5 opacity-[0.2] select-none rotate-12">
          {`const engine = new ASIKernel({ mode: 'autonomous' });`}
        </div>
        <div className="absolute bottom-1/4 right-10 text-[10px] font-mono text-white/5 opacity-[0.2] select-none -rotate-12">
          {`swarm.broadcast({ payload: 'global_viral_node' });`}
        </div>
      </div>

      <main>

        {/* Navigation */}
        <nav className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl h-14 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="DigitalMEng Logo"
                width={140}
                height={56}
                className="object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">MEng</span>
                </span>
                <span className="text-xs text-white/50">ASI Digital Marketing Pioneer</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
              <Link href="/tools" className="text-sm text-white/70 hover:text-white transition-colors">Tools</Link>
              <Link href="/global-portal" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Global Portal
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
              <LanguageDropdown
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                variant="light"
              />
              <button
                onClick={() => router.push('/affiliate-program')}
                className="hidden md:flex px-4 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors items-center gap-1.5"
              >
                <Gift className="w-4 h-4" />
                Affiliate
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {t('login')}
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
              >
                {t('getStarted')}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
          <motion.div
            style={{ opacity, scale }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Content */}
            <div className="relative z-10">
              {/* Ultra-Premium Announcement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-xl"
              >
                <div className="flex h-2 w-2 relative">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">ASI PIONEER SYSTEM ACTIVE</span>
              </motion.div>

              {/* Master Headline */}
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] mb-10">
                <span className="block text-white opacity-40">Build.</span>
                <span className="block text-white">Automate.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400 animate-gradient">
                  Dominate.
                </span>
              </h1>

              <p className="text-xl text-white/50 mb-12 leading-relaxed max-w-xl font-medium">
                The world's only <span className="text-white">Autonomous Marketing Organism</span>. We've replaced 100-person agencies with a single kernel that simulates, creates, and negotiates your global growth in real-time.
              </p>

              {/* Master CTA Container */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <button
                  onClick={() => router.push('/onboarding')}
                  className="group relative px-12 py-6 text-lg font-black rounded-3xl overflow-hidden active:scale-95 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative flex items-center justify-center gap-4 text-white">
                    <Terminal className="w-5 h-5" />
                    DEPOY THE CORE
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('prop-core');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-12 py-6 text-lg font-black rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <Telescope className="w-5 h-5 text-fuchsia-500" />
                  EXPLORE THE 2036 CORE
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 py-6 border-t border-white/5">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-slate-800 flex items-center justify-center text-xs font-bold ring-2 ring-violet-500/20">
                      {i === 1 ? 'CEO' : i === 2 ? 'CMO' : i === 3 ? 'VP' : 'MD'}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                  </div>
                  <p className="text-white/40">Trusted by 1,200+ Corporate Leaders</p>
                </div>
              </div>
            </div>

            {/* Right Visual - The Swarm Visualizer */}
            <div className="relative group">
              <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full group-hover:bg-violet-600/30 transition-all duration-1000" />
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl aspect-square flex items-center justify-center p-8">
                {/* Central Core */}
                <div className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)] animate-pulse">
                  <Cpu className="w-16 h-16 text-white" />
                  {/* Orbiting Agents */}
                  {[
                    { icon: FileText, label: 'Journalist', color: 'text-blue-400', orbit: 'animate-[spin_8s_linear_infinite]' },
                    { icon: Video, label: 'Producer', color: 'text-red-400', orbit: 'animate-[spin_12s_linear_infinite]' },
                    { icon: Languages, label: 'Linguist', color: 'text-emerald-400', orbit: 'animate-[spin_10s_linear_infinite]' },
                    { icon: Target, label: 'Strategist', color: 'text-amber-400', orbit: 'animate-[spin_15s_linear_infinite]' },
                    { icon: Shield, label: 'Guardian', color: 'text-indigo-400', orbit: 'animate-[spin_6s_linear_infinite]' },
                    { icon: MessageCircle, label: 'Concierge', color: 'text-pink-400', orbit: 'animate-[spin_9s_linear_infinite]' },
                  ].map((agent, i) => (
                    <div key={i} className={`absolute inset-0 ${agent.orbit}`}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`p-3 rounded-2xl bg-slate-900 border border-white/10 shadow-xl ${agent.color}`}>
                            <agent.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">{agent.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scanning Lines */}
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent top-1/4 animate-[scan_4s_ease-in-out_infinite]" />
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent top-3/4 animate-[scan_4s_ease-in-out_infinite_2s]" />

                {/* Bottom Console */}
                <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white/50">SWARM STATUS: <span className="text-green-500 animate-pulse">AUTONOMOUS</span></span>
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-violet-500 rounded-full" />
                      <div className="w-1 h-3 bg-violet-400 rounded-full" />
                      <div className="w-1 h-3 bg-violet-300 rounded-full" />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-violet-300/60 leading-tight">
                    {">"} Agent_Linguist adapting context for Tokyo region... [OK]<br />
                    {">"} Agent_Guardian scanning for legal compliance... [OK]<br />
                    {">"} Agent_Producer generating 4K assets... [PENDING]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* WOW FEATURES SHOWCASE */}
        <section className="relative z-10 py-32 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Designed for <span className="italic underline decoration-fuchsia-500">Scale</span>. Protected for <span className="italic underline decoration-emerald-500">Security</span>.</h2>
              <p className="text-white/40 text-xl font-medium tracking-tight">The 3 Pillars of Corporate Autonomy</p>
            </div>

            <div className="space-y-32">
              {/* Feature 1: The Swarm */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-3xl bg-violet-600/20 border border-violet-500/20">
                    <ZapIcon className="w-10 h-10 text-violet-500" />
                  </div>
                  <h3 className="text-4xl font-black">Agentic Swarm Intelligence</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Stop buying tools. Start hiring agents. Our Swarm Intelligence consists of specialized AI entities that collaborate like a human marketing team—planning, creating, and executing across 18+ channels simultaneously.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Cross-agent collaboration for context consistency',
                      'Real-time market trend hijacking',
                      'Automated content splintering (1 Blog -> 50 Social Posts)'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-violet-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-1 rounded-[3rem] bg-gradient-to-br from-violet-500 to-fuchsia-600">
                  <div className="bg-[#0a0a0f] rounded-[2.9rem] p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="font-bold">Agent_Researcher</span>
                        </div>
                        <span className="text-xs text-white/40">Found 3 new trends</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 translate-x-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="font-bold">Agent_Writer</span>
                        </div>
                        <span className="text-xs text-white/40">Drafting 5 variations...</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 translate-x-8">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-bold">Agent_Linguist</span>
                        </div>
                        <span className="text-xs text-white/40">Transcreating for EU market</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Brand Safety */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 p-1 rounded-[3rem] bg-gradient-to-br from-red-500 to-orange-600 shadow-[0_0_80px_rgba(239,68,68,0.15)]">
                  <div className="bg-[#0a0a0f] rounded-[2.9rem] p-12 text-center">
                    <div className="inline-flex p-6 rounded-full bg-red-500/20 mb-6 border-4 border-red-500 shadow-xl shadow-red-500/20">
                      <Ban className="w-16 h-16 text-red-500" />
                    </div>
                    <h4 className="text-2xl font-black text-red-500 mb-2 uppercase tracking-tighter">Emergency Kill-Switch</h4>
                    <p className="text-white/40 text-sm">One click to freeze all global activity instantly.</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="inline-flex p-4 rounded-3xl bg-red-600/20 border border-red-500/20">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-4xl font-black uppercase text-white">Military-Grade Brand Safety</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    The biggest risk of AI is a brand scandal. DigitalMEng is the only platform that puts <span className="text-white font-bold italic">Legal-First</span>. Our Guardian Agents scan every syllable for compliance, sentiment risk, and forbidden competitors.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Forbidden keyword & Competitor blocking',
                      'Real-time compliance disclaimers injection',
                      'Sentiment-triggered auto-pause'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feature 3: Cultural Localization */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-3xl bg-emerald-600/20 border border-emerald-500/20">
                    <Globe2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-4xl font-black capitalize">Cultural Transcreation, <br /> Not Just Translation</h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    Translation changes words; Transcreation changes <span className="text-emerald-400 font-bold italic">impact</span>. Our AI doesn't just swap languages—it adjusts metaphors, cultural references, and sentiment for 44+ markets.
                  </p>
                  <Link href="/global-portal" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all group">
                    Go Global Securely
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 group">
                  <Image
                    src="/digitalmeng_global_promo_poster.png"
                    alt="Global Cultural Resonance"
                    fill
                    className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-[5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-500 text-black text-xs font-black rounded-lg">LIVE</span>
                      <span className="text-white font-bold">194 Regional Strategies Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4: THE 2036 PROPRIETARY CORE */}
              <motion.div
                id="prop-core"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-16 items-center mt-32"
              >
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-3xl bg-amber-600/20 border border-amber-500/20">
                    <Telescope className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-4xl font-black italic tracking-tighter">Exclusively DigitalMEng:<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">The 2036 Intelligence Core</span></h3>
                  <p className="text-lg text-white/60 leading-relaxed">
                    While others build simple chatbots, we've developed three proprietary modules exclusive to this platform that put you a decade ahead of the competition.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
                      <Activity className="w-8 h-8 text-violet-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm italic">Temporal Sentry (Proprietary)</h4>
                        <p className="text-xs text-white/40">Simulates parallel market futures to predict viral outcomes before you post.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
                      <Users className="w-8 h-8 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm italic">Autonomous Lobbyist (Proprietary)</h4>
                        <p className="text-xs text-white/40">Your personal agent that negotiates partnerships with other brands autonomously.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
                      <Wallet className="w-8 h-8 text-amber-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm italic">Autonomous Treasurer (Proprietary)</h4>
                        <p className="text-xs text-white/40">Self-managing budget engine with direct payment gateway handshake and ROI optimization.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative p-10 bg-slate-900 border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50" />
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-24 h-24 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                      <Lock className="w-10 h-10 text-amber-500" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Proprietary IP Block</h4>
                    <p className="text-sm text-white/40 italic">These modules are native to the DigitalMEng ASI Kernel and cannot be exported or found on third-party marketplaces.</p>
                    <div className="flex justify-center gap-2 pt-4">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping delay-75" />
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping delay-150" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRICING GRID: GLOBAL STANDARD */}
        <section id="pricing" className="relative z-10 py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-xs font-black uppercase text-violet-500 tracking-[0.3em] mb-4 block">Deployment tiers</span>
              <h2 className="text-5xl md:text-7xl font-black mb-6 italic">Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Battle Plan.</span></h2>
              <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto">From individual operators to sovereign enterprises. Choose your intelligence depth.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Free Trial: The Sandbox */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 rotate-12 opacity-10 group-hover:scale-110 transition-all">
                  <Database className="w-24 h-24" />
                </div>
                <div className="text-xs font-black text-emerald-400 mb-2 uppercase tracking-widest">Sandbox node</div>
                <div className="text-5xl font-black text-white mb-8">Free</div>
                <div className="space-y-4 flex-1 mb-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 15-Day Neural Sandbox
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 20 Autonomous Assets
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Global Port 80 Access
                  </div>
                </div>
                <button
                  onClick={() => router.push('/signup')}
                  className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95"
                >
                  INITIALIZE SANDBOX
                </button>
              </motion.div>

              {/* Pro: The Sovereign */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-slate-900 to-fuchsia-900/20 border-2 border-violet-500 relative shadow-[0_0_80px_rgba(139,92,246,0.2)] flex flex-col group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[10px] font-black text-white shadow-2xl tracking-[0.2em]">
                  SOVEREIGN CHOICE
                </div>
                <div className="absolute top-10 right-10 p-2 bg-violet-500/20 rounded-xl">
                  <Crown className="w-6 h-6 text-violet-400" />
                </div>
                <div className="text-xs font-black text-violet-400 mb-2 uppercase tracking-widest">Growth node</div>
                <div className="text-5xl font-black text-white mb-2">$299<span className="text-lg font-medium text-white/30">/mo</span></div>
                <p className="text-[10px] text-white/40 uppercase font-bold mb-8">Unlimited Agent Scaling</p>
                <div className="space-y-4 flex-1 mb-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white">
                    <ZapIcon className="w-5 h-5 text-violet-400" /> Full 2036 Proprietary Core
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white">
                    <ZapIcon className="w-5 h-5 text-violet-400" /> Unlimited Transcreations
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white">
                    <ZapIcon className="w-5 h-5 text-violet-400" /> Autonomous Lobbyist Negotiations
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white">
                    <ZapIcon className="w-5 h-5 text-violet-400" /> 4K Video Node Unlocked
                  </div>
                </div>
                <button
                  onClick={() => router.push('/signup?plan=pro')}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black shadow-xl hover:shadow-violet-500/40 transition-all transform active:scale-95"
                >
                  DEPOY SOVEREIGN ENGINE
                </button>
              </motion.div>

              {/* Enterprise: The Command */}
              <motion.div
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col group relative"
              >
                <div className="absolute top-0 right-0 p-8 rotate-12 opacity-10 group-hover:scale-110 transition-all">
                  <Server className="w-24 h-24" />
                </div>
                <div className="text-xs font-black text-amber-400 mb-2 uppercase tracking-widest">Enterprise cluster</div>
                <div className="text-5xl font-black text-white mb-8">Custom</div>
                <div className="space-y-4 flex-1 mb-10">
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <ShieldCheck className="w-5 h-5 text-amber-500" /> Air-Gapped Local Deployment
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <ShieldCheck className="w-5 h-5 text-amber-500" /> Custom Trained ML Models
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                    <ShieldCheck className="w-5 h-5 text-amber-500" /> 24/7 ASI Command Support
                  </div>
                </div>
                <button
                  onClick={() => router.push('/pricing')}
                  className="w-full py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-black hover:bg-white/10 transition-all transform active:scale-95"
                >
                  REQUEST HANDSHAKE
                </button>
              </motion.div>
            </div>

            <div className="mt-20 overflow-hidden relative border-t border-white/5 py-10">
              <div className="flex animate-marquee whitespace-nowrap gap-12 items-center opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                {['DELL', 'NVIDIA', 'MICROSOFT', 'GOOGLE', 'STRIPE', 'AWS', 'DELL', 'NVIDIA', 'MICROSOFT', 'GOOGLE', 'STRIPE', 'AWS'].map((logo, idx) => (
                  <span key={idx} className="text-3xl font-black text-white tracking-widest px-8">{logo}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMMAND TERMINAL FINAL CTA */}
        <section className="relative z-10 py-32 border-t border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-violet-600/5 blur-[120px] rounded-full translate-y-1/2" />
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              className="p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-black border border-white/10 shadow-2xl"
            >
              <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-8">
                <Cpu className="w-12 h-12 text-violet-500 animate-spin-slow" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                INITIATE THE Swarm.
              </h2>
              <p className="text-white/40 mb-12 text-xl max-w-2xl mx-auto">
                Stop managing tools. Start leading an autonomous empire. Deployment takes 45 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => router.push('/onboarding')}
                  className="px-12 py-6 text-lg font-black rounded-3xl bg-white text-black hover:bg-violet-500 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  START GLOBAL MISSION
                </button>
                <button
                  onClick={() => router.push('/tools')}
                  className="px-12 py-6 text-lg font-black rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                >
                  VIEW TECHNICAL STACK
                </button>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-2xl font-black text-white">1.2s</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">LATENCY CORE</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">99.9%</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">UPTIME RECORD</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">256-bit</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">ENCRYPTION</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="DigitalMEng Logo"
                  width={150}
                  height={60}
                  className="object-contain"
                />
                <span className="text-lg font-bold">
                  Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">MEng</span>
                </span>
              </div>
              <p className="text-sm text-white/50 mb-4">
                AI-powered marketing automation for global businesses.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link></li>
                <li><Link href="/global-portal" className="hover:text-white transition-colors">Global Portal</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link href="/affiliate-program" className="hover:text-white transition-colors flex items-center gap-1"><Gift className="w-4 h-4" /> Affiliate Program</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@digitalmeng.com</li>
                <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Live Chat</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-white/30 text-sm pt-8 border-t border-white/5">
            © 2026 DigitalMEng • The Artificial Special Intelligence Digital Marketing Pioneer
          </div>
        </div>
      </footer>
    </div>
  );
}
