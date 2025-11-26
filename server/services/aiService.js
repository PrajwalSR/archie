/**
 * AIService - Unified interface for calling AI providers
 * Supports Claude, OpenAI, and Gemini with automatic fallback
 */

// Initialize AI clients based on available API keys
let claudeClient = null;
let openaiClient = null;
let geminiClient = null;

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

class AIService {
  /**
   * Call AI with automatic provider selection
   * @param {string} prompt - The prompt to send
   * @param {string[]} preferredProviders - Ordered list of preferred providers
   * @param {Object} providerModels - Optional specific models per provider {gemini: 'model-name', claude: 'model-name', openai: 'model-name'}
   * @returns {Promise<{text: string, provider: string, model: string}>}
   */
  async callAI(prompt, preferredProviders = ['gemini', 'claude', 'openai'], providerModels = {}) {
    // Try providers in order of preference
    for (const provider of preferredProviders) {
      try {
        if (provider === 'gemini' && hasGeminiKey) {
          const model = providerModels.gemini || process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';
          return await this.callGeminiWithModel(prompt, model);
        } else if (provider === 'claude' && hasClaudeKey) {
          const model = providerModels.claude || process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
          return await this.callClaudeWithModel(prompt, model);
        } else if (provider === 'openai' && hasOpenAIKey) {
          const model = providerModels.openai || process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
          return await this.callOpenAIWithModel(prompt, model);
        }
      } catch (error) {
        console.error(`${provider} failed, trying next provider:`, error.message);
        continue;
      }
    }

    // If all preferred providers failed, try any available with default models
    if (hasGeminiKey) return await this.callGemini(prompt);
    if (hasClaudeKey) return await this.callClaude(prompt);
    if (hasOpenAIKey) return await this.callOpenAI(prompt);

    throw new Error('No AI providers available');
  }

  /**
   * Call Claude API (with default model)
   */
  async callClaude(prompt) {
    return this.callClaudeWithModel(prompt, process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514');
  }

  /**
   * Call Claude API with specific model
   */
  async callClaudeWithModel(prompt, model) {
    const message = await claudeClient.messages.create({
      model,
      max_tokens: 8192,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return {
      text: message.content[0].text,
      provider: 'Claude',
      model
    };
  }

  /**
   * Call OpenAI API (with default model)
   */
  async callOpenAI(prompt) {
    return this.callOpenAIWithModel(prompt, process.env.OPENAI_MODEL || 'gpt-4-turbo-preview');
  }

  /**
   * Call OpenAI API with specific model
   */
  async callOpenAIWithModel(prompt, model) {
    const completion = await openaiClient.chat.completions.create({
      model,
      messages: [{
        role: 'system',
        content: 'You are an expert system architect. You always respond with valid JSON only, no markdown formatting.'
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
      model
    };
  }

  /**
   * Call Gemini API (with default model)
   */
  async callGemini(prompt) {
    return this.callGeminiWithModel(prompt, process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp');
  }

  /**
   * Call Gemini API with specific model
   */
  async callGeminiWithModel(prompt, modelName) {
    const model = geminiClient.getGenerativeModel({
      model: modelName
    });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: 'You are an expert system architect. You MUST respond with ONLY valid JSON (no markdown code blocks, no explanations before or after). Your entire response should be parseable JSON starting with { or [ and ending with } or ].\n\n' + prompt
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
  }

  /**
   * Parse JSON response with fallback cleaning
   */
  parseJSONResponse(responseText) {
    // Try direct parse first
    try {
      return JSON.parse(responseText);
    } catch (e) {
      // Clean and retry
      let cleanText = responseText.trim();

      // Remove markdown code blocks
      const jsonMatch = cleanText.match(/```json\s*([\s\S]*?)\s*```/) ||
        cleanText.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanText = jsonMatch[1].trim();
      }

      // Find JSON boundaries
      const firstBrace = cleanText.indexOf('{');
      const firstBracket = cleanText.indexOf('[');
      const startIndex = firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)
        ? firstBrace
        : firstBracket;

      if (startIndex !== -1) {
        const lastBrace = cleanText.lastIndexOf('}');
        const lastBracket = cleanText.lastIndexOf(']');
        const endIndex = lastBrace > lastBracket ? lastBrace : lastBracket;

        if (endIndex !== -1 && endIndex > startIndex) {
          cleanText = cleanText.substring(startIndex, endIndex + 1);

          // Remove comments and trailing commas
          cleanText = cleanText
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/,(\s*[}\]])/g, '$1');

          return JSON.parse(cleanText);
        }
      }

      throw new Error('Failed to parse JSON response');
    }
  }
}

module.exports = new AIService();
