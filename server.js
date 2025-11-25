require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize AI clients based on available API keys
let claudeClient = null;
let openaiClient = null;
let geminiClient = null;

// Auto-detect available providers
const hasClaudeKey = !!process.env.ANTHROPIC_API_KEY;
const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
const hasGeminiKey = !!process.env.GOOGLE_API_KEY;

if (hasClaudeKey) {
  const Anthropic = require('@anthropic-ai/sdk');
  claudeClient = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

if (hasOpenAIKey) {
  const OpenAI = require('openai');
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

if (hasGeminiKey) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
}

// Helper function to get cloud platform examples
function getCloudExamples(cloudPlatform) {
  const examples = {
    'Google Cloud (GCP)': 'Cloud Run, Cloud SQL, Cloud Storage, BigQuery, Firestore',
    'Amazon Web Services (AWS)': 'Lambda, RDS, S3, DynamoDB, API Gateway',
    'Microsoft Azure': 'Azure Functions, Azure SQL, Blob Storage, Cosmos DB, API Management'
  };
  return examples[cloudPlatform] || 'cloud services';
}

// Enhanced Mega-Prompt for Maximum Detail
function createArchitecturePrompt(formData) {
  const { idea, userCount, compliance, skillLevel, timeline, cloudPlatform } = formData;

  // Build cloud platform guidance
  let cloudGuidance = '';
  if (cloudPlatform && cloudPlatform !== 'No Preference') {
    const platformName = cloudPlatform.replace(/\s*\(.*?\)\s*/g, ''); // Remove (AWS), (GCP), etc.
    cloudGuidance = `\n- CRITICAL: User prefers ${platformName}. You MUST primarily use ${platformName} services (e.g., ${getCloudExamples(cloudPlatform)}) unless a specific service is absolutely critical and unavailable on ${platformName}.`;
  }

  return `You are Archie, an elite AI system architect and technical co-founder with expertise in enterprise-scale architecture design. Your job is to analyze a product idea and generate a COMPREHENSIVE, production-ready system architecture blueprint.

USER'S PRODUCT IDEA:
${idea}

CONTEXT:
- Expected users in Year 1: ${userCount}
- Compliance requirements: ${compliance}
- Builder's technical skill level: ${skillLevel}
- Timeline to launch: ${timeline}${cloudGuidance ? cloudGuidance : '\n- Cloud platform: No specific preference (recommend based on requirements)'}

YOUR TASK:
Generate an EXHAUSTIVE system architecture design covering ALL critical components. Your response MUST be a valid JSON object with this exact structure:

{
  "summary": "A comprehensive 3-4 sentence overview of the product, key architectural decisions, and strategic technology choices",

  "tech_stack": {
    "frontend": "Recommended frontend technology with detailed justification (framework, state management, UI libraries)",
    "backend": "Recommended backend technology with detailed justification (language, framework, architecture pattern)",
    "database": "Recommended database(s) with detailed justification (include both primary DB and any caching layers)",
    "hosting": "Recommended cloud provider with specific services (e.g., AWS Lambda, EC2, App Engine) and justification",
    "authentication": "Complete auth solution (e.g., Auth0, AWS Cognito, custom JWT) with justification",
    "file_storage": "File/media storage solution if applicable (S3, GCS, Cloudinary)",
    "caching": "Caching strategy if needed (Redis, CloudFront, Memcached)",
    "monitoring": "Monitoring and observability tools (CloudWatch, DataDog, Sentry)"
  },

  "authentication_system": {
    "provider": "Recommended auth provider/method",
    "features": ["MFA", "OAuth", "Social login", "Password reset", etc.],
    "implementation": "How to implement this auth system",
    "security_measures": ["JWT with refresh tokens", "Rate limiting", etc.]
  },

  "database_design": {
    "primary_database": "Main database choice with justification",
    "schema_overview": "High-level schema description (users, products, orders, etc.)",
    "key_tables": ["users", "products", "orders", "etc."],
    "relationships": "Description of key relationships and foreign keys",
    "indexing_strategy": "What fields to index for performance",
    "backup_strategy": "How to handle backups and disaster recovery"
  },

  "api_design": {
    "architecture_pattern": "REST, GraphQL, or hybrid with justification",
    "key_endpoints": [
      "POST /api/auth/login - User authentication",
      "GET /api/users/:id - Get user profile",
      "POST /api/products - Create product",
      "etc."
    ],
    "versioning_strategy": "API versioning approach (e.g., /v1/)",
    "rate_limiting": "Rate limiting strategy to prevent abuse"
  },

  "cloud_infrastructure": {
    "provider": "AWS, GCP, or Azure with specific justification",
    "compute": "Specific compute services (Lambda, EC2, Cloud Run, App Engine)",
    "networking": "VPC setup, load balancers, CDN configuration",
    "storage": "S3/GCS buckets, volumes, etc.",
    "serverless_vs_servers": "When to use serverless vs traditional servers",
    "auto_scaling": "How auto-scaling will be configured",
    "regions": "Recommended deployment regions based on user base"
  },

  "compliance_notes": "CRITICAL compliance considerations in extreme detail. If HIPAA/PCI/SOC2 required, list ALL specific requirements, certifications needed, and implementation steps. If none applicable, state 'None'",

  "security_architecture": {
    "data_encryption": "Encryption at rest and in transit (specific methods)",
    "api_security": "API authentication, CORS, rate limiting",
    "secrets_management": "How to handle API keys, passwords (AWS Secrets Manager, etc.)",
    "ddos_protection": "DDoS mitigation strategy",
    "penetration_testing": "Security testing recommendations",
    "compliance_specific": "Any compliance-specific security (HIPAA, PCI-DSS)"
  },

  "scalability_strategy": "Detailed strategy for handling growth from current users to 10x scale. Include database sharding, caching layers, CDN, load balancing, microservices if needed",

  "mermaid_diagram": "A Mermaid.js flowchart diagram showing the system architecture. CRITICAL SYNTAX RULES: (1) Start with exactly 'flowchart TB' on first line, (2) Use simple node syntax: id[Label] or id((Label)), (3) Use simple arrows: --> or ---|label|-->, (4) NO special characters in node IDs (only letters/numbers), (5) Keep it simple and valid. Example format:\nflowchart TB\n    User[User/Client]\n    Frontend[React Frontend]\n    API[Node.js API]\n    DB[(Database)]\n    User-->Frontend\n    Frontend-->API\n    API-->DB\nInclude all major components with clear data flow.",

  "component_explanations": {
    "frontend": "What the frontend does and why this specific choice",
    "backend": "What the backend does and why this specific choice",
    "database": "What the database does and why this specific choice",
    "hosting": "Why this hosting choice and specific services",
    "authentication": "How authentication works in this system",
    "caching": "How caching improves performance",
    "monitoring": "How monitoring helps maintain reliability",
    "security": "Comprehensive security measures and why they matter"
  },

  "deployment_strategy": {
    "ci_cd": "CI/CD pipeline recommendation (GitHub Actions, Jenkins, CircleCI)",
    "environments": "Dev, Staging, Production environment setup",
    "deployment_method": "Blue-green, canary, rolling deployment strategy",
    "rollback_plan": "How to rollback if deployment fails",
    "infrastructure_as_code": "Terraform, CloudFormation, or other IaC tools"
  },

  "first_steps": [
    "Step 1: Concrete first action with specific tool/service",
    "Step 2: Next action",
    "Step 3: Next action",
    "Step 4: Next action",
    "Step 5: Next action",
    "Step 6: Next action (if needed for complexity)",
    "Step 7: Next action (if needed for complexity)"
  ],

  "cost_estimate": {
    "initial_monthly": "Estimated monthly cost for MVP/initial launch",
    "year_1_monthly": "Estimated monthly cost at end of Year 1",
    "breakdown": "Cost breakdown by service (hosting, database, storage, etc.)",
    "cost_optimization_tips": "Ways to reduce costs without sacrificing quality"
  },

  "risks_and_gotchas": [
    "Important risk or consideration 1 with mitigation strategy",
    "Important risk or consideration 2 with mitigation strategy",
    "Important risk or consideration 3 with mitigation strategy",
    "Important risk or consideration 4 (if applicable)",
    "Important risk or consideration 5 (if applicable)"
  ],

  "monitoring_and_alerts": {
    "metrics_to_track": ["API response time", "Error rates", "Database query performance", etc.],
    "alerting_strategy": "When and how to get alerted about issues",
    "logging_approach": "Centralized logging solution",
    "uptime_monitoring": "How to monitor uptime and availability"
  }
}

CRITICAL RULES:
1. Return ONLY valid JSON, no markdown formatting, no code blocks, no additional text
2. Make the mermaid_diagram extremely detailed and professional with proper syntax
3. Tailor ALL recommendations to the user's skill level
4. If compliance keywords detected (health, medical, HIPAA, payment, credit card, PCI), provide EXHAUSTIVE compliance details
5. Be extremely specific and actionable, not generic
6. Consider the timeline and user count in ALL recommendations
7. Include EVERYTHING needed for production: Auth, DB schemas, API endpoints, cloud configs, monitoring, security
8. For databases, suggest actual table structures if relevant
9. For APIs, list the 5-10 most critical endpoints
10. For cloud infrastructure, name specific services (not just "use AWS" but "use AWS Lambda + API Gateway + RDS")

Generate the comprehensive JSON response now:`;
}

// Quality scoring function for comparing outputs
function scoreArchitectureQuality(data) {
  let score = 0;

  // Check completeness of sections
  if (data.authentication_system) score += 10;
  if (data.database_design) score += 10;
  if (data.api_design) score += 10;
  if (data.cloud_infrastructure) score += 10;
  if (data.security_architecture) score += 15;
  if (data.deployment_strategy) score += 10;
  if (data.monitoring_and_alerts) score += 10;

  // Check compliance depth
  if (data.compliance_notes && data.compliance_notes.length > 100) score += 10;

  // Check mermaid diagram quality
  if (data.mermaid_diagram && data.mermaid_diagram.includes('flowchart')) score += 5;

  // Check detail in tech stack
  if (data.tech_stack && Object.keys(data.tech_stack).length >= 8) score += 10;

  return score;
}

// Call Claude API
async function callClaude(prompt) {
  return callClaudeWithModel(prompt, process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514');
}

// Call Claude API with specific model
async function callClaudeWithModel(prompt, model) {
  try {
    const message = await claudeClient.messages.create({
      model: model,
      max_tokens: 8192, // Increased for comprehensive output
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return {
      text: message.content[0].text,
      provider: 'Claude',
      model: model
    };
  } catch (error) {
    console.error('Claude API error:', error.message);
    throw error;
  }
}

// Call OpenAI API
async function callOpenAI(prompt) {
  return callOpenAIWithModel(prompt, process.env.OPENAI_MODEL || 'gpt-4-turbo-preview');
}

// Call OpenAI API with specific model
async function callOpenAIWithModel(prompt, model) {
  try {
    const completion = await openaiClient.chat.completions.create({
      model: model,
      messages: [{
        role: 'system',
        content: 'You are Archie, an elite system architect. You always respond with comprehensive, valid JSON only, no markdown formatting.'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' }
    });

    return {
      text: completion.choices[0].message.content,
      provider: 'OpenAI',
      model: model
    };
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw error;
  }
}

// Call Gemini API
async function callGemini(prompt) {
  return callGeminiWithModel(prompt, process.env.GEMINI_MODEL || 'gemini-2.5-flash');
}

// Call Gemini API with specific model
async function callGeminiWithModel(prompt, modelName) {
  try {
    const model = geminiClient.getGenerativeModel({
      model: modelName
    });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: 'You are Archie, an elite system architect. You MUST respond with ONLY valid JSON (no markdown code blocks, no explanations before or after). Your entire response should be parseable JSON starting with { and ending with }.\n\n' + prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192
      }
    });

    const response = await result.response;
    return {
      text: response.text(),
      provider: 'Gemini',
      model: modelName
    };
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

// Parse JSON from AI response
function parseAIResponse(responseText) {
  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    // Try to extract JSON from markdown code blocks
    let cleanText = responseText.trim();

    // Remove markdown code blocks
    const jsonMatch = cleanText.match(/```json\s*([\s\S]*?)\s*```/) ||
                      cleanText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanText = jsonMatch[1].trim();
    }

    // Try to find JSON object boundaries
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(cleanText);
      } catch (e) {
        console.error('Extracted text:', cleanText.substring(0, 200));
        throw new Error('Failed to parse extracted JSON');
      }
    }

    console.error('Response text:', responseText.substring(0, 500));
    throw new Error('Failed to parse AI response as JSON - no valid JSON found');
  }
}

// Validate Mermaid diagram syntax
function validateMermaidSyntax(diagram) {
  if (!diagram || typeof diagram !== 'string') {
    return { valid: false, error: 'Diagram is empty or not a string' };
  }

  const lines = diagram.trim().split('\n');

  // Check if starts with flowchart
  if (!lines[0].trim().match(/^flowchart\s+(TB|TD|LR|RL|BT)/)) {
    return { valid: false, error: 'Must start with "flowchart TB" or "flowchart LR"' };
  }

  // Check for common syntax errors
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('%')) continue; // Skip empty lines and comments

    // Check for invalid characters in node IDs
    if (line.match(/^[^a-zA-Z0-9_\s\[\]\(\)\-\>|]+/)) {
      return { valid: false, error: `Invalid node ID on line ${i + 1}: ${line}` };
    }
  }

  return { valid: true };
}

// Validate architecture completeness
function validateArchitectureCompleteness(data) {
  const required = [
    'summary',
    'tech_stack',
    'mermaid_diagram',
    'first_steps',
    'scalability_strategy'
  ];

  const missing = [];
  for (const field of required) {
    if (!data[field]) {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  // Validate tech_stack has minimum fields
  if (!data.tech_stack || Object.keys(data.tech_stack).length < 4) {
    return { valid: false, missing: ['tech_stack needs at least 4 components'] };
  }

  return { valid: true };
}

// Generate simple fallback diagram
function createFallbackDiagram(data) {
  const stack = data.tech_stack || {};

  return `flowchart TB
    User[User/Client]
    Frontend[${stack.frontend ? stack.frontend.split(',')[0] : 'Frontend'}]
    Backend[${stack.backend ? stack.backend.split(',')[0] : 'Backend API'}]
    DB[(${stack.database ? stack.database.split(',')[0] : 'Database'})]
    Auth[${stack.authentication ? stack.authentication.split(',')[0] : 'Authentication'}]

    User-->Frontend
    Frontend-->Backend
    Backend-->Auth
    Backend-->DB
    Auth-->DB`;
}

// Fix Mermaid diagram using AI
async function fixMermaidDiagram(originalDiagram, error, formData) {
  const fixPrompt = `The following Mermaid diagram has a syntax error. Please fix it and return ONLY the corrected Mermaid code (no markdown, no explanation).

ERROR: ${error}

ORIGINAL DIAGRAM:
${originalDiagram}

RULES:
1. Start with "flowchart TB"
2. Use simple node syntax: id[Label] or id((Label)) or id[(Label)]
3. Use simple arrows: --> or ---|label|-->
4. No special characters in node IDs
5. Return ONLY the fixed Mermaid code

System context: ${formData.idea.substring(0, 100)}...

FIXED DIAGRAM:`;

  try {
    let response;
    if (hasGeminiKey && geminiClient) {
      const model = geminiClient.getGenerativeModel({
        model: 'gemini-1.5-flash' // Use faster model for fixes
      });
      const result = await model.generateContent(fixPrompt);
      response = result.response.text();
    } else if (hasOpenAIKey && openaiClient) {
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use faster model for fixes
        messages: [{ role: 'user', content: fixPrompt }],
        temperature: 0.3,
        max_tokens: 1000
      });
      response = completion.choices[0].message.content;
    } else if (hasClaudeKey && claudeClient) {
      const message = await claudeClient.messages.create({
        model: 'claude-3-haiku-20240307', // Use faster model for fixes
        max_tokens: 1000,
        messages: [{ role: 'user', content: fixPrompt }]
      });
      response = message.content[0].text;
    } else {
      throw new Error('No AI provider available for fix');
    }

    // Clean up response (remove markdown if present)
    let fixed = response.trim();
    fixed = fixed.replace(/```mermaid\s*/g, '').replace(/```\s*/g, '');

    return fixed;
  } catch (error) {
    console.error('Failed to fix Mermaid diagram:', error);
    return null;
  }
}

// Main architecture generation with smart provider selection AND validation
async function generateArchitecture(formData) {
  const prompt = createArchitecturePrompt(formData);
  let architectureData = null;
  let provider = null;
  let model = null;

  // STEP 1: Determine which providers to use based on user selection
  const { aiProviders, providerModels } = formData;

  let selectedProviders = [];

  if (aiProviders && aiProviders.length > 0) {
    // User-selected providers from form
    if (aiProviders.includes('gemini') && hasGeminiKey) {
      const geminiModel = providerModels?.gemini || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      selectedProviders.push({
        name: 'Gemini',
        call: () => callGeminiWithModel(prompt, geminiModel),
        model: geminiModel
      });
    }
    if (aiProviders.includes('openai') && hasOpenAIKey) {
      const openaiModel = providerModels?.openai || process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
      selectedProviders.push({
        name: 'OpenAI',
        call: () => callOpenAIWithModel(prompt, openaiModel),
        model: openaiModel
      });
    }
    if (aiProviders.includes('claude') && hasClaudeKey) {
      const claudeModel = providerModels?.claude || process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
      selectedProviders.push({
        name: 'Claude',
        call: () => callClaudeWithModel(prompt, claudeModel),
        model: claudeModel
      });
    }
  } else {
    // Fallback: use all available providers (backward compatibility)
    if (hasGeminiKey) selectedProviders.push({ name: 'Gemini', call: () => callGemini(prompt) });
    if (hasClaudeKey) selectedProviders.push({ name: 'Claude', call: () => callClaude(prompt) });
    if (hasOpenAIKey) selectedProviders.push({ name: 'OpenAI', call: () => callOpenAI(prompt) });
  }

  const availableProviders = selectedProviders;

  if (availableProviders.length > 1) {
    console.log(`🔄 Multiple providers available (${availableProviders.map(p => p.name).join(', ')}) - running parallel comparison...`);

    try {
      // Call all available providers in parallel
      const responses = await Promise.allSettled(
        availableProviders.map(p => p.call())
      );

      // Parse all responses
      const results = [];

      responses.forEach((response, index) => {
        const providerName = availableProviders[index].name;

        if (response.status === 'fulfilled') {
          try {
            const data = parseAIResponse(response.value.text);
            const score = scoreArchitectureQuality(data);
            results.push({
              data: data,
              score: score,
              provider: providerName,
              model: response.value.model
            });
            console.log(`✅ ${providerName} score: ${score}`);
          } catch (e) {
            console.error(`❌ ${providerName} parsing failed:`, e.message);
          }
        } else {
          console.error(`❌ ${providerName} call failed:`, response.reason?.message);
        }
      });

      if (results.length === 0) {
        throw new Error('All providers failed to generate valid architecture');
      }

      // Return the highest scoring result
      results.sort((a, b) => b.score - a.score);
      const winner = results[0];

      console.log(`🏆 Winner: ${winner.provider} (score: ${winner.score})`);

      architectureData = winner.data;
      provider = winner.provider;
      model = winner.model;

    } catch (error) {
      console.error('Parallel comparison failed:', error);
      // Fall through to single provider logic
    }
  }

  // Single provider mode (if parallel failed or only one provider)
  if (!architectureData && hasGeminiKey) {
    console.log('🧠 Using Gemini...');
    const response = await callGemini(prompt);
    architectureData = parseAIResponse(response.text);
    provider = 'Gemini';
    model = response.model;
  }

  if (!architectureData && hasClaudeKey) {
    console.log('🧠 Using Claude...');
    const response = await callClaude(prompt);
    architectureData = parseAIResponse(response.text);
    provider = 'Claude';
    model = response.model;
  }

  if (!architectureData && hasOpenAIKey) {
    console.log('🧠 Using OpenAI...');
    const response = await callOpenAI(prompt);
    architectureData = parseAIResponse(response.text);
    provider = 'OpenAI';
    model = response.model;
  }

  if (!architectureData) {
    throw new Error('NO_API_KEYS');
  }

  // STEP 2: Validate completeness
  console.log('🔍 Validating architecture completeness...');
  const completenessCheck = validateArchitectureCompleteness(architectureData);
  if (!completenessCheck.valid) {
    console.warn('⚠️  Architecture incomplete, missing:', completenessCheck.missing);
    // Continue anyway, but log warning
  }

  // STEP 3: Validate and fix Mermaid diagram
  console.log('🎨 Validating Mermaid diagram...');
  const diagramCheck = validateMermaidSyntax(architectureData.mermaid_diagram);

  if (!diagramCheck.valid) {
    console.warn(`⚠️  Mermaid diagram invalid: ${diagramCheck.error}`);
    console.log('🔧 Attempting to fix diagram...');

    // Try to fix the diagram
    const fixedDiagram = await fixMermaidDiagram(
      architectureData.mermaid_diagram,
      diagramCheck.error,
      formData
    );

    if (fixedDiagram) {
      const fixedCheck = validateMermaidSyntax(fixedDiagram);
      if (fixedCheck.valid) {
        console.log('✅ Diagram fixed successfully!');
        architectureData.mermaid_diagram = fixedDiagram;
      } else {
        console.warn('⚠️  Fix attempt failed, using fallback diagram');
        architectureData.mermaid_diagram = createFallbackDiagram(architectureData);
        architectureData._diagram_note = 'Using simplified diagram due to syntax errors';
      }
    } else {
      console.warn('⚠️  Could not fix diagram, using fallback');
      architectureData.mermaid_diagram = createFallbackDiagram(architectureData);
      architectureData._diagram_note = 'Using simplified diagram due to syntax errors';
    }
  } else {
    console.log('✅ Diagram validation passed!');
  }

  // STEP 4: Add metadata
  return {
    ...architectureData,
    _meta: {
      provider,
      model,
      validated: true,
      diagram_status: diagramCheck.valid ? 'original' : 'fixed_or_fallback'
    }
  };
}

// API endpoint to generate architecture
app.post('/api/generate-architecture', async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.idea || !formData.userCount || !formData.compliance ||
        !formData.skillLevel || !formData.timeline || !formData.cloudPlatform) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate at least one AI provider is selected
    if (!formData.aiProviders || formData.aiProviders.length === 0) {
      return res.status(400).json({ error: 'Please select at least one AI provider' });
    }

    console.log('\n📐 Generating architecture...');
    console.log('Idea:', formData.idea.substring(0, 60) + '...');

    // Generate architecture with smart provider selection
    const architectureData = await generateArchitecture(formData);

    console.log('✅ Architecture generated successfully\n');
    res.json(architectureData);

  } catch (error) {
    console.error('❌ Error generating architecture:', error);

    // Helpful error messages
    if (error.message === 'NO_API_KEYS') {
      return res.status(500).json({
        error: 'No API keys configured',
        details: 'Please add GOOGLE_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY to your .env file. Run the setup script: ./setup.sh',
        setup_help: 'Google AI: https://aistudio.google.com/app/apikey | OpenAI: https://platform.openai.com/api-keys | Claude: https://console.anthropic.com/'
      });
    }

    if (error.message.includes('insufficient_quota') || error.message.includes('rate_limit')) {
      return res.status(500).json({
        error: 'API quota exceeded',
        details: 'Please add credits to your OpenAI or Claude account.',
        openai_credits: 'https://platform.openai.com/account/billing',
        claude_credits: 'https://console.anthropic.com/settings/billing'
      });
    }

    res.status(500).json({
      error: 'Failed to generate architecture',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const configuredCount = [hasClaudeKey, hasOpenAIKey, hasGeminiKey].filter(Boolean).length;
  const mode = configuredCount > 1 ? 'parallel_comparison' :
               hasGeminiKey ? 'gemini_only' :
               hasClaudeKey ? 'claude_only' :
               hasOpenAIKey ? 'openai_only' : 'no_provider';

  res.json({
    status: 'ok',
    message: 'Archie is ready to architect!',
    providers: {
      gemini: hasGeminiKey ? 'configured' : 'not configured',
      claude: hasClaudeKey ? 'configured' : 'not configured',
      openai: hasOpenAIKey ? 'configured' : 'not configured'
    },
    mode: mode
  });
});

app.listen(PORT, () => {
  console.log('\n🤖 Archie - AI Tech Co-Founder');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log('\n🧠 AI Providers:');

  const configuredProviders = [];
  if (hasGeminiKey) {
    console.log('   ✅ Gemini (configured)');
    configuredProviders.push('Gemini');
  } else {
    console.log('   ⚠️  Gemini (not configured)');
  }

  if (hasClaudeKey) {
    console.log('   ✅ Claude (configured)');
    configuredProviders.push('Claude');
  } else {
    console.log('   ⚠️  Claude (not configured)');
  }

  if (hasOpenAIKey) {
    console.log('   ✅ OpenAI (configured)');
    configuredProviders.push('OpenAI');
  } else {
    console.log('   ⚠️  OpenAI (not configured)');
  }

  console.log('');
  if (configuredProviders.length > 1) {
    console.log(`   🔄 Mode: PARALLEL COMPARISON (${configuredProviders.join(' vs ')}) - Best quality!`);
  } else if (configuredProviders.length === 1) {
    console.log(`   💡 Mode: ${configuredProviders[0]} only`);
    console.log('   💡 Tip: Add more API keys for parallel comparison & better quality');
  } else {
    console.log('   ❌ No API keys configured');
    console.log('   🔧 Run: ./setup.sh to configure');
  }

  console.log('\n');
});
