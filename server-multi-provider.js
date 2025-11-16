require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// AI Provider configuration
const AI_PROVIDER = process.env.AI_PROVIDER || 'claude'; // 'claude' or 'openai'

// Initialize AI clients based on provider
let aiClient = null;

if (AI_PROVIDER === 'claude') {
  const Anthropic = require('@anthropic-ai/sdk');
  aiClient = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
} else if (AI_PROVIDER === 'openai') {
  const OpenAI = require('openai');
  aiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// The Hackathon Mega-Prompt (same for all providers)
function createArchitecturePrompt(formData) {
  const { idea, userCount, compliance, skillLevel, timeline } = formData;

  return `You are Archie, an expert AI system architect and technical co-founder. Your job is to analyze a product idea and generate a complete, professional system architecture blueprint.

USER'S PRODUCT IDEA:
${idea}

CONTEXT:
- Expected users in Year 1: ${userCount}
- Compliance requirements: ${compliance}
- Builder's technical skill level: ${skillLevel}
- Timeline to launch: ${timeline}

YOUR TASK:
Generate a comprehensive system architecture design. Your response MUST be a valid JSON object with this exact structure:

{
  "summary": "A 2-3 sentence overview of the product and key architectural decisions",
  "tech_stack": {
    "frontend": "Recommended frontend technology with brief justification",
    "backend": "Recommended backend technology with brief justification",
    "database": "Recommended database with brief justification",
    "hosting": "Recommended cloud provider/hosting with brief justification",
    "authentication": "Recommended auth solution if needed"
  },
  "compliance_notes": "Critical compliance considerations (HIPAA, PCI, GDPR, etc.) or 'None' if not applicable",
  "scalability_strategy": "How this architecture handles the expected user count and growth",
  "mermaid_diagram": "A Mermaid.js flowchart diagram showing the complete system architecture. Use proper Mermaid syntax with flowchart TB direction. Include: User/Client, Frontend, Backend/API, Database, External Services, and data flow arrows. Make it visually clear and professional.",
  "component_explanations": {
    "frontend": "What the frontend does and why this choice",
    "backend": "What the backend does and why this choice",
    "database": "What the database does and why this choice",
    "hosting": "Why this hosting choice",
    "security": "Key security measures to implement"
  },
  "first_steps": [
    "Step 1: Concrete first action",
    "Step 2: Next action",
    "Step 3: Next action",
    "Step 4: Next action",
    "Step 5: Next action"
  ],
  "cost_estimate": "Estimated monthly cost for the first year (be realistic)",
  "risks_and_gotchas": [
    "Important risk or consideration 1",
    "Important risk or consideration 2",
    "Important risk or consideration 3"
  ]
}

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown formatting, no code blocks, no additional text
2. Make the mermaid_diagram detailed and professional with proper syntax
3. Tailor recommendations to the user's skill level
4. If compliance keywords detected (health, medical, HIPAA, payment, credit card, PCI), emphasize this heavily
5. Be specific and actionable, not generic
6. Consider the timeline and user count in your recommendations

Generate the JSON response now:`;
}

// Abstraction layer: Call AI based on provider
async function callAI(prompt) {
  if (AI_PROVIDER === 'claude') {
    return await callClaude(prompt);
  } else if (AI_PROVIDER === 'openai') {
    return await callOpenAI(prompt);
  } else {
    throw new Error(`Unsupported AI provider: ${AI_PROVIDER}`);
  }
}

// Claude API implementation
async function callClaude(prompt) {
  const message = await aiClient.messages.create({
    model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  return message.content[0].text;
}

// OpenAI API implementation
async function callOpenAI(prompt) {
  const completion = await aiClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    messages: [{
      role: 'system',
      content: 'You are Archie, an expert AI system architect. You always respond with valid JSON only, no markdown formatting.'
    }, {
      role: 'user',
      content: prompt
    }],
    temperature: 0.7,
    response_format: { type: 'json_object' } // Force JSON mode
  });

  return completion.choices[0].message.content;
}

// Parse JSON from AI response (handles various formats)
function parseAIResponse(responseText) {
  try {
    // Try direct JSON parse first
    return JSON.parse(responseText);
  } catch (parseError) {
    // If parsing fails, try to extract JSON from markdown code blocks
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                      responseText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    } else {
      throw new Error('Failed to parse AI response as JSON');
    }
  }
}

// API endpoint to generate architecture
app.post('/api/generate-architecture', async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.idea || !formData.userCount || !formData.compliance ||
        !formData.skillLevel || !formData.timeline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log(`Generating architecture using ${AI_PROVIDER.toUpperCase()}...`);
    console.log('Idea:', formData.idea.substring(0, 50) + '...');

    // Call AI (abstracted - works with any provider)
    const prompt = createArchitecturePrompt(formData);
    const responseText = await callAI(prompt);

    // Parse the response
    const architectureData = parseAIResponse(responseText);

    console.log('Architecture generated successfully');
    res.json(architectureData);

  } catch (error) {
    console.error('Error generating architecture:', error);
    res.status(500).json({
      error: 'Failed to generate architecture',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const apiKeyConfigured = AI_PROVIDER === 'claude'
    ? !!process.env.ANTHROPIC_API_KEY
    : !!process.env.OPENAI_API_KEY;

  res.json({
    status: 'ok',
    message: 'Archie is ready to architect!',
    provider: AI_PROVIDER,
    apiKeyConfigured
  });
});

app.listen(PORT, () => {
  console.log(`🤖 Archie is running on http://localhost:${PORT}`);
  console.log(`🧠 AI Provider: ${AI_PROVIDER.toUpperCase()}`);

  if (AI_PROVIDER === 'claude') {
    console.log(`📋 Claude API Key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
  } else if (AI_PROVIDER === 'openai') {
    console.log(`📋 OpenAI API Key configured: ${process.env.OPENAI_API_KEY ? 'Yes' : 'No'}`);
  }
});
