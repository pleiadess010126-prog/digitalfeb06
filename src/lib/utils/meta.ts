import { config } from '../config';

/**
 * Metadata Utility for DigitalMEng
 * Closes the gap between "technical content" and "marketing excellence"
 */
export const MetaUtil = {
    /**
     * Generates a rich marketing description with features and hashtags
     */
    generateDescription(baseText: string, customHashtags: string[] = []): string {
        const features = [
            '✅ Autonomous AI Agents (SEO, Social, Supervisor)',
            '✅ Multi-tenant SaaS Architecture',
            '✅ 20+ Language Market Bridge',
            '✅ Real-time Risk Monitoring',
            '✅ Automated Content Distribution'
        ];

        const allHashtags = Array.from(new Set([
            ...config.marketing.hashtags,
            ...customHashtags
        ])).map(h => `#${h}`).join(' ');

        return `${baseText}\n\n🔥 KEY FEATURES:\n${features.join('\n')}\n\nScale your brand across the globe while you sleep.\n\n🌐 Visit: ${config.marketing.url}\n\n${allHashtags}`;
    },

    /**
     * Ensures titles are optimized for platforms (e.g. adding #Shorts for YouTube)
     */
    optimizeTitle(title: string, platform: 'youtube' | 'wordpress' | 'instagram'): string {
        let finalTitle = title;
        if (platform === 'youtube' && !finalTitle.includes('#Shorts')) {
            finalTitle = `${finalTitle} 🚀 #Shorts`;
        }
        return finalTitle;
    }
};
