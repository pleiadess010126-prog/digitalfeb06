'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalPortalPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('globalPortalUser');

        if (storedUser) {
            // Redirect to dashboard if logged in
            router.push('/global-portal/dashboard');
        } else {
            // Redirect to login if not logged in
            router.push('/global-portal/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Loading Global Portal...</p>
            </div>
        </div>
    );
}
