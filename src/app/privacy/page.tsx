
import React from 'react';

export const metadata = {
    title: 'Privacy Policy - DigitalMEng',
    description: 'Privacy Policy for DigitalMEng services.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: January 26, 2026</p>

                <div className="space-y-6 text-slate-700">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Introduction</h2>
                        <p>
                            Welcome to DigitalMEng ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from)
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Data We Collect</h2>
                        <p className="mb-2">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Social Media Integration</h2>
                        <p>
                            Our Service allows you to link your account with third-party social media accounts (e.g., X/Twitter, LinkedIn, YouTube).
                            If you choose to link your account, we may collect certain information from these third parties, such as your profile information and email address,
                            in accordance with your privacy settings on those platforms. We use this data only to provide the publishing and analytics features of our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: support@digitalmeng.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
