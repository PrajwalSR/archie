require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const conversationManager = require('./services/conversationManager');
const promptBuilder = require('./services/promptBuilder');
const aiService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============================================================================
// API ENDPOINTS - Archie v2.0 Conversation System
// ============================================================================

/**
 * Phase 1: Create Conversation & Component Discovery
 * POST /api/conversations
 */
app.post('/api/conversations', async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.idea || !formData.userCount || !formData.compliance ||
      !formData.skillLevel || !formData.timeline || !formData.cloudPlatform) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    console.log('\n📐 Starting Phase 1: Component Discovery');
    console.log('Idea:', formData.idea.substring(0, 60) + '...');

    // Create conversation
    const conversation = conversationManager.create(formData);

    // Build discovery prompt
    const prompt = promptBuilder.buildDiscoveryPrompt(formData);

    // Call AI with selected providers and models
    const response = await aiService.callAI(
      prompt,
      formData.aiProviders || ['gemini', 'claude', 'openai'],
      formData.providerModels || {}
    );
    console.log(`✓ AI Response received from ${response.provider}`);

    // Parse JSON
    const components = aiService.parseJSONResponse(response.text);

    // Validate components is an array
    if (!Array.isArray(components)) {
      throw new Error('AI response is not an array of components');
    }

    // Save components
    conversationManager.setComponents(conversation.id, components);

    // Add assistant message
    conversationManager.addMessage(
      conversation.id,
      'assistant',
      `I've identified ${components.length} core components for your system.`
    );

    console.log(`✓ Discovered ${components.length} components`);

    res.json({
      conversationId: conversation.id,
      phase: 'COMPONENT_DISCOVERY',
      components,
      message: `I've identified ${components.length} core components for your ${formData.idea}. Review them below. You can ask me to make changes (e.g., "Use AWS instead of GCP") or click "Approve & Continue" when ready.`
    });

  } catch (error) {
    console.error('❌ Component Discovery Error:', error);
    res.status(500).json({
      error: 'Failed to discover components',
      details: error.message
    });
  }
});

/**
 * Phase 2: Send Chat Message (Refinement)
 * POST /api/conversations/:id/messages
 */
app.post('/api/conversations/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`\n💬 Refinement request for conversation ${id}`);
    console.log('User message:', message);

    const conversation = conversationManager.get(id);

    // Build refinement prompt
    const prompt = promptBuilder.buildRefinementPrompt(
      conversation.discoveredComponents,
      message
    );

    // Call AI with selected providers and models
    const response = await aiService.callAI(
      prompt,
      conversation.formData.aiProviders || ['gemini', 'claude', 'openai'],
      conversation.formData.providerModels || {}
    );
    console.log(`✓ Refinement response from ${response.provider}`);

    // Parse updated components
    const updatedComponents = aiService.parseJSONResponse(response.text);

    // Validate
    if (!Array.isArray(updatedComponents)) {
      throw new Error('AI response is not an array of components');
    }

    // Update components
    conversationManager.setComponents(id, updatedComponents);

    // Add messages to history
    conversationManager.addMessage(id, 'user', message);
    conversationManager.addMessage(id, 'assistant', 'I\'ve updated the architecture based on your request.');

    console.log(`✓ Updated to ${updatedComponents.length} components`);

    res.json({
      phase: 'INTERACTIVE_REFINEMENT',
      components: updatedComponents,
      message: 'I\'ve updated the architecture based on your request. Does this look good? You can make more changes or click "Approve & Continue".',
      requiresApproval: true
    });

  } catch (error) {
    console.error('❌ Refinement Error:', error);
    res.status(500).json({
      error: 'Failed to refine components',
      details: error.message
    });
  }
});

/**
 * Phase 3: Approve Components (Start Deep Dive)
 * POST /api/conversations/:id/approve
 */
app.post('/api/conversations/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`\n✓ Components approved for conversation ${id}`);

    conversationManager.approveComponents(id);

    res.json({
      phase: 'DEEP_DIVE',
      message: 'Great! Now fetching detailed configurations for each component...'
    });

  } catch (error) {
    console.error('❌ Approval Error:', error);
    res.status(500).json({
      error: 'Failed to approve components',
      details: error.message
    });
  }
});

/**
 * Phase 3: Deep Dive Progress (Server-Sent Events)
 * GET /api/conversations/:id/deep-dive/progress
 */
app.get('/api/conversations/:id/deep-dive/progress', async (req, res) => {
  const { id } = req.params;

  // Set up Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  console.log(`\n🔄 Starting deep dive for conversation ${id}`);

  try {
    const conversation = conversationManager.get(id);
    const components = conversation.approvedComponents;

    // Progress callback to send SSE events
    const sendProgress = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Fetch all component details in parallel
    const promises = components.map(async (comp) => {
      // Update progress: fetching
      conversationManager.updateDeepDiveProgress(id, comp.id, 'fetching');
      sendProgress({ component: comp.name, status: 'fetching' });

      try {
        // Build deep dive prompt for this component
        const prompt = promptBuilder.buildDeepDivePrompt(comp, conversation.formData);

        // Call AI with selected providers and models
        const response = await aiService.callAI(
          prompt,
          conversation.formData.aiProviders || ['gemini', 'claude', 'openai'],
          conversation.formData.providerModels || {}
        );

        // Parse details
        const details = aiService.parseJSONResponse(response.text);

        // Save details
        conversationManager.setComponentDetail(id, comp.id, details);

        // Update progress: complete
        conversationManager.updateDeepDiveProgress(id, comp.id, 'complete');
        sendProgress({ component: comp.name, status: 'complete' });

        console.log(`✓ Fetched details for ${comp.name}`);
        return { componentId: comp.id, success: true };

      } catch (error) {
        console.error(`❌ Failed to fetch ${comp.name}:`, error.message);

        // Update progress: failed
        conversationManager.updateDeepDiveProgress(id, comp.id, 'failed');
        sendProgress({ component: comp.name, status: 'failed' });

        return { componentId: comp.id, success: false, error: error.message };
      }
    });

    // Wait for all components to finish
    await Promise.all(promises);

    // Update phase to diagram display
    conversationManager.update(id, { phase: 'DIAGRAM_DISPLAY' });

    // Send completion event
    sendProgress({ status: 'all_complete' });

    console.log('✓ Deep dive complete for all components');

    res.end();

  } catch (error) {
    console.error('❌ Deep Dive Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

/**
 * Get Diagram Data
 * GET /api/conversations/:id/diagram
 */
app.get('/api/conversations/:id/diagram', (req, res) => {
  try {
    const { id } = req.params;
    const conversation = conversationManager.get(id);

    res.json({
      components: conversation.approvedComponents,
      componentDetails: conversation.componentDetails
    });

  } catch (error) {
    console.error('❌ Diagram Error:', error);
    res.status(500).json({
      error: 'Failed to get diagram data',
      details: error.message
    });
  }
});

/**
 * Get Specific Component Details
 * GET /api/conversations/:id/components/:componentId/details
 */
app.get('/api/conversations/:id/components/:componentId/details', (req, res) => {
  try {
    const { id, componentId } = req.params;
    const conversation = conversationManager.get(id);

    const details = conversation.componentDetails[componentId];

    if (!details) {
      return res.status(404).json({ error: 'Component details not found' });
    }

    res.json(details);

  } catch (error) {
    console.error('❌ Component Details Error:', error);
    res.status(500).json({
      error: 'Failed to get component details',
      details: error.message
    });
  }
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/api/health', (req, res) => {
  const hasClaudeKey = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasGeminiKey = !!process.env.GOOGLE_API_KEY;

  const providers = {
    gemini: hasGeminiKey ? 'configured' : 'not configured',
    claude: hasClaudeKey ? 'configured' : 'not configured',
    openai: hasOpenAIKey ? 'configured' : 'not configured'
  };

  res.json({
    status: 'ok',
    message: 'Archie v2.0 - Conversational Architecture System',
    providers,
    activeSessions: conversationManager.getAll().length
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log('\n🤖 Archie v2.0 - Conversational Architecture System');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log('\n🧠 AI Providers:');

  const hasClaudeKey = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasGeminiKey = !!process.env.GOOGLE_API_KEY;

  if (hasGeminiKey) console.log('   ✅ Gemini (configured)');
  else console.log('   ⚠️  Gemini (not configured)');

  if (hasClaudeKey) console.log('   ✅ Claude (configured)');
  else console.log('   ⚠️  Claude (not configured)');

  if (hasOpenAIKey) console.log('   ✅ OpenAI (configured)');
  else console.log('   ⚠️  OpenAI (not configured)');

  console.log('\n📋 System: Multi-phase conversational mode');
  console.log('');
});
