# Archie - Detailed Setup Guide

This guide provides step-by-step instructions for setting up Archie locally and deploying to production.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Getting AI Provider API Keys](#getting-ai-provider-api-keys)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Cloud Deployment](#cloud-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** (for version control)
- At least one AI provider API key

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd archie
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `express` - Web server
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `@anthropic-ai/sdk` - Claude AI
- `openai` - OpenAI GPT
- `@google/generative-ai` - Google Gemini
- `uuid` - Unique conversation IDs

### Step 3: Create Environment File

```bash
cp .env.example .env
```

Or create `.env` manually:

```env
# Server Configuration
PORT=3000

# AI Provider API Keys (at least one required)
GOOGLE_API_KEY=your_google_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Default Models
GEMINI_MODEL=gemini-2.0-flash-exp
CLAUDE_MODEL=claude-sonnet-4-20250514
OPENAI_MODEL=gpt-4-turbo-preview
```

---

## Getting AI Provider API Keys

You need at least ONE of these API keys. We recommend getting all three for maximum flexibility.

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add to `.env` as `GOOGLE_API_KEY`

**Cost:** Free tier with generous limits
**Best for:** Cost-effective iterations

### Anthropic Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or sign in
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy the key and add to `.env` as `ANTHROPIC_API_KEY`

**Cost:** Pay-as-you-go (requires payment method)
**Best for:** Highest quality responses

### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or sign in
3. Navigate to "API Keys"
4. Click "Create new secret key"
5. Copy the key and add to `.env` as `OPENAI_API_KEY`

**Cost:** Pay-as-you-go (requires payment method)
**Best for:** Consistent, reliable results

---

## Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `GOOGLE_API_KEY` | Gemini API key | `AIzaSyC...` |
| `ANTHROPIC_API_KEY` | Claude API key | `sk-ant-...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_MODEL` | Default Gemini model | `gemini-2.0-flash-exp` |
| `CLAUDE_MODEL` | Default Claude model | `claude-sonnet-4-20250514` |
| `OPENAI_MODEL` | Default OpenAI model | `gpt-4-turbo-preview` |

### Complete `.env.example`

```env
# =============================================================================
# ARCHIE - ENVIRONMENT CONFIGURATION
# =============================================================================

# Server Configuration
# Port for the Express server (default: 3000)
PORT=3000

# =============================================================================
# AI PROVIDER API KEYS
# At least ONE is required. Having all three enables quality comparison.
# =============================================================================

# Google Gemini API Key
# Get yours at: https://makersuite.google.com/app/apikey
# Cost: Free tier available
GOOGLE_API_KEY=

# Anthropic Claude API Key
# Get yours at: https://console.anthropic.com/
# Cost: Pay-as-you-go
ANTHROPIC_API_KEY=

# OpenAI API Key
# Get yours at: https://platform.openai.com/api-keys
# Cost: Pay-as-you-go
OPENAI_API_KEY=

# =============================================================================
# OPTIONAL: DEFAULT MODEL SELECTION
# Override these to use different models by default
# =============================================================================

# Gemini Models:
# - gemini-2.0-flash-exp (fastest, recommended)
# - gemini-1.5-pro (most capable)
# - gemini-1.5-flash (balanced)
GEMINI_MODEL=gemini-2.0-flash-exp

# Claude Models:
# - claude-sonnet-4-20250514 (latest, recommended)
# - claude-3-5-sonnet-20241022 (previous version)
# - claude-3-opus-20240229 (most capable)
CLAUDE_MODEL=claude-sonnet-4-20250514

# OpenAI Models:
# - gpt-4-turbo-preview (recommended)
# - gpt-4 (stable)
# - gpt-4o (optimized)
OPENAI_MODEL=gpt-4-turbo-preview
```

---

## Running the Application

### Development Mode

```bash
npm start
```

The server will start at `http://localhost:3000`

You should see:

```
🤖 Archie v2.0 - Conversational Architecture System
📡 Server: http://localhost:3000

🧠 AI Providers:
   ✅ Gemini (configured)
   ✅ Claude (configured)
   ✅ OpenAI (configured)

📋 System: Multi-phase conversational mode
```

### Testing the Application

1. Open `http://localhost:3000` in your browser
2. Fill out the product idea form
3. Select AI providers and models
4. Submit and watch the architecture generation
5. Chat to refine components
6. Click "Approve & Continue" to see the diagram

### Stopping the Server

Press `Ctrl+C` in the terminal

---

## Cloud Deployment

### Option 1: Railway (Recommended - Easiest)

Railway offers free tier and automatic deployments.

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway and select your repo

3. **Set Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add all variables from `.env`
   - Click "Deploy"

4. **Get Your URL**
   - Railway will provide a URL: `https://your-app.up.railway.app`

**Cost:** $5/month after free tier

### Option 2: Render

Render offers generous free tier.

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name:** archie
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Set Environment Variables**
   - Scroll to "Environment Variables"
   - Add all variables from `.env`
   - Click "Create Web Service"

4. **Get Your URL**
   - Render provides: `https://your-app.onrender.com`

**Cost:** Free tier available (spins down after inactivity)

### Option 3: Heroku

Heroku is reliable but requires payment.

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create archie-your-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set GOOGLE_API_KEY=your_key_here
   heroku config:set ANTHROPIC_API_KEY=your_key_here
   heroku config:set OPENAI_API_KEY=your_key_here
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open Your App**
   ```bash
   heroku open
   ```

**Cost:** $7/month minimum

### Option 4: Vercel (Requires Configuration)

Vercel is great for frontend but needs serverless functions setup.

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Use Vercel dashboard
   - Add all variables from `.env`

**Note:** Requires converting Express routes to serverless functions.

---

## Production Best Practices

### Security

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use environment variables in production

2. **Use HTTPS**
   - Most platforms provide this automatically
   - Force HTTPS in production

3. **Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```
   Add to `server/server.js`:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

4. **CORS Configuration**
   Update in production to specific domains:
   ```javascript
   app.use(cors({
     origin: 'https://your-domain.com'
   }));
   ```

### Monitoring

1. **Add Logging**
   ```bash
   npm install winston
   ```

2. **Error Tracking**
   - Consider Sentry or LogRocket
   - Track API failures

3. **Uptime Monitoring**
   - Use UptimeRobot (free)
   - Ping your `/api/health` endpoint

### Performance

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   
2. **Redis for Sessions** (Future)
   - Migrate from in-memory to Redis
   - See `server/services/conversationManager.js`

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Key Not Working

1. Check `.env` file has correct variable names
2. Restart server after adding keys
3. Verify key is valid on provider's dashboard
4. Check for extra spaces in `.env`

### JSON Parsing Errors

- Usually temporary AI response issues
- System auto-retries with repair
- Try different AI provider
- Check provider API status

### Server Won't Start

1. Check Node.js version: `node --version` (need v16+)
2. Check port availability
3. Check `.env` syntax
4. Check console for specific errors

### Deployment Issues

**Railway/Render:**
- Ensure all environment variables are set
- Check build logs for errors
- Verify `package.json` has correct start script

**Heroku:**
- Check Procfile exists (not needed for Railway/Render)
- Verify buildpack is Node.js
- Check environment variables

---

## Next Steps

After successful setup:

1. Read [README.md](README.md) for feature overview
2. Read [API.md](API.md) for API documentation
3. Customize the UI in `public/css/`
4. Modify prompts in `server/services/promptBuilder.js`
5. Add your own components/features

---

## Support

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review server console logs
3. Check browser console for frontend errors
4. Verify environment variables are correct

---

**Happy Building!** 🚀
