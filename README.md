# 🤖 Archie - Your AI Tech Co-Founder

Transform your product idea into a professional system architecture blueprint in seconds.

**No technical knowledge required.** Just describe your idea, and Archie designs the complete system for you.

---

## ⚡ Quick Start

```bash
npm install        # Install dependencies
./setup.sh         # Interactive setup (adds your API keys)
npm start          # Start Archie
```

Open http://localhost:3000 and describe your product idea!

---

## 🎯 What Archie Does

Archie is an AI-powered system architect that generates **comprehensive, production-ready architecture blueprints** for your product ideas.

### You Get:

✅ **Complete System Diagram** - Visual architecture with all components
✅ **Tech Stack Recommendations** - Frontend, backend, database, hosting (with justifications)
✅ **Database Design** - Schema, tables, relationships, indexing strategy
✅ **API Endpoints** - 5-10 key endpoints for your system
✅ **Cloud Infrastructure** - Specific AWS/GCP/Azure services
✅ **Authentication System** - Auth provider, features, implementation
✅ **Security Architecture** - Encryption, secrets management, DDoS protection
✅ **Compliance Guidance** - HIPAA, PCI-DSS, GDPR, SOC 2 (automatically detected)
✅ **Deployment Strategy** - CI/CD, environments, rollback plans
✅ **Scalability Plan** - How to handle 10x growth
✅ **Cost Estimates** - Monthly costs (initial + Year 1)
✅ **First Steps** - Concrete action plan to start building
✅ **Risks & Gotchas** - What to watch out for

---

## 🚀 Example

**Input:**
```
Idea: An app for doctors to securely share patient MRI scans

Users: 1,000-10,000
Compliance: Healthcare (HIPAA Required)
Skill Level: Non-technical
Timeline: 3-6 months
```

**Output in 20 seconds:**
- 🎯 Complete HIPAA-compliant architecture
- 🏥 AWS with HIPAA-eligible services (RDS, S3 with encryption)
- 🔒 Security measures (encryption, audit logging, BAA requirements)
- 📊 Database schema for users, scans, sharing permissions
- 🔗 API endpoints for upload, share, view scans
- 💰 Cost estimate: $200-500/month
- ⚡ Scalability: CDN for MRI files, database replication
- ✅ 7-step action plan to start building

---

## 🤖 AI Providers (Smart Selection)

Archie supports **Google Gemini**, **OpenAI**, and **Claude** with automatic quality comparison.

### ⭐ Recommended: Google Gemini (FREE with $300 Credits!)
```bash
# Add to .env
GOOGLE_API_KEY=your-key-here
```
- Get your key: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Uses Gemini 1.5 Pro (excellent quality)
- **FREE with $300 Google Cloud credits**
- Perfect for getting started without spending money!

### Alternative: OpenAI or Claude
```bash
# OpenAI
OPENAI_API_KEY=sk-your-key-here

# Claude
ANTHROPIC_API_KEY=sk-ant-your-key
```
- OpenAI GPT-4 Turbo: Fast, comprehensive
- Claude Sonnet 4: Excellent for compliance (HIPAA, PCI-DSS)

### 🚀 Parallel Comparison Mode (Multiple Keys)
```bash
# Add any combination to .env
GOOGLE_API_KEY=your-gemini-key
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key
```
- Calls **all configured providers** simultaneously
- Compares quality using scoring algorithm
- **Returns the best result automatically**
- No code changes needed - just add the keys!

**Why?** Each provider has strengths. Gemini is free and excellent. Claude excels at compliance. OpenAI is fast. Parallel mode gives you the best of all worlds.

---

## 📋 Who Is This For?

### 1. Non-Technical Founders
- You have a brilliant idea but don't know where to start
- You need a blueprint to hire developers against
- You want to understand the "technical side" before pitching investors

### 2. Student Builders
- You can code but don't know deployment/scaling
- Your projects are "stuck on your laptop"
- You need to learn system design for interviews/hackathons

### 3. Technical Founders
- You want a second opinion on your architecture
- You need to evaluate different approaches quickly
- You're exploring compliance requirements (HIPAA, PCI, SOC 2)

---

## 🛠️ Installation

### Prerequisites
- Node.js 16+ ([download](https://nodejs.org/))
- An API key: **Google Gemini** (recommended - FREE $300 credits!), **OpenAI**, or **Claude**

### Setup

**Option 1: Interactive (Recommended)**
```bash
git clone <repo>
cd archie
npm install
./setup.sh  # Prompts for API keys
npm start
```

**Option 2: Manual**
```bash
git clone <repo>
cd archie
npm install
cp .env.example .env
# Edit .env and add your API key(s)
npm start
```

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup, testing, troubleshooting guide (read this first!)
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** - Hackathon/presentation script
- **[.env.example](.env.example)** - Configuration template

---

## 🧪 Testing

Verify your setup works:

```bash
npm test
```

This checks:
- ✅ .env file exists
- ✅ API keys configured
- ✅ Dependencies installed
- ✅ Server starts correctly
- ✅ Health endpoint responds

---

## 🎯 Use Cases

### Healthcare (HIPAA)
**Archie detects** medical/patient keywords and automatically:
- Flags HIPAA requirements
- Recommends encrypted databases
- Suggests HIPAA-compliant hosting (AWS with BAA)
- Includes audit logging requirements
- Lists specific security controls

### Payments (PCI-DSS)
**Archie detects** payment/credit card keywords and automatically:
- Warns about PCI-DSS compliance
- Recommends Stripe/PayPal (don't handle cards directly)
- Explains tokenization approach
- Includes fraud detection strategies

### High-Scale SaaS
**Archie adapts** for 100,000+ users:
- CDN configuration
- Database sharding strategy
- Microservices architecture (if appropriate)
- Auto-scaling setup
- Multi-region deployment

### Student/Hackathon Projects
**Archie simplifies** for quick builds:
- Lightweight tech stacks (Firebase, Supabase)
- Simple deployment (Vercel, Netlify)
- Low-cost solutions ($0-50/month)
- Beginner-friendly technologies

---

## 🔒 Compliance Detection

Archie automatically detects and handles:

| Keywords Detected | Compliance Framework | What Archie Does |
|-------------------|---------------------|------------------|
| doctor, patient, medical, health | **HIPAA** | Encrypted DBs, HIPAA hosting, BAA, audit logs |
| payment, credit card, billing | **PCI-DSS** | Recommends Stripe, tokenization, never store cards |
| EU, European, GDPR | **GDPR** | Data privacy, right to deletion, consent management |
| school, student, grades | **FERPA** | Student data protection requirements |
| financial, banking, audit | **SOC 2** | Security controls, compliance checklist |

---

## 💰 Cost

**Archie itself:** Free and open-source (MIT License)

**AI API costs:**
- **Google Gemini 1.5 Pro: FREE** (with $300 Google Cloud credits - covers thousands of generations!)
- OpenAI GPT-4 Turbo: ~$0.10-0.15 per architecture
- Claude Sonnet 4.0: ~$0.08-0.12 per architecture
- Parallel mode: Varies by configured providers

**Estimate:**
- With Gemini: FREE for thousands of generations
- With paid providers: $10-20 for 100 architecture generations

---

## 🌟 Key Features

### 1. Smart Provider Selection
- Auto-detects available API keys
- Uses best available provider
- Parallel comparison when both configured
- No manual switching needed

### 2. Comprehensive Output
Not just "use React and Node.js" - you get:
- Specific services (AWS Lambda vs EC2)
- Database schemas with table structures
- API endpoints with descriptions
- Security measures with implementation steps
- Cost breakdowns by service

### 3. Educational
Every recommendation includes **why**:
- Why PostgreSQL over MongoDB
- Why serverless vs traditional servers
- Why this auth provider
- Why this cloud region

You don't just get a plan - you **learn** system design.

### 4. Compliance-First
Compliance isn't an afterthought:
- Detected automatically from your description
- Highlighted in red/yellow alerts
- Specific requirements listed
- Implementation steps included

---

## 🛣️ Roadmap

**Current (MVP):**
- ✅ Form-based input
- ✅ OpenAI + Claude support
- ✅ Parallel comparison mode
- ✅ Comprehensive architecture output
- ✅ Compliance detection
- ✅ Visual Mermaid diagrams

**Next (v2):**
- [ ] Conversational AI (chat interface)
- [ ] User accounts (save blueprints)
- [ ] Export to PDF
- [ ] Interactive diagrams (click to learn more)
- [ ] Compare multiple architectures
- [ ] Share blueprints via link

**Future (v3):**
- [ ] Code generation (generate starter projects)
- [ ] Database schema SQL export
- [ ] Terraform/CloudFormation templates
- [ ] Cost calculator (adjust sliders, see costs change)
- [ ] Community blueprint library

---

## 🤝 Contributing

Ideas for improvements:
1. Add more compliance frameworks (ISO 27001, FedRAMP)
2. Support for mobile app architectures
3. Multi-language support
4. Integration with cloud provider CLIs
5. Video tutorial generation

---

## 📝 License

MIT License - Build whatever you want with this!

---

## 🙏 Credits

Built with:
- [Google Gemini](https://ai.google.dev/) by Google (FREE with $300 credits!)
- [Claude AI](https://www.anthropic.com/claude) by Anthropic (excellent quality)
- [OpenAI GPT-4](https://openai.com/) (fast)
- [Mermaid.js](https://mermaid.js.org/) (diagrams)
- [Express.js](https://expressjs.com/) (server)

---

## ❓ FAQ

**Q: Do I need multiple API keys?**
A: No! One is enough. **Google Gemini is recommended** (FREE with $300 credits). Add more providers later for parallel comparison.

**Q: Which gives better results?**
A: Google Gemini 1.5 Pro is excellent and FREE. Claude Sonnet 4.0 for compliance-heavy apps (healthcare, payments). OpenAI GPT-4 for speed. Parallel mode for best quality.

**Q: How long does it take?**
A: 15-30 seconds to generate a complete architecture.

**Q: Can I use this for my startup?**
A: Yes! That's exactly what it's for. Use the blueprint to hire developers or learn to build it yourself.

**Q: Is my data sent to OpenAI/Claude?**
A: Yes, your product description is sent to generate the architecture. Don't include sensitive business secrets in the description.

**Q: Does it generate code?**
A: Not yet (v3 feature). Current version generates architecture blueprints and documentation.

---

**Ready to architect your idea?**

```bash
npm start
```

**Then go to:** http://localhost:3000

---

**Made with ❤️ for builders who deserve better tools**

Star this repo if Archie helped you! ⭐
