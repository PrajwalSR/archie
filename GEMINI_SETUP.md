# 🌟 Setting Up Google Gemini (FREE)

Gemini is now the **recommended AI provider** for Archie because it's completely FREE with your $300 Google Cloud credits!

## Step 1: Get Your Google API Key

### Option A: Quick Setup (Google AI Studio)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select **"Create API key in new project"** or use existing project
5. Copy your API key (starts with `AIza...`)

### Option B: Google Cloud Console (If you want to use your $300 credits)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Generative Language API**:
   - Go to APIs & Services > Library
   - Search for "Generative Language API"
   - Click Enable
4. Create credentials:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## Step 2: Add to Your .env File

```bash
# Open or create .env file
cp .env.example .env

# Add your Gemini API key
GOOGLE_API_KEY=AIzaYourApiKeyHere
```

## Step 3: Test It!

```bash
npm start
```

You should see:
```
🧠 AI Providers:
   ✅ Gemini (configured)
   💡 Mode: Gemini only
```

## What Models Are Available?

Archie uses **Gemini 1.5 Pro** by default (best quality). You can change it in `.env`:

```bash
# Recommended (default)
GEMINI_MODEL=gemini-1.5-pro

# Faster, lower cost
GEMINI_MODEL=gemini-1.5-flash

# Experimental (latest features)
GEMINI_MODEL=gemini-2.0-flash-exp
```

## Pricing & Quotas

### With Google AI Studio (Free Tier)
- **Free quota:** 15 requests per minute, 1,500 requests per day
- Perfect for personal projects and testing!

### With Google Cloud ($300 Credits)
- Much higher quotas
- **Gemini 1.5 Pro:**
  - Input: $0.00125 per 1K characters
  - Output: $0.005 per 1K characters
- Your $300 credit covers **thousands** of architecture generations!

## Troubleshooting

### Error: "API key not valid"
- Make sure you copied the entire key (starts with `AIza`)
- Check for extra spaces or quotes in your `.env` file

### Error: "Quota exceeded"
- Free tier: Wait a minute (15 requests/min limit)
- Or: Use Google Cloud credits for higher quota

### Error: "API not enabled"
- Go to Google Cloud Console
- Enable the "Generative Language API"

## Why Gemini?

✅ **FREE** with Google Cloud credits ($300!)
✅ **Excellent quality** - comparable to GPT-4 and Claude
✅ **Large context window** - 1M tokens for Gemini 1.5 Pro
✅ **Fast** - Quick response times
✅ **JSON mode** - Native structured output support

## Next Steps

Once Gemini is working, you can:

1. **Add more providers** for parallel comparison:
   ```bash
   GOOGLE_API_KEY=your-gemini-key
   OPENAI_API_KEY=your-openai-key
   ANTHROPIC_API_KEY=your-claude-key
   ```

2. **Generate your first architecture:**
   - Go to http://localhost:3000
   - Describe your product idea
   - Get a complete architecture blueprint in 20 seconds!

---

**Need help?** Check [README.md](README.md) or open an issue on GitHub.
