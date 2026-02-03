// =================================================================
// API PROVIDER CONFIGURATION
// Multi-provider support with free tier options
// =================================================================

export type ProviderCategory =
    | 'ai_text'
    | 'ai_image'
    | 'ai_voice'
    | 'ai_video'
    | 'sms'
    | 'email'
    | 'storage'
    | 'analytics';

export interface ProviderOption {
    id: string;
    name: string;
    logo?: string;
    description: string;
    website: string;
    docsUrl: string;
    category: ProviderCategory;
    pricing: 'free' | 'freemium' | 'paid';
    freeTier?: string;
    requiredFields: ProviderField[];
    features: string[];
    recommended?: boolean;
    demoAvailable?: boolean;
}

export interface ProviderField {
    key: string;
    label: string;
    type: 'text' | 'password' | 'url' | 'textarea';
    placeholder: string;
    helpText?: string;
    required: boolean;
}

// =================================================================
// AI TEXT GENERATION PROVIDERS
// =================================================================
export const AI_TEXT_PROVIDERS: ProviderOption[] = [
    {
        id: 'openai',
        name: 'OpenAI',
        description: 'GPT-4, GPT-3.5 Turbo - Industry-leading AI models',
        website: 'https://openai.com',
        docsUrl: 'https://platform.openai.com/docs',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: '$5 free credits for new accounts',
        recommended: true,
        features: ['GPT-4', 'GPT-3.5 Turbo', 'Chat completions', 'Function calling'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_OPENAI_KEY',
                helpText: 'Get from platform.openai.com',
                required: true,
            },
        ],
    },
    {
        id: 'anthropic',
        name: 'Anthropic Claude',
        description: 'Claude 3 Opus, Sonnet, Haiku - Safer, more helpful AI',
        website: 'https://anthropic.com',
        docsUrl: 'https://docs.anthropic.com',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: '$5 free credits for new accounts',
        features: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku', '200K context'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_CLAUDE_KEY',
                helpText: 'Get from console.anthropic.com',
                required: true,
            },
        ],
    },
    {
        id: 'google_gemini',
        name: 'Google Gemini',
        description: 'Gemini Pro, Gemini Ultra - Google\'s multimodal AI',
        website: 'https://ai.google.dev',
        docsUrl: 'https://ai.google.dev/docs',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: 'FREE: 60 requests/minute with Gemini Pro',
        recommended: true,
        demoAvailable: true,
        features: ['Gemini Pro', 'Gemini Pro Vision', 'Multimodal', '32K context'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_GOOGLE_KEY',
                helpText: 'Get FREE key from ai.google.dev',
                required: true,
            },
        ],
    },
    {
        id: 'groq',
        name: 'Groq',
        description: 'Ultra-fast inference with LLaMA, Mixtral models',
        website: 'https://groq.com',
        docsUrl: 'https://console.groq.com/docs',
        category: 'ai_text',
        pricing: 'free',
        freeTier: 'FREE: Generous free tier, very fast inference',
        demoAvailable: true,
        features: ['LLaMA 3', 'Mixtral 8x7B', 'Fastest inference', 'OpenAI compatible'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_GROQ_KEY',
                helpText: 'Get FREE key from console.groq.com',
                required: true,
            },
        ],
    },
    {
        id: 'together_ai',
        name: 'Together AI',
        description: 'Open-source models - LLaMA, Mistral, and more',
        website: 'https://together.ai',
        docsUrl: 'https://docs.together.ai',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: 'FREE: $25 credits for new accounts',
        features: ['LLaMA 3 70B', 'Mistral', 'Qwen', 'CodeLlama'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from api.together.xyz',
                required: true,
            },
        ],
    },
    {
        id: 'ollama',
        name: 'Ollama (Self-Hosted)',
        description: 'Run AI models locally - Free, private, no API costs',
        website: 'https://ollama.ai',
        docsUrl: 'https://ollama.ai/docs',
        category: 'ai_text',
        pricing: 'free',
        freeTier: 'FREE: 100% free, runs locally',
        demoAvailable: true,
        features: ['LLaMA 3', 'Mistral', 'Phi', 'Local/Private', 'No API costs'],
        requiredFields: [
            {
                key: 'baseUrl',
                label: 'Ollama Server URL',
                type: 'url',
                placeholder: 'http://localhost:11434',
                helpText: 'Your local Ollama server URL',
                required: true,
            },
            {
                key: 'model',
                label: 'Model Name',
                type: 'text',
                placeholder: 'llama3',
                helpText: 'e.g., llama3, mistral, phi',
                required: true,
            },
        ],
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        description: 'Access 100+ models via single API - GPT, Claude, Gemini, and more',
        website: 'https://openrouter.ai',
        docsUrl: 'https://openrouter.ai/docs',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: 'FREE: Some free models available',
        features: ['100+ models', 'Single API', 'Pay per use', 'Model routing'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_OPENROUTER_KEY',
                helpText: 'Get from openrouter.ai',
                required: true,
            },
        ],
    },
    {
        id: 'cohere',
        name: 'Cohere',
        description: 'Enterprise NLP - Command, Embed, Rerank models',
        website: 'https://cohere.ai',
        docsUrl: 'https://docs.cohere.ai',
        category: 'ai_text',
        pricing: 'freemium',
        freeTier: 'FREE: Free trial with rate limits',
        features: ['Command R+', 'Embed', 'Rerank', 'RAG-optimized'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from dashboard.cohere.ai',
                required: true,
            },
        ],
    },
];

// =================================================================
// AI IMAGE GENERATION PROVIDERS
// =================================================================
export const AI_IMAGE_PROVIDERS: ProviderOption[] = [
    {
        id: 'openai_dalle',
        name: 'OpenAI DALL-E',
        description: 'DALL-E 3 - High-quality image generation',
        website: 'https://openai.com',
        docsUrl: 'https://platform.openai.com/docs/guides/images',
        category: 'ai_image',
        pricing: 'paid',
        features: ['DALL-E 3', 'DALL-E 2', 'Image editing', 'Variations'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_OPENAI_KEY',
                helpText: 'Same as OpenAI text API key',
                required: true,
            },
        ],
    },
    {
        id: 'stability_ai',
        name: 'Stability AI',
        description: 'Stable Diffusion XL, SD3 - Open-source image models',
        website: 'https://stability.ai',
        docsUrl: 'https://platform.stability.ai/docs',
        category: 'ai_image',
        pricing: 'freemium',
        freeTier: 'FREE: 25 credits to start',
        features: ['SDXL', 'SD3', 'Image editing', 'Upscaling'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_STABILITY_KEY',
                helpText: 'Get from platform.stability.ai',
                required: true,
            },
        ],
    },
    {
        id: 'replicate',
        name: 'Replicate',
        description: 'Run open-source models in the cloud',
        website: 'https://replicate.com',
        docsUrl: 'https://replicate.com/docs',
        category: 'ai_image',
        pricing: 'freemium',
        freeTier: 'FREE: Some free predictions',
        features: ['SDXL', 'Flux', 'ControlNet', 'Custom models'],
        requiredFields: [
            {
                key: 'apiToken',
                label: 'API Token',
                type: 'password',
                placeholder: 'ENTER_REPLICATE_KEY',
                helpText: 'Get from replicate.com/account',
                required: true,
            },
        ],
    },
    {
        id: 'leonardo_ai',
        name: 'Leonardo.ai',
        description: 'Creative AI for game assets and marketing',
        website: 'https://leonardo.ai',
        docsUrl: 'https://docs.leonardo.ai',
        category: 'ai_image',
        pricing: 'freemium',
        freeTier: 'FREE: 150 tokens/day',
        demoAvailable: true,
        features: ['Custom models', 'Game assets', 'Marketing images', 'AI Canvas'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from leonardo.ai',
                required: true,
            },
        ],
    },
    {
        id: 'clipdrop',
        name: 'ClipDrop (Stability)',
        description: 'Image tools - Background removal, cleanup, upscale',
        website: 'https://clipdrop.co',
        docsUrl: 'https://clipdrop.co/apis/docs',
        category: 'ai_image',
        pricing: 'freemium',
        freeTier: 'FREE: Limited free tier',
        features: ['Background removal', 'Image cleanup', 'Upscaling', 'Text to image'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from clipdrop.co',
                required: true,
            },
        ],
    },
];

// =================================================================
// AI VOICE/TTS PROVIDERS
// =================================================================
export const AI_VOICE_PROVIDERS: ProviderOption[] = [
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        description: 'Premium voice synthesis with voice cloning',
        website: 'https://elevenlabs.io',
        docsUrl: 'https://docs.elevenlabs.io',
        category: 'ai_voice',
        pricing: 'freemium',
        freeTier: 'FREE: 10,000 characters/month',
        recommended: true,
        features: ['Voice cloning', 'Multilingual', 'Emotional control', 'Projects'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from elevenlabs.io/api',
                required: true,
            },
        ],
    },
    {
        id: 'openai_tts',
        name: 'OpenAI TTS',
        description: 'OpenAI Text-to-Speech - Natural voices',
        website: 'https://openai.com',
        docsUrl: 'https://platform.openai.com/docs/guides/text-to-speech',
        category: 'ai_voice',
        pricing: 'paid',
        features: ['6 voices', 'HD quality', 'Fast generation', 'Multiple formats'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_OPENAI_KEY',
                helpText: 'Same as OpenAI text API key',
                required: true,
            },
        ],
    },
    {
        id: 'google_tts',
        name: 'Google Cloud TTS',
        description: 'Google Cloud Text-to-Speech',
        website: 'https://cloud.google.com/text-to-speech',
        docsUrl: 'https://cloud.google.com/text-to-speech/docs',
        category: 'ai_voice',
        pricing: 'freemium',
        freeTier: 'FREE: 4 million characters/month',
        demoAvailable: true,
        features: ['WaveNet', '220+ voices', '40+ languages', 'SSML support'],
        requiredFields: [
            {
                key: 'serviceAccountKey',
                label: 'Service Account JSON',
                type: 'textarea',
                placeholder: '{"type": "service_account", ...}',
                helpText: 'Paste full JSON key file',
                required: true,
            },
        ],
    },
    {
        id: 'azure_tts',
        name: 'Azure Cognitive Speech',
        description: 'Microsoft Azure Speech Services',
        website: 'https://azure.microsoft.com/services/cognitive-services/speech-services/',
        docsUrl: 'https://docs.microsoft.com/azure/cognitive-services/speech-service/',
        category: 'ai_voice',
        pricing: 'freemium',
        freeTier: 'FREE: 5 hours audio/month',
        features: ['Neural voices', 'Custom voice', 'Real-time', 'Batch synthesis'],
        requiredFields: [
            {
                key: 'subscriptionKey',
                label: 'Subscription Key',
                type: 'password',
                placeholder: 'your-subscription-key',
                helpText: 'Get from Azure Portal',
                required: true,
            },
            {
                key: 'region',
                label: 'Region',
                type: 'text',
                placeholder: 'eastus',
                helpText: 'e.g., eastus, westeurope',
                required: true,
            },
        ],
    },
    {
        id: 'playht',
        name: 'PlayHT',
        description: 'AI Voice Generator with voice cloning',
        website: 'https://play.ht',
        docsUrl: 'https://docs.play.ht',
        category: 'ai_voice',
        pricing: 'freemium',
        freeTier: 'FREE: 12,500 words/month',
        features: ['Voice cloning', 'Emotions', '800+ voices', 'API access'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from play.ht/studio/api-access',
                required: true,
            },
            {
                key: 'userId',
                label: 'User ID',
                type: 'text',
                placeholder: 'your-user-id',
                helpText: 'Your PlayHT User ID',
                required: true,
            },
        ],
    },
    {
        id: 'murf',
        name: 'Murf.ai',
        description: 'Studio-quality AI voiceover',
        website: 'https://murf.ai',
        docsUrl: 'https://murf.ai/api',
        category: 'ai_voice',
        pricing: 'freemium',
        freeTier: 'FREE: 10 minutes/month',
        features: ['120+ voices', '20+ languages', 'Voice changer', 'Pitch/speed control'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from murf.ai',
                required: true,
            },
        ],
    },
];

// =================================================================
// AI VIDEO GENERATION PROVIDERS
// =================================================================
export const AI_VIDEO_PROVIDERS: ProviderOption[] = [
    {
        id: 'd-id',
        name: 'D-ID',
        description: 'AI video creation with talking avatars',
        website: 'https://d-id.com',
        docsUrl: 'https://docs.d-id.com',
        category: 'ai_video',
        pricing: 'freemium',
        freeTier: 'FREE: 5 minutes of video',
        recommended: true,
        features: ['Talking avatars', 'Custom photos', 'Multiple languages', 'Emotions'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from studio.d-id.com',
                required: true,
            },
        ],
    },
    {
        id: 'heygen',
        name: 'HeyGen',
        description: 'AI video generation with digital avatars',
        website: 'https://heygen.com',
        docsUrl: 'https://docs.heygen.com',
        category: 'ai_video',
        pricing: 'freemium',
        freeTier: 'FREE: 1 credit (1 min video)',
        features: ['100+ avatars', 'Voice cloning', 'Lip sync', 'Templates'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from heygen.com',
                required: true,
            },
        ],
    },
    {
        id: 'synthesia',
        name: 'Synthesia',
        description: 'Enterprise AI video platform',
        website: 'https://synthesia.io',
        docsUrl: 'https://docs.synthesia.io',
        category: 'ai_video',
        pricing: 'paid',
        features: ['160+ avatars', 'Custom avatars', '120+ languages', 'Enterprise'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Enterprise plan required',
                required: true,
            },
        ],
    },
    {
        id: 'pictory',
        name: 'Pictory',
        description: 'Turn text/blogs into videos automatically',
        website: 'https://pictory.ai',
        docsUrl: 'https://pictory.ai/blog/api',
        category: 'ai_video',
        pricing: 'freemium',
        freeTier: 'FREE: 3 videos to try',
        features: ['Text to video', 'Blog to video', 'Auto-subtitles', 'Stock media'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from pictory.ai',
                required: true,
            },
        ],
    },
    {
        id: 'runway',
        name: 'Runway',
        description: 'Gen-2 AI video generation from text/image',
        website: 'https://runway.ml',
        docsUrl: 'https://docs.runwayml.com',
        category: 'ai_video',
        pricing: 'freemium',
        freeTier: 'FREE: 125 credits to start',
        features: ['Gen-2', 'Text to video', 'Image to video', 'Video editing'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from runway.ml',
                required: true,
            },
        ],
    },
];

// =================================================================
// SMS PROVIDERS
// =================================================================
export const SMS_PROVIDERS: ProviderOption[] = [
    {
        id: 'twilio',
        name: 'Twilio',
        description: 'Industry-leading SMS and messaging platform',
        website: 'https://twilio.com',
        docsUrl: 'https://www.twilio.com/docs/sms',
        category: 'sms',
        pricing: 'freemium',
        freeTier: 'FREE: $15.50 trial credit',
        recommended: true,
        features: ['SMS', 'WhatsApp', 'Voice', 'Verify'],
        requiredFields: [
            {
                key: 'accountSid',
                label: 'Account SID',
                type: 'text',
                placeholder: 'ACxxxxxxxx...',
                helpText: 'Get from twilio.com/console',
                required: true,
            },
            {
                key: 'authToken',
                label: 'Auth Token',
                type: 'password',
                placeholder: 'your-auth-token',
                helpText: 'Keep this secret!',
                required: true,
            },
            {
                key: 'phoneNumber',
                label: 'Twilio Phone Number',
                type: 'text',
                placeholder: '+1234567890',
                helpText: 'Your Twilio phone number',
                required: true,
            },
        ],
    },
    {
        id: 'msg91',
        name: 'MSG91',
        description: 'India-focused SMS gateway with great pricing',
        website: 'https://msg91.com',
        docsUrl: 'https://docs.msg91.com',
        category: 'sms',
        pricing: 'freemium',
        freeTier: 'FREE: 5000 SMS for testing',
        demoAvailable: true,
        features: ['Transactional SMS', 'Promotional SMS', 'OTP', 'Email'],
        requiredFields: [
            {
                key: 'authKey',
                label: 'Auth Key',
                type: 'password',
                placeholder: 'your-auth-key',
                helpText: 'Get from MSG91 dashboard',
                required: true,
            },
            {
                key: 'senderId',
                label: 'Sender ID',
                type: 'text',
                placeholder: 'DMENG',
                helpText: '6-character sender ID',
                required: true,
            },
        ],
    },
    {
        id: 'textlocal',
        name: 'Textlocal',
        description: 'UK/India SMS platform',
        website: 'https://textlocal.com',
        docsUrl: 'https://api.textlocal.in/docs/',
        category: 'sms',
        pricing: 'freemium',
        freeTier: 'FREE: 10 free SMS',
        features: ['Bulk SMS', 'Scheduled SMS', 'Analytics', 'Templates'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'your-api-key',
                helpText: 'Get from textlocal.in',
                required: true,
            },
            {
                key: 'sender',
                label: 'Sender Name',
                type: 'text',
                placeholder: 'TXTLCL',
                helpText: 'Approved sender name',
                required: true,
            },
        ],
    },
    {
        id: 'plivo',
        name: 'Plivo',
        description: 'Cloud communications platform',
        website: 'https://plivo.com',
        docsUrl: 'https://www.plivo.com/docs/sms/',
        category: 'sms',
        pricing: 'freemium',
        freeTier: 'FREE: Trial credits available',
        features: ['SMS', 'MMS', 'Voice', 'Global coverage'],
        requiredFields: [
            {
                key: 'authId',
                label: 'Auth ID',
                type: 'text',
                placeholder: 'your-auth-id',
                helpText: 'Get from plivo.com/console',
                required: true,
            },
            {
                key: 'authToken',
                label: 'Auth Token',
                type: 'password',
                placeholder: 'your-auth-token',
                helpText: 'Keep this secret!',
                required: true,
            },
        ],
    },
];

// =================================================================
// EMAIL PROVIDERS
// =================================================================
export const EMAIL_PROVIDERS: ProviderOption[] = [
    {
        id: 'sendgrid',
        name: 'SendGrid',
        description: 'Twilio SendGrid - Email delivery platform',
        website: 'https://sendgrid.com',
        docsUrl: 'https://docs.sendgrid.com',
        category: 'email',
        pricing: 'freemium',
        freeTier: 'FREE: 100 emails/day forever',
        recommended: true,
        demoAvailable: true,
        features: ['Transactional', 'Marketing', 'Templates', 'Analytics'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_SENDGRID_KEY',
                helpText: 'Get from app.sendgrid.com',
                required: true,
            },
            {
                key: 'fromEmail',
                label: 'From Email',
                type: 'text',
                placeholder: 'hello@yourdomain.com',
                helpText: 'Verified sender email',
                required: true,
            },
        ],
    },
    {
        id: 'resend',
        name: 'Resend',
        description: 'Modern email API for developers',
        website: 'https://resend.com',
        docsUrl: 'https://resend.com/docs',
        category: 'email',
        pricing: 'freemium',
        freeTier: 'FREE: 3,000 emails/month, 100/day',
        demoAvailable: true,
        features: ['React emails', 'Modern API', 'Webhooks', 'Analytics'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'ENTER_RESEND_KEY',
                helpText: 'Get from resend.com/api-keys',
                required: true,
            },
            {
                key: 'fromEmail',
                label: 'From Email',
                type: 'text',
                placeholder: 'hello@yourdomain.com',
                helpText: 'Verified domain email',
                required: true,
            },
        ],
    },
    {
        id: 'mailgun',
        name: 'Mailgun',
        description: 'Powerful transactional email API',
        website: 'https://mailgun.com',
        docsUrl: 'https://documentation.mailgun.com',
        category: 'email',
        pricing: 'freemium',
        freeTier: 'FREE: 5,000 emails for 3 months',
        features: ['Transactional', 'Validation', 'Inbound routing', 'Analytics'],
        requiredFields: [
            {
                key: 'apiKey',
                label: 'API Key',
                type: 'password',
                placeholder: 'key-xxxxxxxx...',
                helpText: 'Get from mailgun.com',
                required: true,
            },
            {
                key: 'domain',
                label: 'Domain',
                type: 'text',
                placeholder: 'mg.yourdomain.com',
                helpText: 'Your Mailgun domain',
                required: true,
            },
        ],
    },
    {
        id: 'postmark',
        name: 'Postmark',
        description: 'Fast, reliable transactional email',
        website: 'https://postmarkapp.com',
        docsUrl: 'https://postmarkapp.com/developer',
        category: 'email',
        pricing: 'freemium',
        freeTier: 'FREE: 100 emails/month',
        features: ['Transactional', 'Templates', 'Webhooks', 'Message streams'],
        requiredFields: [
            {
                key: 'serverToken',
                label: 'Server API Token',
                type: 'password',
                placeholder: 'your-server-token',
                helpText: 'Get from postmarkapp.com',
                required: true,
            },
            {
                key: 'fromEmail',
                label: 'From Email',
                type: 'text',
                placeholder: 'hello@yourdomain.com',
                helpText: 'Verified sender signature',
                required: true,
            },
        ],
    },
    {
        id: 'ses',
        name: 'Amazon SES',
        description: 'AWS Simple Email Service - Cost-effective at scale',
        website: 'https://aws.amazon.com/ses/',
        docsUrl: 'https://docs.aws.amazon.com/ses/',
        category: 'email',
        pricing: 'freemium',
        freeTier: 'FREE: 62,000/month from EC2',
        features: ['Scalable', 'Cost-effective', 'SMTP', 'API'],
        requiredFields: [
            {
                key: 'accessKeyId',
                label: 'AWS Access Key ID',
                type: 'password',
                placeholder: 'ENTER_AWS_KEY',
                helpText: 'IAM user with SES permissions',
                required: true,
            },
            {
                key: 'secretAccessKey',
                label: 'AWS Secret Access Key',
                type: 'password',
                placeholder: 'your-secret-key',
                helpText: 'Keep this very secret!',
                required: true,
            },
            {
                key: 'region',
                label: 'AWS Region',
                type: 'text',
                placeholder: 'us-east-1',
                helpText: 'SES region',
                required: true,
            },
        ],
    },
];

// =================================================================
// GET ALL PROVIDERS BY CATEGORY
// =================================================================
export function getProvidersByCategory(category: ProviderCategory): ProviderOption[] {
    switch (category) {
        case 'ai_text':
            return AI_TEXT_PROVIDERS;
        case 'ai_image':
            return AI_IMAGE_PROVIDERS;
        case 'ai_voice':
            return AI_VOICE_PROVIDERS;
        case 'ai_video':
            return AI_VIDEO_PROVIDERS;
        case 'sms':
            return SMS_PROVIDERS;
        case 'email':
            return EMAIL_PROVIDERS;
        default:
            return [];
    }
}

// =================================================================
// GET FREE/DEMO PROVIDERS
// =================================================================
export function getFreeProviders(): ProviderOption[] {
    return [
        ...AI_TEXT_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
        ...AI_IMAGE_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
        ...AI_VOICE_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
        ...AI_VIDEO_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
        ...SMS_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
        ...EMAIL_PROVIDERS.filter(p => p.pricing === 'free' || p.demoAvailable),
    ];
}

// =================================================================
// PROVIDER CATEGORY LABELS
// =================================================================
export const CATEGORY_LABELS: Record<ProviderCategory, { label: string; icon: string; description: string }> = {
    ai_text: {
        label: 'AI Text Generation',
        icon: '🧠',
        description: 'Generate blog posts, social media content, and marketing copy',
    },
    ai_image: {
        label: 'AI Image Generation',
        icon: '🎨',
        description: 'Create images, graphics, and visual content',
    },
    ai_voice: {
        label: 'AI Voice & TTS',
        icon: '🎤',
        description: 'Generate voiceovers and text-to-speech audio',
    },
    ai_video: {
        label: 'AI Video Generation',
        icon: '🎬',
        description: 'Create videos with AI avatars and animations',
    },
    sms: {
        label: 'SMS & Messaging',
        icon: '📱',
        description: 'Send SMS, WhatsApp, and push notifications',
    },
    email: {
        label: 'Email Delivery',
        icon: '📧',
        description: 'Send transactional and marketing emails',
    },
    storage: {
        label: 'Cloud Storage',
        icon: '☁️',
        description: 'Store and serve media files',
    },
    analytics: {
        label: 'Analytics',
        icon: '📊',
        description: 'Track performance and engagement',
    },
};
