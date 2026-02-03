# DigitalMEng API Provider Guide

This guide lists all supported API providers in DigitalMEng with **FREE tier options** highlighted for testing.

---

## 🧠 AI Text Generation Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **Google Gemini** ⭐ | **60 requests/minute FREE** | General content, multilingual | [ai.google.dev](https://ai.google.dev) |
| **Groq** ⭐ | **Generous free tier, fastest inference** | Quick responses, LLaMA/Mixtral | [console.groq.com](https://console.groq.com) |
| **OpenAI** | $5 free credits for new users | GPT-4, ChatGPT | [platform.openai.com](https://platform.openai.com) |
| **Anthropic Claude** | $5 free credits for new users | Long context, safety | [console.anthropic.com](https://console.anthropic.com) |
| **Together AI** | $25 free credits | Open-source models | [api.together.xyz](https://api.together.xyz) |
| **Ollama** ⭐ | **100% FREE - runs locally** | Privacy, no API costs | [ollama.ai](https://ollama.ai) |
| **OpenRouter** | Some free models | Access 100+ models | [openrouter.ai](https://openrouter.ai) |
| **Cohere** | Free trial with limits | Enterprise NLP | [dashboard.cohere.ai](https://dashboard.cohere.ai) |

### Recommended for Testing: **Google Gemini** or **Groq**
Both offer generous free tiers and excellent quality.

---

## 🎨 AI Image Generation Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **Leonardo.ai** ⭐ | **150 tokens/day FREE** | Marketing images, game assets | [leonardo.ai](https://leonardo.ai) |
| **Stability AI** | 25 credits to start | Stable Diffusion XL/SD3 | [platform.stability.ai](https://platform.stability.ai) |
| **Replicate** | Some free predictions | Open-source models | [replicate.com](https://replicate.com) |
| **OpenAI DALL-E** | Included in OpenAI credits | High-quality images | [platform.openai.com](https://platform.openai.com) |
| **ClipDrop** | Limited free tier | Background removal, cleanup | [clipdrop.co](https://clipdrop.co) |

### Recommended for Testing: **Leonardo.ai**
Daily free tokens perfect for testing image generation.

---

## 🎤 AI Voice & TTS Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **Google Cloud TTS** ⭐ | **4 million characters/month FREE** | Multilingual, WaveNet | [cloud.google.com/text-to-speech](https://cloud.google.com/text-to-speech) |
| **ElevenLabs** | 10,000 characters/month | Voice cloning, premium quality | [elevenlabs.io](https://elevenlabs.io) |
| **PlayHT** | 12,500 words/month | 800+ voices | [play.ht](https://play.ht) |
| **Murf.ai** | 10 minutes/month | Studio-quality | [murf.ai](https://murf.ai) |
| **Azure Speech** | 5 hours audio/month | Neural voices | [Azure Portal](https://portal.azure.com) |
| **OpenAI TTS** | Included in OpenAI credits | Natural voices | [platform.openai.com](https://platform.openai.com) |

### Recommended for Testing: **Google Cloud TTS**
4 million characters/month is extremely generous.

---

## 🎬 AI Video Generation Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **D-ID** | 5 minutes of video | Talking avatars | [studio.d-id.com](https://studio.d-id.com) |
| **Runway** | 125 credits to start | Gen-2 text-to-video | [runway.ml](https://runway.ml) |
| **Pictory** | 3 videos to try | Blog/text to video | [pictory.ai](https://pictory.ai) |
| **HeyGen** | 1 credit (1 min video) | Digital avatars | [heygen.com](https://heygen.com) |
| **Synthesia** | Paid only | Enterprise, 160+ avatars | [synthesia.io](https://synthesia.io) |

### Recommended for Testing: **D-ID** or **Runway**
Both offer reasonable free tiers for testing.

---

## 📱 SMS & Messaging Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **MSG91** ⭐ | **5,000 SMS for testing FREE** | India, great pricing | [msg91.com](https://msg91.com) |
| **Twilio** | $15.50 trial credit | Global, WhatsApp | [twilio.com/console](https://twilio.com/console) |
| **Textlocal** | 10 free SMS | UK/India | [textlocal.com](https://textlocal.com) |
| **Plivo** | Trial credits | Global coverage | [plivo.com/console](https://plivo.com/console) |

### Recommended for Testing: **MSG91** (India) or **Twilio** (Global)

---

## 📧 Email Delivery Providers

| Provider | Free Tier | Best For | Get API Key |
|----------|-----------|----------|-------------|
| **SendGrid** ⭐ | **100 emails/day FOREVER** | Transactional, marketing | [app.sendgrid.com](https://app.sendgrid.com) |
| **Resend** ⭐ | **3,000 emails/month, 100/day** | Modern API, React emails | [resend.com](https://resend.com) |
| **Mailgun** | 5,000 emails for 3 months | Transactional | [mailgun.com](https://mailgun.com) |
| **Postmark** | 100 emails/month | Fast delivery | [postmarkapp.com](https://postmarkapp.com) |
| **Amazon SES** | 62,000/month from EC2 | Scale, cost-effective | [aws.amazon.com/ses](https://aws.amazon.com/ses) |

### Recommended for Testing: **SendGrid** or **Resend**
Both have generous permanent free tiers.

---

## 🚀 Quick Start: Best FREE Providers Stack

For testing DigitalMEng with zero cost, use this stack:

| Category | Provider | Why |
|----------|----------|-----|
| **AI Text** | Google Gemini or Groq | 60 req/min or unlimited free |
| **AI Images** | Leonardo.ai | 150 tokens/day |
| **AI Voice** | Google Cloud TTS | 4M chars/month |
| **AI Video** | D-ID | 5 min free |
| **SMS** | MSG91 | 5,000 free SMS |
| **Email** | SendGrid/Resend | 100/day forever |

---

## 🔧 Configuration

### In Dashboard:
1. Go to **Settings** → **AI Providers**
2. Select your preferred provider for each category
3. Enter your API credentials
4. Click **Test** to verify connection
5. **Save All Provider Settings**

### Environment Variables (for deployment):
```env
# AI Text
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GEMINI_API_KEY=AIza...
GROQ_API_KEY=gsk_...

# AI Image
STABILITY_API_KEY=sk-...
LEONARDO_API_KEY=...

# AI Voice
ELEVENLABS_API_KEY=...
GOOGLE_CLOUD_TTS_KEY=...

# AI Video
DID_API_KEY=...
HEYGEN_API_KEY=...

# SMS
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
MSG91_AUTH_KEY=...

# Email
SENDGRID_API_KEY=SG...
RESEND_API_KEY=re_...
```

---

## 💡 Tips

1. **Start with free tiers** to test the workflow
2. **Use Groq for development** - fastest inference, free
3. **Google Gemini** is excellent for multilingual content (20+ languages)
4. **Ollama** is perfect if you want to run AI locally with no API costs
5. **Mix providers** - use different providers for different tasks based on your needs

---

## 🆘 Need Help?

- Check provider documentation links above
- Most providers have excellent getting-started guides
- API keys are typically found in dashboard/settings/API sections

Happy marketing! 🚀
