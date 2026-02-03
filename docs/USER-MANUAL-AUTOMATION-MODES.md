# 📚 DigitalMEng User Manual: Automation Modes

## Complete Guide to Manual, Approval, and Autopilot Modes

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [The Three Modes Explained](#the-three-modes-explained)
3. [Manual Mode - Complete Control](#manual-mode---complete-control)
4. [Approval Mode - Human-in-the-Loop](#approval-mode---human-in-the-loop)
5. [Autopilot Mode - Full Automation](#autopilot-mode---full-automation)
6. [Choosing the Right Mode](#choosing-the-right-mode)
7. [Configuration Guide](#configuration-guide)
8. [Best Practices](#best-practices)
9. [FAQ](#faq)

---

## 🎯 Overview

DigitalMEng offers **three distinct automation levels** to match your workflow preferences:

| Mode | Control Level | Human Involvement | Speed | Best For |
|------|--------------|-------------------|-------|----------|
| **Manual** | 100% You | Every step | Slowest | Quality-focused teams |
| **Approval** | AI + You | Review & Approve | Balanced | Most businesses |
| **Autopilot** | 100% AI | Minimal/None | Fastest | Scale & Volume |

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATION SPECTRUM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   🔧 MANUAL          ⚖️ APPROVAL          🚀 AUTOPILOT          │
│   ◀──────────────────────────────────────────────────────────▶  │
│                                                                  │
│   Full Control ←─────── Balanced ─────────→ Full Automation     │
│   You do everything    AI assists,         AI handles           │
│                        you approve         everything           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 The Three Modes Explained

### Quick Comparison

| Feature | Manual | Approval | Autopilot |
|---------|--------|----------|-----------|
| **Content Generation** | You write | AI generates | AI generates |
| **Content Review** | N/A | You review | AI reviews |
| **Scheduling** | You schedule | AI suggests, you approve | AI auto-schedules |
| **Publishing** | You click publish | You approve, AI publishes | AI auto-publishes |
| **Video Creation** | You create | AI creates, you review | AI handles all |
| **Error Handling** | You fix | AI suggests, you approve | AI self-heals |
| **Notifications** | N/A | All actions | Critical only |

---

## 🔧 Manual Mode - Complete Control

### What is Manual Mode?

**Manual Mode** gives you complete control over every aspect of your content marketing. The AI provides tools and suggestions, but YOU make every decision and take every action.

### When to Use Manual Mode

✅ **Perfect for:**
- New businesses learning the platform
- Highly regulated industries (legal, medical, finance)
- Premium brands requiring strict quality control
- Small teams with time to dedicate
- Content that requires expert human knowledge
- Sensitive topics requiring human judgment

❌ **Not recommended for:**
- High-volume content needs
- Resource-constrained teams
- Rapid scaling requirements

### How Manual Mode Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    MANUAL MODE WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [You] ──→ [Research] ──→ [Write] ──→ [Edit] ──→ [Publish]    │
│     │           │            │           │            │         │
│     ▼           ▼            ▼           ▼            ▼         │
│   Topics    Keywords     Content      Review      Schedule      │
│   Ideas     Analysis     Creation     Polish      Platform      │
│                                                                  │
│        ⚡ AI ASSISTS AT EACH STEP (BUT YOU DECIDE) ⚡            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Guide: Manual Mode

#### Step 1: Access Content Creation
1. Go to **Dashboard** → **Content** tab
2. Click **"+ Create Content"** button
3. Select content type (Blog, Social Post, Video Script, etc.)

#### Step 2: Research & Planning
1. **Topic Research Panel:**
   - View trending topics in your industry
   - See keyword suggestions with search volume
   - Review competitor content gaps
   
2. **Manual Keyword Selection:**
   - Choose primary keyword manually
   - Add secondary keywords
   - Set target audience

#### Step 3: Write Your Content
1. **Use the Editor:**
   - Rich text editor with formatting tools
   - AI writing suggestions (accept/reject each one)
   - Real-time SEO scoring
   - Word count and readability metrics

2. **AI Assistance (Optional):**
   - Click "✨ AI Suggest" for phrase suggestions
   - Use "Expand" to get AI paragraph ideas
   - "Improve" button for style suggestions
   - YOU decide what to keep

#### Step 4: Add Media
1. **Manual Image Upload:**
   - Upload your own images
   - Or use AI image generation (still requires your approval)
   - Crop, resize, and position manually

2. **For Video Content:**
   - Upload your video files
   - Or use AI video generator (you review output)
   - Add captions/subtitles manually

#### Step 5: SEO Optimization
1. **Review SEO Panel:**
   - Check SEO score (aim for 80+)
   - Manually edit meta title
   - Write meta description
   - Verify keyword placement
   - Check heading structure

2. **GEO Score (Generative Engine Optimization):**
   - Review AI-discoverability metrics
   - Manually adjust for AI search engines

#### Step 6: Schedule & Publish
1. **Manual Scheduling:**
   - Choose exact date and time
   - Select target platforms manually
   - Review preview on each platform

2. **Publish:**
   - Click "Publish" for immediate posting
   - Or "Schedule" for future posting
   - Confirm before each action

### Manual Mode Settings

```typescript
{
  automationMode: 'manual',
  autoGenerateContent: false,      // AI does NOT auto-generate
  autoGenerateVideos: false,       // AI does NOT auto-create videos
  autoSchedule: false,             // You schedule everything
  autoPublish: false,              // You click publish every time
  contentReviewRequired: true,     // Always review
  videoReviewRequired: true,       // Always review videos
  notifyOnGeneration: false,       // N/A - you generate
  notifyOnPublish: true,           // Confirm your actions
}
```

### AI Tools Available in Manual Mode

| Tool | Description | You Control |
|------|-------------|-------------|
| **Topic Suggestions** | AI suggests trending topics | Accept/Reject each |
| **Keyword Research** | Search volume & competition | Pick manually |
| **Writing Assistant** | Phrase suggestions | Accept each suggestion |
| **SEO Analyzer** | Real-time scoring | Implement changes yourself |
| **Image Generator** | Create images from prompts | Approve/regenerate |
| **Grammar Check** | Spelling & grammar | Accept each fix |

---

## ⚖️ Approval Mode - Human-in-the-Loop

### What is Approval Mode?

**Approval Mode** (also called "Human-in-the-Loop") is the **recommended default** for most businesses. The AI does the heavy lifting—generating content, creating videos, scheduling posts—but NOTHING publishes until you approve it.

### When to Use Approval Mode

✅ **Perfect for:**
- Most businesses (our recommended default)
- Teams wanting efficiency + quality control
- Brands building trust with AI
- Agencies managing multiple clients
- Content marketing at scale with oversight

❌ **Not recommended for:**
- Ultra-high volume (100+ posts/day)
- When you want zero involvement

### How Approval Mode Works

```
┌─────────────────────────────────────────────────────────────────┐
│                   APPROVAL MODE WORKFLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [AI] ──→ [Generate] ──→ [Queue] ──→ [YOU REVIEW] ──→ [Publish]│
│    │           │            │              │              │      │
│    ▼           ▼            ▼              ▼              ▼      │
│  Roadmap    Content      Pending      ✓ Approve       Posted    │
│  Planning   Creation     Review       ✗ Reject        Live!     │
│                          ✐ Edit                                  │
│                                                                  │
│         🔔 NOTIFICATIONS AT EVERY STAGE 🔔                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Guide: Approval Mode

#### Step 1: Configure Approval Mode
1. Go to **Dashboard** → **Automation** tab
2. Select **"Approval Mode"** (Human-in-the-Loop)
3. Configure your preferences:
   - Content frequency (Low/Medium/High)
   - Target platforms
   - Topic pillars
   - Brand guidelines

#### Step 2: AI Generates Content Automatically
The AI will:
- Monitor your topic pillars
- Track trending topics in your industry
- Generate content based on your roadmap
- Create blog posts, social content, video scripts
- Optimize for SEO and GEO scores

**You don't need to do anything for this step!**

#### Step 3: Receive Notifications
When content is ready:
- 📧 **Email notification**: "3 new pieces ready for review"
- 🔔 **Dashboard notification**: Badge shows pending count
- 📱 **Push notification** (if enabled): Real-time alerts

#### Step 4: Review Pending Content
1. Go to **Dashboard** → **Content** → **"Pending Review"** tab
2. You'll see a list of AI-generated content:

```
┌─────────────────────────────────────────────────────────────────┐
│ 📝 Pending Review (5 items)                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ □ "10 AI Tools Every Marketer Needs in 2026"                    │
│   📊 SEO: 87  ⭐ GEO: 92  📅 Scheduled: Jan 25, 2pm             │
│   [Preview] [Edit] [✓ Approve] [✗ Reject]                       │
│                                                                  │
│ □ "LinkedIn Post: AI Automation Success Story"                  │
│   📊 SEO: 91  ⭐ GEO: 88  📅 Scheduled: Jan 25, 4pm             │
│   [Preview] [Edit] [✓ Approve] [✗ Reject]                       │
│                                                                  │
│ □ "YouTube Short Script: Quick AI Tips"                         │
│   🎬 Video Ready  📅 Scheduled: Jan 26, 10am                    │
│   [Preview Video] [Edit Script] [✓ Approve] [✗ Reject]          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 5: Take Action on Each Item

**Option A: ✓ Approve**
- Click "Approve" to confirm
- Content moves to "Scheduled"
- Will auto-publish at scheduled time
- No further action needed

**Option B: ✐ Edit & Approve**
- Click "Edit" to open editor
- Make your changes
- Click "Save & Approve"
- Modified content is scheduled

**Option C: ✗ Reject**
- Click "Reject"
- Optionally provide feedback
- AI learns from rejection
- Generates replacement content

**Option D: Bulk Actions**
- Select multiple items
- "Approve All" for batch approval
- "Reject All" to clear queue

#### Step 6: AI Publishes Approved Content
Once approved:
- AI publishes at optimal time
- Posts to selected platforms
- Sends confirmation notification
- Tracks performance metrics

### Approval Mode Settings

```typescript
{
  automationMode: 'approval',
  autoGenerateContent: true,       // ✅ AI auto-generates content
  autoGenerateVideos: true,        // ✅ AI auto-creates videos
  autoSchedule: true,              // ✅ AI picks optimal times
  autoPublish: false,              // ❌ Requires YOUR approval
  contentReviewRequired: true,     // ✅ Must review before publish
  videoReviewRequired: true,       // ✅ Must review videos
  notifyOnGeneration: true,        // ✅ Alert when content ready
  notifyOnPublish: true,           // ✅ Confirm when published
}
```

### Approval Queue Features

| Feature | Description |
|---------|-------------|
| **Priority Queue** | High-impact content appears first |
| **Preview Mode** | See exactly how it'll appear on each platform |
| **Inline Editing** | Quick edits without leaving queue |
| **AI Reasoning** | See why AI created this content |
| **Performance Prediction** | Estimated engagement score |
| **One-Click Approve** | Fast approval for trusted content |
| **Bulk Operations** | Handle multiple items at once |
| **Rejection Feedback** | Train AI with your preferences |

### Notification Options in Approval Mode

| Notification | Description | Default |
|--------------|-------------|---------|
| **Content Ready** | New items in review queue | ✅ On |
| **Urgent Review** | Time-sensitive content | ✅ On |
| **Published** | Content went live | ✅ On |
| **Performance** | Daily/weekly summaries | ✅ On |
| **Errors** | Publishing issues | ✅ On |

---

## 🚀 Autopilot Mode - Full Automation

### What is Autopilot Mode?

**Autopilot Mode** (also called "Full Auto" or "Set It and Forget It") gives the AI complete control. The system generates, schedules, and publishes content without human intervention. The AI also self-monitors, self-heals from errors, and optimizes continuously.

### ⚠️ Important Warnings

```
╔══════════════════════════════════════════════════════════════════╗
║  ⚠️  AUTOPILOT MODE - PLEASE READ CAREFULLY  ⚠️                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Autopilot Mode means AI publishes WITHOUT your approval!       ║
║                                                                  ║
║  Before enabling:                                                ║
║  • Train the AI with your brand voice (run Approval first)      ║
║  • Set strict brand guidelines                                   ║
║  • Configure content guardrails                                  ║
║  • Set up content quality thresholds                            ║
║  • Have a human spot-check regularly                            ║
║                                                                  ║
║  The AI is powerful but not perfect. Use responsibly.           ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### When to Use Autopilot Mode

✅ **Perfect for:**
- High-volume content operations (50+ posts/week)
- Established brands with clear guidelines
- Teams comfortable with AI quality
- 24/7 global publishing needs
- Scaling rapidly without hiring

❌ **Not recommended for:**
- New accounts (train AI first!)
- Highly regulated industries
- Sensitive content topics
- Brands requiring perfect consistency
- First-time DigitalMEng users

### How Autopilot Mode Works

```
┌─────────────────────────────────────────────────────────────────┐
│                   AUTOPILOT MODE WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐                                                    │
│   │   AI    │                                                    │
│   │ BRAIN   │───┬──→ Generate ──→ Quality Check ──→ Publish     │
│   └────┬────┘   │                       │             │          │
│        │        │                       ▼             ▼          │
│        ▼        │                   Pass? ──Yes──→ Live!        │
│   Plan Week     │                       │                        │
│   Strategy      │                       No                       │
│   Optimize      │                       ▼                        │
│        │        │               Self-Heal & Retry               │
│        │        │                       │                        │
│        └────────┴───────────────────────┘                        │
│                                                                  │
│              🔄 CONTINUOUS 24/7 LOOP 🔄                          │
│                                                                  │
│   📊 Analytics ──→ Optimize ──→ Improve ──→ Report              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Guide: Autopilot Mode

#### Step 1: Prerequisites (Important!)

Before enabling Autopilot:

1. **Run in Approval Mode for 2-4 weeks**
   - AI learns your preferences from approvals/rejections
   - Builds understanding of your brand voice
   - Identifies content types that perform

2. **Configure Brand Guidelines**
   - Go to **Settings** → **Brand Voice**
   - Upload brand style guide
   - Set tone preferences
   - Define do's and don'ts

3. **Set Quality Thresholds**
   ```
   Minimum SEO Score: 80+
   Minimum GEO Score: 75+
   Minimum Readability: Grade 8
   Maximum Keyword Density: 2.5%
   ```

4. **Define Content Guardrails**
   - Topics to NEVER discuss
   - Competitor mentions policy
   - Controversial topic handling
   - Legal disclaimers (if needed)

#### Step 2: Enable Autopilot Mode
1. Go to **Dashboard** → **Automation** tab
2. Click **"Autopilot Mode"** card
3. Review the warning dialog
4. Toggle **"Enable Full Automation"**
5. Confirm: "I understand AI will publish automatically"

#### Step 3: Configure Autopilot Settings

**Content Velocity:**
| Setting | Posts/Week | Best For |
|---------|------------|----------|
| 🐢 Low | 3 posts | Niche brands, high-quality focus |
| 🚗 Medium | 7 posts | Most businesses (1/day) |
| 🚀 High | 14+ posts | High-volume, multiple platforms |

**Platform Selection:**
- ☑️ WordPress Blog
- ☑️ LinkedIn
- ☑️ Twitter/X
- ☑️ Facebook
- ☑️ Instagram
- ☑️ YouTube Shorts
- ☑️ TikTok

**Topic Pillars:**
Define 3-7 main topics the AI should focus on:
```
1. AI & Automation (Primary)
2. Digital Marketing Tips
3. SaaS Business Growth
4. Productivity Hacks
5. Industry News & Trends
```

#### Step 4: Set Safety Controls

**Quality Gates:**
- Min SEO score: [80] (content below this is rejected)
- Min GEO score: [75] (ensures AI-search optimization)
- Max publishing frequency: [3 per day] (prevents spam)

**Emergency Stop:**
- Quick toggle at top of dashboard
- Stops all AI activity immediately
- Use if something goes wrong

**Monitoring:**
- Daily summary email
- Weekly performance report
- Instant alerts for issues

#### Step 5: Let AI Take Over

Once configured:
1. **AI analyzes your roadmap** (90-day content plan)
2. **Identifies content gaps** (what's needed this week)
3. **Generates content** (blog, social, video)
4. **Quality checks itself** (SEO, GEO, readability)
5. **Schedules optimally** (best times per platform)
6. **Publishes automatically** (no human click needed)
7. **Monitors performance** (adjusts strategy)
8. **Self-heals errors** (retries failed posts)

#### Step 6: Monitor (Don't Disappear!)

Even in Autopilot, you should:
- **Check dashboard daily** (2-5 minutes)
- **Review weekly summary** (10 minutes)
- **Spot-check random content** (weekly)
- **Adjust topic pillars** (monthly)
- **Review performance** (monthly)

### Autopilot Mode Settings

```typescript
{
  automationMode: 'full-auto',
  autoGenerateContent: true,       // ✅ AI auto-generates
  autoGenerateVideos: true,        // ✅ AI auto-creates videos
  autoSchedule: true,              // ✅ AI picks optimal times
  autoPublish: true,               // ✅ AI publishes automatically!
  contentReviewRequired: false,    // ❌ No human review needed
  videoReviewRequired: false,      // ❌ No video review needed
  notifyOnGeneration: false,       // ❌ Too many notifications
  notifyOnPublish: false,          // ❌ Would be overwhelming
  // BUT these stay on:
  notifyOnError: true,             // ✅ Alert if something breaks
  notifyWeeklySummary: true,       // ✅ Weekly digest
  emergencyStop: true,             // ✅ Always available
}
```

### AI Self-Healing Features

In Autopilot Mode, the AI handles errors automatically:

| Error | AI Response |
|-------|-------------|
| **Platform API down** | Retry in 15min, then 1hr, then next day |
| **Rate limited** | Slow down, spread posts over time |
| **Content rejected** | Revise and regenerate |
| **Low engagement** | Adjust strategy, try different angle |
| **Trending topic** | Create timely content immediately |
| **Quality below threshold** | Regenerate, don't publish |

### The AI Supervisor Agent

In Autopilot Mode, the **Supervisor Agent** orchestrates everything:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI SUPERVISOR AGENT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   🧠 SUPERVISOR                                                  │
│      │                                                           │
│      ├──→ 📝 SEO Worker     → Blog posts, keyword optimization  │
│      ├──→ 📱 Social Worker  → Social content, platform rules    │
│      ├──→ 🎬 Video Worker   → Video scripts, thumbnail gen      │
│      ├──→ ⚠️ Risk Worker    → Quality check, brand safety       │
│      ├──→ 📊 Analytics Worker → Performance tracking            │
│      └──→ 🌍 GEO Worker     → AI search optimization            │
│                                                                  │
│   All workers report to Supervisor                               │
│   Supervisor makes final decisions                               │
│   Continuous learning loop                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Choosing the Right Mode

### Decision Tree

```
Start Here
    │
    ▼
Are you new to DigitalMEng?
    │
    ├── YES → Start with MANUAL (learn the tools)
    │              │
    │              ▼
    │         After 1 week → Move to APPROVAL
    │
    └── NO → Do you need full control?
                 │
                 ├── YES → Stay in MANUAL
                 │
                 └── NO → Do you want AI assistance?
                               │
                               ├── YES, but want to review → APPROVAL ✓
                               │
                               └── YES, fully automated → Ready for AUTOPILOT?
                                                               │
                                                               ├── Used Approval 2+ weeks? → AUTOPILOT
                                                               │
                                                               └── NO → Use APPROVAL first
```

### Comparison Table

| Factor | Manual | Approval | Autopilot |
|--------|--------|----------|-----------|
| **Time Investment** | 10+ hrs/week | 2-4 hrs/week | 30 min/week |
| **Content Quality** | Highest (you control) | High (you review) | Good (AI controlled) |
| **Content Volume** | Low | Medium-High | Very High |
| **Consistency** | Variable | Consistent | Very Consistent |
| **Risk Level** | Very Low | Low | Medium |
| **Scalability** | Limited | Good | Excellent |
| **Learning Curve** | Highest | Medium | Lowest (after setup) |
| **Cost Efficiency** | Low | High | Highest |
| **Best Plan** | Any | Starter+ | Pro/Enterprise |

### Industry Recommendations

| Industry | Recommended Mode | Notes |
|----------|------------------|-------|
| **Legal** | Manual or Approval | Compliance requirements |
| **Healthcare** | Manual | Medical accuracy critical |
| **Finance** | Approval | Regulatory oversight |
| **SaaS/Tech** | Approval or Autopilot | High volume, fast-paced |
| **E-commerce** | Autopilot | Product content at scale |
| **Agency** | Approval | Client review needed |
| **Personal Brand** | Approval | Your voice matters |
| **News/Media** | Manual | Breaking news accuracy |
| **Education** | Approval | Quality educational content |

---

## ⚙️ Configuration Guide

### Accessing Automation Settings

1. **Dashboard Path:**
   - Dashboard → Automation Tab
   - Dashboard → Settings → Automation
   
2. **Quick Toggle:**
   - Top right: "⚡ Autopilot: [ON/OFF]"

### Common Configurations

#### Configuration 1: High-Quality Blog Focus
```
Mode: Approval
Frequency: Low (3/week)
Platforms: WordPress only
Review Required: Yes
SEO Threshold: 90+
```

#### Configuration 2: Social Media Manager
```
Mode: Approval
Frequency: High (14+/week)
Platforms: LinkedIn, Twitter, Instagram
Review Required: Yes
Bulk Approve: Enabled
```

#### Configuration 3: Full Scale Operation
```
Mode: Autopilot
Frequency: High
Platforms: All
Review Required: No
Quality Threshold: 80+
Emergency Stop: Always On
Daily Monitoring: Required
```

---

## 💡 Best Practices

### For Manual Mode:
1. ✅ Use AI tools for research and suggestions
2. ✅ Leverage SEO analyzer for optimization
3. ✅ Schedule content in advance
4. ✅ Track which manual tweaks improve performance
5. ❌ Don't ignore AI recommendations completely

### For Approval Mode:
1. ✅ Check review queue daily
2. ✅ Provide feedback when rejecting
3. ✅ Use bulk approve for consistent quality
4. ✅ Trust the AI for routine content
5. ❌ Don't let queue build up (review within 24hrs)

### For Autopilot Mode:
1. ✅ Start with Approval mode for 2-4 weeks
2. ✅ Set strict quality thresholds
3. ✅ Monitor daily (just 5 minutes)
4. ✅ Keep emergency stop accessible
5. ✅ Review weekly performance summaries
6. ❌ Don't set and completely forget
7. ❌ Don't skip the training period

---

## ❓ FAQ

### General Questions

**Q: Can I switch between modes?**
A: Yes! You can switch at any time from Dashboard → Automation. Changes take effect immediately.

**Q: Will I lose content when switching modes?**
A: No. Pending content stays in queue. Scheduled content remains scheduled.

**Q: Which mode is included in my plan?**
A: 
- **Free**: Manual only
- **Starter**: Manual + Approval
- **Pro**: All modes
- **Enterprise**: All modes + Advanced Autopilot

### About Approval Mode

**Q: What happens if I don't review content?**
A: Content stays in the "Pending" queue. It won't publish until approved. You'll receive reminder notifications.

**Q: Can I edit AI-generated content?**
A: Yes! Click "Edit" in the review queue, make changes, then "Save & Approve."

**Q: What if I reject content?**
A: AI learns from rejections. You can provide feedback to improve future generation.

### About Autopilot Mode

**Q: What if AI publishes something wrong?**
A: Use Emergency Stop to halt all publishing. Delete the problematic post. Review your guardrails.

**Q: How do I train the AI for my brand?**
A: Use Approval mode for 2-4 weeks. Your approvals/rejections train the AI.

**Q: Can I set times when Autopilot is active?**
A: Yes! Configure "Active Hours" in Autopilot settings (e.g., publish only 9am-5pm EST).

**Q: What's the "self-healing" feature?**
A: If publishing fails (API error, etc.), AI automatically retries with exponential backoff.

---

## 📞 Need Help?

- **Dashboard**: Click "?" icon for contextual help
- **Chat**: Use Nandu AI assistant (bottom right)
- **Email**: support@digitalmeng.com
- **Docs**: docs.digitalmeng.com

---

## 📋 Quick Reference Card

```
╔════════════════════════════════════════════════════════════════╗
║                    MODE QUICK REFERENCE                         ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  🔧 MANUAL                                                      ║
║     • You do everything                                         ║
║     • AI provides tools & suggestions                           ║
║     • Maximum control, maximum time                             ║
║                                                                 ║
║  ⚖️ APPROVAL (Recommended!)                                     ║
║     • AI generates content                                      ║
║     • YOU approve before publishing                             ║
║     • Best balance of efficiency + control                      ║
║                                                                 ║
║  🚀 AUTOPILOT                                                   ║
║     • AI handles everything                                     ║
║     • Publishes without approval                                ║
║     • Maximum efficiency, requires trust                        ║
║     • Train AI with Approval mode first!                        ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Author**: DigitalMEng Team
