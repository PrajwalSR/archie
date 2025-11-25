# Changelog

## [1.1.0] - 2024-11-24

### ✨ Added - Google Gemini Support

#### New Features
- **Google Gemini Integration**: Full support for Google's Gemini AI models
  - Gemini 1.5 Pro (default - excellent quality)
  - Gemini 1.5 Flash (faster, lower cost)
  - Gemini 2.0 Flash Experimental (latest features)

#### Multi-Provider Comparison
- Extended parallel comparison to support 3 providers simultaneously
- Smart provider selection: Gemini, OpenAI, and Claude can all run in parallel
- Quality scoring picks the best architecture automatically

#### Configuration
- New environment variable: `GOOGLE_API_KEY`
- New environment variable: `GEMINI_MODEL` (optional)
- Updated `.env.example` with Gemini configuration
- Gemini is now the recommended provider (FREE with $300 Google Cloud credits)

#### Documentation
- Updated [README.md](README.md) with Gemini information
- New [GEMINI_SETUP.md](GEMINI_SETUP.md) - Complete setup guide for Google Gemini
- Updated all provider references to include Gemini

#### API Changes
- Health check endpoint now reports Gemini status
- Server startup displays Gemini configuration status
- Error messages include Google AI Studio link

#### Code Improvements
- Added `callGemini()` function for Gemini API calls
- Updated diagram fixing logic to use Gemini (when available)
- Dynamic provider detection and parallel processing
- Better error handling for all three providers

### 🎯 Why Gemini?

1. **FREE**: $300 Google Cloud credits cover thousands of generations
2. **Quality**: Excellent results comparable to GPT-4 and Claude
3. **Performance**: Fast response times with large context windows
4. **Native JSON**: Built-in structured output support

### 📦 Dependencies
- Added: `@google/generative-ai` (^0.24.1)

### 🔄 Migration Guide

If you're upgrading from v1.0.0:

1. Pull latest code
2. Run `npm install` to get the Gemini SDK
3. Get your Google API key: https://aistudio.google.com/app/apikey
4. Add to `.env`: `GOOGLE_API_KEY=your-key-here`
5. Restart the server

Your existing OpenAI/Claude keys will continue to work. Gemini is optional but recommended!

---

## [1.0.0] - 2024-11-16

### Initial Release

- OpenAI GPT-4 Turbo support
- Claude Sonnet 4 support
- Parallel comparison mode
- Comprehensive architecture generation
- Mermaid diagram generation
- Compliance detection (HIPAA, PCI-DSS, GDPR, etc.)
- Web-based form interface
- Real-time architecture blueprints
