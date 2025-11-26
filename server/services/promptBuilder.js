/**
 * PromptBuilder - Generates phase-specific prompts for AI
 * Each phase has a focused, optimized prompt
 */
class PromptBuilder {
  /**
   * Phase 1: Component Discovery
   * Returns focused prompt for identifying core infrastructure components
   */
  buildDiscoveryPrompt(formData) {
    const cloudGuidance = formData.cloudPlatform && formData.cloudPlatform !== 'No Preference'
      ? `\n- CRITICAL: User prefers ${formData.cloudPlatform}. Prioritize ${formData.cloudPlatform} services.`
      : '';

    return `You are an expert system architect. Analyze this product idea and identify ONLY the core infrastructure components needed.

PRODUCT IDEA: ${formData.idea}

CONTEXT:
- Expected users in Year 1: ${formData.userCount}
- Compliance requirements: ${formData.compliance}
- Builder's technical skill level: ${formData.skillLevel}
- Timeline to launch: ${formData.timeline}${cloudGuidance}

INSTRUCTIONS:
1. Identify 5-8 core components from these categories:
   - authentication: Auth service, OAuth provider (Firebase Auth, AWS Cognito, Auth0)
   - database: Primary database (PostgreSQL, MongoDB, DynamoDB)
   - cache: Caching layer if needed (Redis, Memcached)
   - server: Compute platform (Cloud Run, Lambda, EC2, App Engine)
   - load_balancer: Load balancer if needed (Cloud Load Balancer, ALB, Nginx)
   - storage: File/object storage if needed (S3, GCS, Azure Blob)
   - cdn: CDN if needed (CloudFront, Cloud CDN, Cloudflare)
   - monitoring: Observability platform (Cloud Monitoring, DataDog, New Relic)

2. For each component, provide:
   - id: Category identifier (lowercase, underscore)
   - name: Human-readable component name
   - value: Specific technology/service (e.g., "AWS Cognito" not just "auth")
   - category: One of the categories above
   - rationale: Brief justification (one sentence explaining why)

3. Return ONLY a JSON array, no markdown formatting:
[
  {
    "id": "auth",
    "name": "Authentication",
    "value": "Firebase Auth",
    "category": "authentication",
    "rationale": "Managed service with social login, MFA, and easy integration"
  },
  {
    "id": "database",
    "name": "Database",
    "value": "Cloud SQL (PostgreSQL)",
    "category": "database",
    "rationale": "Relational database for structured data with ACID compliance"
  }
]

CRITICAL RULES:
- Return valid JSON only
- No markdown code blocks (no \`\`\`json)
- No explanations before or after the JSON
- 5-8 components maximum
- Be specific about technologies (not generic)
- Consider the user count and timeline in your choices
- If compliance requires specific features (HIPAA, PCI-DSS), ensure compatible services

Generate the JSON array now:`;
  }

  /**
   * Phase 2: Refinement
   * Updates components based on user feedback
   */
  buildRefinementPrompt(currentComponents, userMessage) {
    return `Current architecture components:
${JSON.stringify(currentComponents, null, 2)}

User request: "${userMessage}"

INSTRUCTIONS:
Update the components based on the user's request. Common scenarios:
- Switch cloud providers: Replace all services with provider-specific equivalents (GCP → AWS, AWS → Azure, etc.)
- Add a component: Include it in the array with proper format
- Remove a component: Filter it out
- Change a specific service: Update that component's value and rationale

Return the updated JSON array of components. Use the same format as the original:
[
  {
    "id": "component_id",
    "name": "Component Name",
    "value": "Specific Technology",
    "category": "category_name",
    "rationale": "Brief reason"
  }
]

CRITICAL:
- Return valid JSON only
- No markdown code blocks
- Maintain the same structure
- Keep rationales updated to reflect changes

Generate the updated JSON array now:`;
  }

  /**
   * Phase 3: Deep Dive (Per Component)
   * Gets detailed configuration for a specific component
   */
  buildDeepDivePrompt(component, formData) {
    const complianceNote = formData.compliance && formData.compliance !== 'None'
      ? `\n- Compliance: ${formData.compliance} - Include relevant compliance considerations`
      : '';

    return `You are configuring ${component.value} (${component.name}) for a production system.

PRODUCT CONTEXT:
- Product idea: ${formData.idea}
- User count: ${formData.userCount}
- Cloud platform: ${formData.cloudPlatform}${complianceNote}

INSTRUCTIONS:
Provide detailed configuration information in JSON format:

{
  "configuration": {
    "settings": [
      {
        "key": "Setting Name",
        "value": "Recommended value",
        "reason": "Why this value is appropriate"
      }
    ],
    "setupSteps": [
      "Step 1: Specific action to take",
      "Step 2: Next action",
      "Step 3: Configuration details"
    ],
    "bestPractices": [
      "Best practice description and why it matters",
      "Another important practice"
    ],
    "securityNotes": [
      "Security consideration or requirement",
      "Another security practice"
    ]
  },
  "dependencies": ["component_id_1", "component_id_2"],
  "estimatedCost": "Cost range (e.g., $50-100/month for initial scale)"
}

IMPORTANT GUIDELINES:
- Focus on CONFIGURATION and SETUP, not code
- Be specific to ${formData.cloudPlatform} services and console
- Include ${formData.compliance} compliance requirements if relevant
- Provide 4-6 key settings
- Include 5-8 setup steps that are actionable
- List 3-5 best practices
- Include 2-4 security notes
- NO code snippets - only config settings, console instructions, and best practices
- Dependencies should reference other component IDs from the architecture

Generate the JSON configuration now:`;
  }
}

module.exports = new PromptBuilder();
