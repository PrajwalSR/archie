# 🚀 Archie Setup & Testing Guide

Complete guide to set up, test, and use Archie - Your AI Tech Co-Founder

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [Testing Your Setup](#testing-your-setup)
4. [How to Use Archie](#how-to-use-archie)
5. [Understanding AI Providers](#understanding-ai-providers)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## ⚡ Quick Start

**Get Archie running in 3 steps:**

```bash
# 1. Install dependencies
npm install

# 2. Run interactive setup
./setup.sh

# 3. Start Archie
npm start
```

Then open http://localhost:3000 in your browser!

---

## 📝 Detailed Setup

### Step 1: Prerequisites

Make sure you have:
- **Node.js 16+** installed ([download here](https://nodejs.org/))
- **At least ONE API key**: OpenAI OR Claude

### Step 2: Get Your API Keys

#### OpenAI (Recommended for now)
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Important**: Add credits at https://platform.openai.com/account/billing

#### Claude (Best quality - when you have credits)
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "API Keys" →  "Create Key"
4. Copy the key (starts with `sk-ant-`)
5. Add credits at https://console.anthropic.com/settings/billing

### Step 3: Run Setup Script

**Option A: Interactive Setup (Easiest)**
```bash
./setup.sh
```

Follow the prompts:
- Enter your OpenAI key (or press Enter to skip)
- Enter your Claude key (or press Enter to skip)

**Option B: Manual Setup**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key(s)
# Use any text editor - nano, vim, VS Code, etc.
nano .env
```

Add at least one key:
```bash
OPENAI_API_KEY=sk-your-key-here
# OR
ANTHROPIC_API_KEY=sk-ant-your-key-here
# OR both!
```

### Step 4: Install Dependencies

```bash
npm install
```

This installs:
- Express (web server)
- OpenAI SDK
- Anthropic Claude SDK
- Other dependencies

---

## 🧪 Testing Your Setup

### Quick Test

```bash
npm test
```

This will:
1. ✅ Check if .env file exists
2. ✅ Verify API keys are configured
3. ✅ Confirm dependencies are installed
4. ✅ Test server startup
5. ✅ Run health check

**Expected output:**
```
🧪 Archie Test Suite
==========================================

Test 1: Checking .env file...
✅ .env file exists

Test 2: Checking API keys...
✅ OpenAI key configured (sk-proj-ab...)

Test 3: Checking dependencies...
✅ All dependencies installed

Test 4: Testing server startup...

Test 5: Testing /api/health endpoint...
✅ Health check passed
   Mode: openai_only
   OpenAI: configured
   Claude: not configured

==========================================
✅ ALL TESTS PASSED!
==========================================
```

### Manual Testing

**Test the health endpoint:**
```bash
# Start server
npm start

# In another terminal:
curl http://localhost:3000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "Archie is ready to architect!",
  "providers": {
    "claude": "not configured",
    "openai": "configured"
  },
  "mode": "openai_only"
}
```

---

## 💻 How to Use Archie

### 1. Start the Server

```bash
npm start
```

You should see:
```
🤖 Archie - AI Tech Co-Founder
📡 Server: http://localhost:3000

🧠 AI Providers:
   ⚠️  Claude (not configured)
   ✅ OpenAI (configured)
   💡 Mode: OpenAI only
   💡 Tip: Add Claude key for even better quality + parallel comparison
```

### 2. Open Your Browser

Go to: **http://localhost:3000**

### 3. Fill Out the Form

Describe your product idea and answer the questions:

**Example Input:**
```
Idea: An app for doctors to securely share patient MRI scans
      with specialists for second opinions

Users: 1,000-10,000 (Growing Startup)
Compliance: Healthcare (HIPAA Required)
Skill: Non-technical (Will hire developers)
Timeline: 3-6 months (Full Product)
```

### 4. Generate Architecture

Click "Generate My Architecture Blueprint"

Wait 15-30 seconds (the AI is working!)

### 5. Review Your Results

You'll get:
- ✅ **Executive Summary** - Overview of your architecture
- ✅ **HIPAA Compliance Alert** - Critical requirements (if applicable)
- ✅ **System Diagram** - Visual architecture (Mermaid)
- ✅ **Tech Stack** - Recommended technologies with justifications
- ✅ **Database Design** - Schema overview and table structure
- ✅ **API Endpoints** - Key endpoints for your system
- ✅ **Cloud Infrastructure** - Specific AWS/GCP/Azure services
- ✅ **Security Architecture** - Encryption, auth, compliance
- ✅ **Deployment Strategy** - CI/CD, environments, rollback
- ✅ **First Steps** - Concrete action plan
- ✅ **Cost Estimates** - Monthly costs (initial + Year 1)
- ✅ **Risks & Gotchas** - What to watch out for

---

## 🤖 Understanding AI Providers

Archie supports **smart provider selection** based on what you have configured:

### Mode 1: OpenAI Only (Current - You have credits)

**When:**
- Only `OPENAI_API_KEY` is configured

**What happens:**
- Uses GPT-4 Turbo (best OpenAI model)
- Fast responses (10-20 seconds)
- Good quality architecture
- Comprehensive output

**Best for:**
- Right now (since you don't have Claude credits yet)
- Testing and development
- Cost-effective exploration

### Mode 2: Claude Only (Best Quality)

**When:**
- Only `ANTHROPIC_API_KEY` is configured

**What happens:**
- Uses Claude Sonnet 4.0 (elite quality)
- Slightly slower (15-25 seconds)
- **Best architecture quality**
- **Superior compliance detection** (HIPAA, PCI, etc.)
- More comprehensive security recommendations

**Best for:**
- Production use
- Complex systems
- Compliance-heavy apps (healthcare, payments)

### Mode 3: Parallel Comparison (Ultimate - Future)

**When:**
- **Both** API keys are configured

**What happens:**
1. Calls OpenAI and Claude **simultaneously**
2. Compares outputs using quality scoring:
   - Compliance depth
   - Architecture completeness
   - Security recommendations
   - Diagram quality
3. **Returns the BEST result**
4. Logs which provider "won"

**Best for:**
- Critical production architectures
- When you want the absolute best quality
- Learning by comparing different AI approaches

**How to enable:**
```bash
# Just add both keys to .env:
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key
```

Restart the server - parallel comparison activates automatically!

---

## 🔧 Troubleshooting

### Problem: "No API keys configured"

**Symptoms:**
```
❌ No API keys configured
```

**Solution:**
```bash
# Run setup again
./setup.sh

# OR manually edit .env
nano .env
# Add at least one API key
```

### Problem: "API quota exceeded"

**Symptoms:**
```
❌ API quota exceeded
Please add credits to your OpenAI or Claude account
```

**Solution:**
- **OpenAI**: Add credits at https://platform.openai.com/account/billing
- **Claude**: Add credits at https://console.anthropic.com/settings/billing

### Problem: "Port 3000 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

**Option A: Use a different port**
```bash
# Edit .env
PORT=3001

# Restart server
npm start

# Access at http://localhost:3001
```

**Option B: Kill the process using port 3000**
```bash
# Find the process
lsof -ti:3000

# Kill it
lsof -ti:3000 | xargs kill
```

### Problem: "Failed to generate architecture"

**Possible causes & solutions:**

1. **Invalid API key**
   - Check your `.env` file for typos
   - Regenerate the key from the provider website

2. **No credits**
   - Add credits to your account

3. **Network issues**
   - Check your internet connection
   - Try again in a few moments

4. **Rate limiting**
   - Wait 60 seconds and try again
   - Consider upgrading your API tier

### Problem: Diagram not rendering

**Symptoms:**
- See raw Mermaid code instead of diagram

**Solution:**
1. Refresh the page (Ctrl+R or Cmd+R)
2. Check browser console (F12) for errors
3. Ensure Mermaid.js CDN is accessible
4. Try a different browser

### Problem: npm test fails

**Run diagnostics:**
```bash
# Check if .env exists
ls -la .env

# Check if dependencies are installed
npm list

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

---

## ⚙️ Advanced Configuration

### Customize AI Models

Edit `.env` to change which models are used:

```bash
# For OpenAI - Model options:
OPENAI_MODEL=gpt-4-turbo-preview  # Best quality (recommended)
# OPENAI_MODEL=gpt-4              # Slower, slightly better
# OPENAI_MODEL=gpt-3.5-turbo      # Fastest, cheapest (lower quality)

# For Claude - Model options:
CLAUDE_MODEL=claude-sonnet-4-20250514  # Best balance (recommended)
# CLAUDE_MODEL=claude-opus-4-20250514  # Most powerful (expensive)
# CLAUDE_MODEL=claude-3-haiku-20240307 # Fastest, cheapest
```

### Change Server Port

```bash
# In .env
PORT=8080

# Access at http://localhost:8080
```

### Enable Development Mode (Auto-Reload)

```bash
# Instead of npm start, use:
npm run dev

# Server will auto-restart when you edit code
```

---

## 📊 What You Get (Output Breakdown)

Archie generates a comprehensive architecture with these sections:

| Section | What It Includes |
|---------|-----------------|
| **Summary** | 3-4 sentence overview of architecture decisions |
| **Tech Stack** | Frontend, Backend, Database, Hosting, Auth, Storage, Caching, Monitoring |
| **Authentication** | Provider (Auth0, Cognito, etc.), features (MFA, OAuth), implementation steps |
| **Database Design** | Primary DB, schema overview, key tables, relationships, indexing, backups |
| **API Design** | Architecture pattern (REST/GraphQL), 5-10 key endpoints, versioning, rate limiting |
| **Cloud Infrastructure** | Provider (AWS/GCP/Azure), compute, networking, storage, auto-scaling, regions |
| **Compliance** | HIPAA/PCI/SOC2 requirements (if applicable), certifications, implementation steps |
| **Security** | Encryption (rest/transit), API security, secrets management, DDoS, penetration testing |
| **Scalability** | Strategy for 10x growth, database sharding, caching, CDN, load balancing |
| **Deployment** | CI/CD pipeline, environments (dev/staging/prod), deployment method, rollback, IaC |
| **Monitoring** | Metrics to track, alerting strategy, logging, uptime monitoring |
| **First Steps** | 5-7 concrete actions to start building |
| **Cost Estimates** | Initial monthly, Year 1 monthly, breakdown by service, optimization tips |
| **Risks** | 3-5 important risks with mitigation strategies |
| **Diagram** | Visual Mermaid.js flowchart of the complete system |

---

## 🎯 Example Use Cases

### Use Case 1: Healthcare Startup (HIPAA)

**Input:**
- Idea: "Telemedicine platform for rural patients"
- Compliance: Healthcare (HIPAA Required)

**What Archie Does:**
- ✅ Flags HIPAA requirements prominently
- ✅ Recommends HIPAA-compliant hosting (AWS with BAA)
- ✅ Suggests encrypted databases (PostgreSQL with encryption)
- ✅ Includes audit logging requirements
- ✅ Lists specific HIPAA security controls

### Use Case 2: Payment App (PCI-DSS)

**Input:**
- Idea: "Peer-to-peer payment app"
- Compliance: Payments (PCI-DSS Required)

**What Archie Does:**
- ✅ Warns about PCI-DSS compliance
- ✅ Recommends using Stripe/PayPal (don't handle cards directly)
- ✅ Explains "never store credit card numbers"
- ✅ Suggests tokenization approach
- ✅ Includes fraud detection strategies

### Use Case 3: Simple Student Project

**Input:**
- Idea: "Class note-sharing app for my university"
- Users: Under 100
- Timeline: 1-2 weeks

**What Archie Does:**
- ✅ Suggests lightweight stack (Firebase, React)
- ✅ Recommends simple hosting (Vercel, Netlify)
- ✅ Low cost estimate ($0-50/month)
- ✅ Fast build timeline
- ✅ Beginner-friendly technologies

---

## 🎉 You're Ready!

Your Archie setup is complete. Here's what to do next:

1. **Start building!**
   ```bash
   npm start
   ```

2. **Test with your idea**
   - Open http://localhost:3000
   - Describe your product
   - Get your architecture blueprint

3. **Share feedback**
   - Found a bug? Open an issue
   - Have a suggestion? Let us know

4. **When you add Claude credits**
   ```bash
   # Just add the key to .env
   ANTHROPIC_API_KEY=sk-ant-your-key

   # Parallel comparison activates automatically!
   ```

---

**Need more help?**
- Check [README.md](README.md) for project overview
- Review [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for presentation tips
- Star the repo if Archie helped you! ⭐

**Happy building!** 🚀
