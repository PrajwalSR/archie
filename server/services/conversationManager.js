const { v4: uuidv4 } = require('uuid');

/**
 * ConversationManager - Manages conversation sessions and state
 * Phase 1: In-memory storage
 * Phase 2: Migrate to Redis for persistence
 */
class ConversationManager {
  constructor() {
    // In-memory storage using Map
    this.conversations = new Map();
    console.log('ConversationManager initialized (in-memory mode)');
  }

  /**
   * Create a new conversation
   */
  create(formData) {
    const conversation = {
      id: uuidv4(),
      phase: 'COMPONENT_DISCOVERY',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      formData,
      messages: [],
      discoveredComponents: [],
      approvedComponents: [],
      componentDetails: {},
      deepDiveProgress: {}
    };

    this.conversations.set(conversation.id, conversation);
    console.log(`Created conversation: ${conversation.id}`);
    return conversation;
  }

  /**
   * Get conversation by ID
   */
  get(id) {
    const conversation = this.conversations.get(id);
    if (!conversation) {
      throw new Error(`Conversation not found: ${id}`);
    }
    return conversation;
  }

  /**
   * Update conversation
   */
  update(id, updates) {
    const conversation = this.get(id);

    const updated = {
      ...conversation,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.conversations.set(id, updated);
    return updated;
  }

  /**
   * Add message to conversation
   */
  addMessage(id, role, content) {
    const conversation = this.get(id);
    conversation.messages.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });
    this.update(id, { messages: conversation.messages });
  }

  /**
   * Set discovered components
   */
  setComponents(id, components) {
    this.update(id, { discoveredComponents: components });
  }

  /**
   * Approve components (transition to deep dive phase)
   */
  approveComponents(id) {
    const conversation = this.get(id);
    this.update(id, {
      approvedComponents: conversation.discoveredComponents,
      phase: 'DEEP_DIVE'
    });
  }

  /**
   * Set component detail
   */
  setComponentDetail(id, componentId, details) {
    const conversation = this.get(id);
    conversation.componentDetails[componentId] = details;
    this.update(id, { componentDetails: conversation.componentDetails });
  }

  /**
   * Update deep dive progress for a component
   */
  updateDeepDiveProgress(id, componentId, status) {
    const conversation = this.get(id);
    conversation.deepDiveProgress[componentId] = status;
    this.update(id, { deepDiveProgress: conversation.deepDiveProgress });
  }

  /**
   * Get all conversations (for debugging)
   */
  getAll() {
    return Array.from(this.conversations.values());
  }

  /**
   * Delete conversation
   */
  delete(id) {
    this.conversations.delete(id);
  }

  /**
   * TODO: Migrate to Redis
   * async migrateToRedis() {
   *   const redis = require('redis');
   *   const client = redis.createClient();
   *   // Migration logic
   * }
   */
}

module.exports = new ConversationManager();
