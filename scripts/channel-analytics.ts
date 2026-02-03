import { createYouTubeClient } from '../src/lib/platforms/youtube';
import dotenv from 'dotenv';

dotenv.config();

async function getChannelAnalytics() {
    console.log('📊 FETCHING DIGITALMENG YOUTUBE ANALYTICS...');

    const config = {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        accessToken: process.env.YOUTUBE_ACCESS_TOKEN || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    };

    try {
        // 1. Get Channel Stats
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${config.channelId}&key=${config.apiKey}`;
        const channelResp = await fetch(channelUrl, {
            headers: { Authorization: `Bearer ${config.accessToken}` }
        });
        const channelData = await channelResp.json();

        if (!channelData.items || channelData.items.length === 0) {
            console.error('❌ Channel not found!');
            return;
        }

        const channel = channelData.items[0];
        console.log(`\n📺 Channel: ${channel.snippet.title}`);
        console.log(`📈 Total Subscribers: ${channel.statistics.subscriberCount}`);
        console.log(`🎬 Total Videos: ${channel.statistics.videoCount}`);
        console.log(`👁️‍🗨️ Total Channel Views: ${channel.statistics.viewCount}`);

        // 2. Fetch Recent Videos with Stats
        console.log('\n🔍 ANALYZING TOP RECENT VIDEOS...');
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.channelId}&maxResults=50&order=date&type=video&key=${config.apiKey}`;
        const searchResp = await fetch(searchUrl, {
            headers: { Authorization: `Bearer ${config.accessToken}` }
        });
        const searchData = await searchResp.json();

        if (searchData.items && searchData.items.length > 0) {
            const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

            // 3. Get Detailed Stats for these videos
            const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${config.apiKey}`;
            const statsResp = await fetch(statsUrl, {
                headers: { Authorization: `Bearer ${config.accessToken}` }
            });
            const statsData = await statsResp.json();

            let totalRecentViews = 0;
            let totalRecentLikes = 0;

            console.log('\n--- TOP VIDEOS REPORT ---');
            statsData.items.forEach((video: any, i: number) => {
                const views = parseInt(video.statistics.viewCount || '0');
                const likes = parseInt(video.statistics.likeCount || '0');
                const comments = parseInt(video.statistics.commentCount || '0');

                totalRecentViews += views;
                totalRecentLikes += likes;

                console.log(`${i + 1}. ${video.snippet.title}`);
                console.log(`   👁️ Views: ${views} | 👍 Likes: ${likes} | 💬 Comments: ${comments}`);
            });

            console.log('\n--- PERFORMANCE SUMMARY (Last 50 Videos) ---');
            console.log(`🔹 Aggregate Views: ${totalRecentViews}`);
            console.log(`🔹 Aggregate Likes: ${totalRecentLikes}`);
            console.log(`🔹 Avg Views per Video: ${(totalRecentViews / statsData.items.length).toFixed(2)}`);
        } else {
            console.log('No recent videos found to analyze.');
        }

    } catch (err: any) {
        console.error('💥 ANALYTICS CRASH:', err.message);
    }
}

getChannelAnalytics();
