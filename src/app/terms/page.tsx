
import React from 'react';

export const metadata = {
    title: 'Terms of Service - DigitalMEng',
    description: 'Terms of Service for DigitalMEng services.',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: January 26, 2026</p>

                <div className="space-y-6 text-slate-700">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using our website and services (collectively, the "Services") provided by DigitalMEng, you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Description of Service</h2>
                        <p>
                            DigitalMEng provides an AI-powered autonomous marketing engine designed to help businesses automate content creation and publishing across various digital platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. User Accounts</h2>
                        <p>
                            To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials
                            and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Content and Conduct</h2>
                        <p>
                            You retain all rights to the content you create or publish using our Services. However, you grant DigitalMEng a license to process and display that content as necessary to provide the Services.
                            You agree not to use the Service to create or publish content that is illegal, harmful, threatening, abusive, harassment, defamatory, or otherwise objectionable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of DigitalMEng and its licensors.
                            The Service is protected by copyright, trademark, and other laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Termination</h2>
                        <p>
                            We may terminate or suspend your account access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Limitation of Liability</h2>
                        <p>
                            In no event shall DigitalMEng, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: support@digitalmeng.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
