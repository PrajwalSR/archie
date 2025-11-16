# 🤖 Archie - Your AI Tech Co-Founder

Transform your product idea into a professional system architecture blueprint in seconds.

## What is Archie?

Archie is an AI-powered system architect that helps non-technical founders and student builders turn their ideas into actionable technical blueprints. No more guessing about tech stacks, scalability, or compliance requirements.

### The Problem We Solve

- **Non-technical founders** don't know where to start with system design
- **Student builders** can code but don't know how to deploy or scale
- **Solo entrepreneurs** waste weeks researching the "right" tech stack
- **Everyone** misses critical compliance requirements (HIPAA, PCI-DSS, etc.)

### What Archie Delivers

1. **Visual System Architecture Diagram** - See your entire system at a glance
2. **Customized Tech Stack** - Get specific recommendations with justifications
3. **Compliance Guidance** - Never miss HIPAA, PCI, or GDPR requirements
4. **Scalability Strategy** - Understand how to handle 100 vs 100,000 users
5. **Concrete First Steps** - Know exactly what to build first
6. **Cost Estimates** - Realistic monthly budgets for Year 1
7. **Risk Assessment** - Critical gotchas to avoid

## Quick Start

### Prerequisites

- Node.js 16+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment
cp .env.example .env

# 3. Add your Anthropic API key to .env
# Edit .env and replace 'your_api_key_here' with your actual key
```

### Running the App

```bash
# Start the server
npm start

# For development with auto-reload
npm run dev
```

Then open your browser to: `http://localhost:3000`

## How It Works

### For Users

1. **Describe your idea** - "An app for doctors to share patient MRI scans"
2. **Answer key questions** - Scale, compliance, skill level, timeline
3. **Get your blueprint** - Complete architecture in 10-20 seconds

### Under the Hood

```
User Input (Form)
  → Express Server
  → Claude API (Hackathon Mega-Prompt)
  → Structured JSON Response
  → Frontend Renders Results + Mermaid Diagram
```

## Architecture (MVP)

This is the **Hackathon MVP** version with simplified architecture:

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js + Express
- **AI**: Claude Sonnet 4.0 via Anthropic API
- **Visualization**: Mermaid.js for diagrams
- **State**: No database (stateless, single-session)

## Example Use Cases

### Use Case 1: Healthcare Startup
**Input**: "HIPAA-compliant telemedicine platform"
**Output**: Architecture with encrypted databases, HIPAA-specific hosting (AWS with BAA), secure video streaming, audit logging

### Use Case 2: Student Hackathon
**Input**: "Social app for college students to share class notes"
**Output**: Lightweight stack (Firebase, React), simple auth, 1-week build plan

### Use Case 3: Payment Platform
**Input**: "Marketplace with credit card payments"
**Output**: PCI-DSS guidance, recommendation to use Stripe, compliance checklist

## Project Structure

```
archie/
├── server.js              # Express server + Claude API integration
├── package.json           # Dependencies
├── .env.example           # Environment template
├── public/
│   ├── index.html         # Main UI
│   ├── app.js             # Frontend logic
│   └── styles.css         # Styling
└── README.md              # You are here
```

## Key Features

### 1. Smart Compliance Detection
Archie automatically detects compliance triggers:
- **Healthcare/Medical/HIPAA** → Enforces HIPAA requirements
- **Payment/Credit Card** → Enforces PCI-DSS
- **Education** → Suggests FERPA considerations
- **EU Users** → Reminds about GDPR

### 2. Skill-Level Adaptation
Recommendations change based on your skill:
- **Non-technical**: Suggests no-code tools (Bubble, Webflow)
- **Intermediate**: Guides to beginner-friendly platforms (Firebase, Vercel)
- **Advanced**: Recommends enterprise solutions (Kubernetes, microservices)

### 3. Visual System Diagrams
Every architecture includes a Mermaid.js diagram showing:
- User/Client layer
- Frontend (Web/Mobile)
- Backend/API
- Database
- External services (Auth, Payments, etc.)
- Data flow arrows

## Future Roadmap

### Phase 2: Conversational AI (Post-Hackathon)
- Replace form with chat interface
- Multi-turn conversation with state management
- Ask clarifying questions dynamically

### Phase 3: Interactive Diagrams
- Click any component to learn more
- Edit the diagram in real-time
- Export to PDF or share via link

### Phase 4: Code Generation
- Generate starter code for the recommended stack
- Create database schemas
- Generate API endpoint stubs

## Technical Decisions

### Why Claude API?
- Best-in-class reasoning for complex system design
- Excellent at structured JSON output
- Long context window for detailed responses

### Why Mermaid.js?
- Text-based diagram syntax (easy for AI to generate)
- Renders beautiful diagrams in-browser
- No external dependencies

### Why No Database for MVP?
- Hackathon time constraint
- Stateless design is simpler to demo
- Can add persistence later (user accounts, saved blueprints)

## Contributing

Ideas for improvements:
1. Add more compliance frameworks (SOC 2, ISO 27001)
2. Support for mobile app architectures
3. Integration with cloud provider CLIs for one-click setup
4. Multi-language support
5. Export to Terraform/CloudFormation

## License

MIT License - Build whatever you want with this!

## Credits

Built with:
- [Claude AI](https://www.anthropic.com/claude) by Anthropic
- [Mermaid.js](https://mermaid.js.org/) for diagrams
- [Express.js](https://expressjs.com/) for the server
- Caffeine and hackathon energy

---

**Made for builders, by builders** 🚀

Questions? Found a bug? Open an issue or submit a PR!
