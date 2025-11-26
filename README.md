# Archie - Your AI Tech Co-Founder

**AI-powered system architecture design tool that helps you build the perfect tech stack for your product idea.**

Archie is a conversational architecture design system that uses multiple AI providers (Google Gemini, Anthropic Claude, OpenAI GPT) to help you:
- Discover the right components for your system
- Refine your architecture through natural conversation
- Get detailed configuration and setup instructions
- Visualize your architecture with interactive diagrams

## Features

### Multi-Phase Conversational System
1. **Component Discovery** - Identify 5-8 core components based on your product idea
2. **Interactive Refinement** - Chat naturally to adjust components ("Use AWS instead of GCP")
3. **Deep Dive** - Get detailed configs, setup steps, best practices for each component
4. **Interactive Diagrams** - Click components to see detailed information

### AI Provider Flexibility
- **Google Gemini** - Fast and cost-effective
- **Anthropic Claude** - Highest quality responses
- **OpenAI GPT** - Widely used and reliable
- Choose one or multiple providers for quality comparison

### Client-Side Diagram Generation
- Mermaid.js-powered interactive flowcharts
- Click-to-explore component details
- Color-coded by category (Frontend, Backend, Security, etc.)
- **50-60% cost savings** vs AI-generated diagrams

### Smart Architecture Recommendations
Based on your inputs:
- Expected user count
- Launch timeline
- Technical skill level
- Compliance requirements (HIPAA, PCI-DSS, GDPR, SOC 2)
- Cloud platform preference (GCP, AWS, Azure)

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- At least one AI provider API key (Gemini, Claude, or OpenAI)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd archie

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys
```

### Configuration

Edit `.env` file:

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

### Running the Application

```bash
# Development mode
npm start

# The server will start at http://localhost:3000
```

Visit `http://localhost:3000` in your browser to start using Archie!

## Project Structure

```
archie/
├── server/                 # Backend
│   ├── server.js          # Main Express server
│   └── services/          # Business logic
│       ├── conversationManager.js  # Session management
│       ├── promptBuilder.js        # AI prompt generation
│       └── aiService.js            # AI provider abstraction
│
├── public/                # Frontend
│   ├── index.html        # Main HTML
│   ├── css/              # Stylesheets
│   │   ├── base.css      # Variables, reset, utilities
│   │   ├── components.css # Form, chat, buttons
│   │   └── diagram.css   # Diagram and details panel
│   └── js/               # JavaScript modules
│       ├── main.js       # App initialization
│       ├── components/
│       │   └── chat.js   # Chat UI component
│       └── services/
│           ├── api.js           # API client
│           ├── state.js         # State management
│           └── mermaidBuilder.js # Diagram generation
│
├── .env.example          # Environment template
├── package.json          # Dependencies
├── README.md            # This file
├── SETUP.md             # Detailed setup guide
└── API.md               # API documentation
```

## How It Works

### Phase 1: Component Discovery
1. Fill out the form with your product idea and requirements
2. Archie analyzes your needs and identifies core components
3. Review the suggested architecture

### Phase 2: Interactive Refinement
1. Chat with Archie to refine components
2. Example: "Use PostgreSQL instead of MySQL"
3. Example: "Add Redis for caching"
4. Approve when satisfied

### Phase 3: Deep Dive
1. Archie fetches detailed configs for each component in parallel
2. Real-time progress updates via Server-Sent Events
3. Includes: settings, setup steps, best practices, security notes

### Phase 4: Diagram Display
1. Interactive Mermaid diagram generated client-side
2. Click any component to see details below
3. Color-coded by category
4. Fully explorable architecture

## AI Provider Selection

Archie supports three AI providers:

| Provider | Strengths | Use Case |
|----------|-----------|----------|
| **Google Gemini** | Fast, cost-effective, large context | Quick iterations, budget-conscious |
| **Anthropic Claude** | Highest quality, detailed responses | Production architectures, complex systems |
| **OpenAI GPT** | Widely adopted, consistent | General-purpose, familiar interface |

You can select multiple providers to compare quality and get the best results.

## Cost Optimization

Archie is designed for cost efficiency:

1. **Phase-specific prompts** - Small, focused requests instead of one large prompt
2. **Client-side diagrams** - Mermaid.js generates diagrams (50-60% cost reduction)
3. **Parallel fetching** - Fast deep dive without sequential AI calls
4. **Provider choice** - Use cost-effective Gemini for iterations, Claude for final output

## Deployment

See [SETUP.md](SETUP.md) for detailed deployment instructions including:
- Cloud deployment (Heroku, Railway, Render)
- Environment configuration
- Production best practices
- Monitoring and logging

## API Documentation

See [API.md](API.md) for complete API reference including:
- All endpoints
- Request/response formats
- WebSocket/SSE events
- Error handling

## Troubleshooting

### No AI providers configured
**Error:** "No AI providers available"
**Solution:** Add at least one API key to `.env` file

### Port already in use
**Error:** "EADDRINUSE: address already in use :::3000"
**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### JSON parsing errors
**Error:** "Failed to parse JSON response"
**Solution:** This is usually temporary. The system has auto-retry with repair. If persistent, try a different AI provider.

### Module not found
**Error:** "Cannot find module"
**Solution:**
```bash
npm install
```

## Technology Stack

**Backend:**
- Node.js + Express
- Server-Sent Events (SSE) for real-time updates
- In-memory conversation storage (UUID-based)

**Frontend:**
- Vanilla JavaScript (ES6 modules)
- Mermaid.js for diagrams
- CSS3 with CSS variables

**AI Providers:**
- Google Gemini API
- Anthropic Claude API
- OpenAI GPT API

## Future Enhancements

- [ ] Redis for persistent conversation storage
- [ ] Conversation history and export
- [ ] Diagram export (PNG, SVG, PDF)
- [ ] Multi-user collaboration
- [ ] Custom component templates
- [ ] Architecture comparison tool
- [ ] Cost estimation calculator

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT License - See LICENSE file for details

## Support

For detailed setup instructions, see [SETUP.md](SETUP.md)

For API documentation, see [API.md](API.md)

---

**Built with Claude AI** - Designed for builders, by builders.
