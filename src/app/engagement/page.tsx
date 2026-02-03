'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EngagementRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard?tab=engagement');
    }, [router]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium">Redirecting to Engagement Hub...</p>
            </div>
        </div>
    );
}
