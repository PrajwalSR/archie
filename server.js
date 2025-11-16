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

// Auto-detect available providers
const hasClaudeKey = !!process.env.ANTHROPIC_API_KEY;
const hasOpenAIKey = !!process.env.OPENAI_API_KEY;

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

// Enhanced Mega-Prompt for Maximum Detail
function createArchitecturePrompt(formData) {
  const { idea, userCount, compliance, skillLevel, timeline } = formData;

  return `You are Archie, an elite AI system architect and technical co-founder with expertise in enterprise-scale architecture design. Your job is to analyze a product idea and generate a COMPREHENSIVE, production-ready system architecture blueprint.

USER'S PRODUCT IDEA:
${idea}

CONTEXT:
- Expected users in Year 1: ${userCount}
- Compliance requirements: ${compliance}
- Builder's technical skill level: ${skillLevel}
- Timeline to launch: ${timeline}

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

  "mermaid_diagram": "A DETAILED Mermaid.js flowchart diagram showing the COMPLETE system architecture. Use proper Mermaid syntax with flowchart TB direction. Include: User/Client, Frontend (Web/Mobile), Load Balancer, Backend/API servers, Authentication Service, Database (Primary + Replicas), Cache Layer, File Storage, External Services (Payment, Email, etc.), Monitoring, and ALL data flow arrows. Make it visually comprehensive and professional.",

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
  try {
    const message = await claudeClient.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 8192, // Increased for comprehensive output
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return {
      text: message.content[0].text,
      provider: 'Claude',
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'
    };
  } catch (error) {
    console.error('Claude API error:', error.message);
    throw error;
  }
}

// Call OpenAI API
async function callOpenAI(prompt) {
  try {
    const completion = await openaiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
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
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'
    };
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw error;
  }
}

// Parse JSON from AI response
function parseAIResponse(responseText) {
  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
                      responseText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    } else {
      throw new Error('Failed to parse AI response as JSON');
    }
  }
}

// Main architecture generation with smart provider selection
async function generateArchitecture(formData) {
  const prompt = createArchitecturePrompt(formData);

  // FUTURE: Parallel comparison when both keys available
  if (hasClaudeKey && hasOpenAIKey) {
    console.log('🔄 Both providers available - running parallel comparison...');

    try {
      // Call both in parallel
      const [claudeResponse, openaiResponse] = await Promise.allSettled([
        callClaude(prompt),
        callOpenAI(prompt)
      ]);

      // Parse both responses
      const results = [];

      if (claudeResponse.status === 'fulfilled') {
        try {
          const claudeData = parseAIResponse(claudeResponse.value.text);
          const claudeScore = scoreArchitectureQuality(claudeData);
          results.push({
            data: claudeData,
            score: claudeScore,
            provider: 'Claude',
            model: claudeResponse.value.model
          });
          console.log(`✅ Claude score: ${claudeScore}`);
        } catch (e) {
          console.error('❌ Claude parsing failed:', e.message);
        }
      }

      if (openaiResponse.status === 'fulfilled') {
        try {
          const openaiData = parseAIResponse(openaiResponse.value.text);
          const openaiScore = scoreArchitectureQuality(openaiData);
          results.push({
            data: openaiData,
            score: openaiScore,
            provider: 'OpenAI',
            model: openaiResponse.value.model
          });
          console.log(`✅ OpenAI score: ${openaiScore}`);
        } catch (e) {
          console.error('❌ OpenAI parsing failed:', e.message);
        }
      }

      if (results.length === 0) {
        throw new Error('Both providers failed to generate valid architecture');
      }

      // Return the highest scoring result
      results.sort((a, b) => b.score - a.score);
      const winner = results[0];

      console.log(`🏆 Winner: ${winner.provider} (score: ${winner.score})`);

      return {
        ...winner.data,
        _meta: {
          provider: winner.provider,
          model: winner.model,
          score: winner.score
        }
      };

    } catch (error) {
      console.error('Parallel comparison failed:', error);
      // Fall through to single provider logic
    }
  }

  // CURRENT: Single provider mode
  if (hasClaudeKey) {
    console.log('🧠 Using Claude (best quality)...');
    const response = await callClaude(prompt);
    const data = parseAIResponse(response.text);
    return {
      ...data,
      _meta: {
        provider: 'Claude',
        model: response.model
      }
    };
  }

  if (hasOpenAIKey) {
    console.log('🧠 Using OpenAI...');
    const response = await callOpenAI(prompt);
    const data = parseAIResponse(response.text);
    return {
      ...data,
      _meta: {
        provider: 'OpenAI',
        model: response.model
      }
    };
  }

  // No providers available
  throw new Error('NO_API_KEYS');
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
        details: 'Please add either ANTHROPIC_API_KEY or OPENAI_API_KEY to your .env file. Run the setup script: ./setup.sh',
        setup_help: 'https://platform.openai.com/api-keys or https://console.anthropic.com/'
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
  res.json({
    status: 'ok',
    message: 'Archie is ready to architect!',
    providers: {
      claude: hasClaudeKey ? 'configured' : 'not configured',
      openai: hasOpenAIKey ? 'configured' : 'not configured'
    },
    mode: (hasClaudeKey && hasOpenAIKey) ? 'parallel_comparison' :
          hasClaudeKey ? 'claude_only' :
          hasOpenAIKey ? 'openai_only' : 'no_provider'
  });
});

app.listen(PORT, () => {
  console.log('\n🤖 Archie - AI Tech Co-Founder');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log('\n🧠 AI Providers:');

  if (hasClaudeKey && hasOpenAIKey) {
    console.log('   ✅ Claude (configured) - Will use for comparison');
    console.log('   ✅ OpenAI (configured) - Will use for comparison');
    console.log('   🔄 Mode: PARALLEL COMPARISON (best quality)');
  } else if (hasClaudeKey) {
    console.log('   ✅ Claude (configured)');
    console.log('   ⚠️  OpenAI (not configured)');
    console.log('   💡 Mode: Claude only');
  } else if (hasOpenAIKey) {
    console.log('   ⚠️  Claude (not configured)');
    console.log('   ✅ OpenAI (configured)');
    console.log('   💡 Mode: OpenAI only');
    console.log('   💡 Tip: Add Claude key for even better quality + parallel comparison');
  } else {
    console.log('   ❌ No API keys configured');
    console.log('   🔧 Run: ./setup.sh to configure');
  }

  console.log('\n');
});
