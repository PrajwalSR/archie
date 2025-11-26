# Archie - API Documentation

Complete API reference for Archie's conversational architecture system.

## Base URL

**Development:** `http://localhost:3000`
**Production:** `https://your-domain.com`

## API Endpoints

- [Health Check](#health-check)
- [Create Conversation](#create-conversation)
- [Send Message](#send-message)
- [Approve Components](#approve-components)
- [Deep Dive Progress (SSE)](#deep-dive-progress-sse)
- [Get Diagram Data](#get-diagram-data)
- [Get Component Details](#get-component-details)

---

## Health Check

Check API status and configured providers.

### Endpoint
```
GET /api/health
```

### Request
No parameters required.

### Response

```json
{
  "status": "ok",
  "message": "Archie v2.0 - Conversational Architecture System",
  "providers": {
    "gemini": "configured",
    "claude": "configured",
    "openai": "not configured"
  },
  "activeSessions": 3
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | API status ("ok") |
| `message` | string | System description |
| `providers` | object | AI provider status |
| `activeSessions` | number | Active conversation count |

### Example

```bash
curl http://localhost:3000/api/health
```

---

## Create Conversation

**Phase 1: Component Discovery**

Create a new conversation and discover architecture components.

### Endpoint
```
POST /api/conversations
```

### Request Body

```json
{
  "idea": "A marketplace for local farmers to sell directly to consumers",
  "userCount": "1,000-10,000 (Scaling)",
  "compliance": "None",
  "skillLevel": "Intermediate (Built projects)",
  "timeline": "2-3 months (Solid MVP)",
  "cloudPlatform": "Google Cloud (GCP)",
  "aiProviders": ["gemini", "claude", "openai"],
  "providerModels": {
    "gemini": "gemini-2.0-flash-exp",
    "claude": "claude-sonnet-4-20250514",
    "openai": "gpt-4-turbo-preview"
  }
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `idea` | string | Yes | Product description |
| `userCount` | string | Yes | Expected users (Year 1) |
| `compliance` | string | Yes | Compliance needs |
| `skillLevel` | string | Yes | Technical skill level |
| `timeline` | string | Yes | Launch timeline |
| `cloudPlatform` | string | Yes | Cloud platform preference |
| `aiProviders` | array | Yes | List of AI providers to use |
| `providerModels` | object | No | Specific models per provider |

### Response

```json
{
  "conversationId": "a199bed7-13d9-4cd7-a839-0bbb1026ccaf",
  "phase": "COMPONENT_DISCOVERY",
  "components": [
    {
      "id": "comp-1",
      "category": "Frontend",
      "name": "Web Application",
      "value": "Next.js",
      "rationale": "SEO-friendly, great developer experience..."
    },
    {
      "id": "comp-2",
      "category": "Backend",
      "name": "API Server",
      "value": "Node.js + Express",
      "rationale": "Fast, scalable, matches frontend..."
    }
  ],
  "message": "I've identified 5 core components for your marketplace..."
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `conversationId` | string | UUID for this conversation |
| `phase` | string | Current phase ("COMPONENT_DISCOVERY") |
| `components` | array | Discovered components |
| `message` | string | Assistant message |

### Component Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique component ID |
| `category` | string | Component category |
| `name` | string | Component name |
| `value` | string | Recommended technology |
| `rationale` | string | Why this was chosen |

### Example

```bash
curl -X POST http://localhost:3000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "Doctor appointment booking app",
    "userCount": "100-1,000 (Early Growth)",
    "compliance": "HIPAA (Healthcare)",
    "skillLevel": "Beginner (Learning to code)",
    "timeline": "1 month (Quick MVP)",
    "cloudPlatform": "Amazon Web Services (AWS)",
    "aiProviders": ["gemini"],
    "providerModels": {
      "gemini": "gemini-2.0-flash-exp"
    }
  }'
```

### Error Response

```json
{
  "error": "All required fields must be provided",
  "details": "Missing required field: idea"
}
```

---

## Send Message

**Phase 2: Interactive Refinement**

Refine components through conversation.

### Endpoint
```
POST /api/conversations/:id/messages
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Conversation ID from Phase 1 |

### Request Body

```json
{
  "message": "Use PostgreSQL instead of MySQL"
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | User refinement request |

### Response

```json
{
  "phase": "INTERACTIVE_REFINEMENT",
  "components": [
    {
      "id": "comp-3",
      "category": "Database",
      "name": "Primary Database",
      "value": "PostgreSQL",
      "rationale": "As requested, PostgreSQL provides..."
    }
  ],
  "message": "I've updated the architecture based on your request...",
  "requiresApproval": true
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/conversations/a199bed7-13d9-4cd7-a839-0bbb1026ccaf/messages \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Add Redis for caching"
  }'
```

---

## Approve Components

**Phase 3 Trigger**

Approve components and start deep dive.

### Endpoint
```
POST /api/conversations/:id/approve
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Conversation ID |

### Request Body

No body required.

### Response

```json
{
  "phase": "DEEP_DIVE",
  "message": "Great! Now fetching detailed configurations for each component..."
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/conversations/a199bed7-13d9-4cd7-a839-0bbb1026ccaf/approve
```

---

## Deep Dive Progress (SSE)

**Phase 3: Deep Dive**

Server-Sent Events stream for real-time progress updates.

### Endpoint
```
GET /api/conversations/:id/deep-dive/progress
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Conversation ID |

### Response Type

`text/event-stream` (Server-Sent Events)

### Event Format

```
data: {"component": "Database", "status": "fetching"}

data: {"component": "Database", "status": "complete"}

data: {"component": "Cache", "status": "fetching"}

data: {"component": "Cache", "status": "complete"}

data: {"status": "all_complete"}
```

### Event Data Fields

| Field | Type | Description |
|-------|------|-------------|
| `component` | string | Component name being processed |
| `status` | string | Status: "fetching", "complete", "failed" |

### Final Event

```json
{
  "status": "all_complete"
}
```

### Error Event

```json
{
  "error": "Error message here"
}
```

### Example (JavaScript)

```javascript
const eventSource = new EventSource(
  'http://localhost:3000/api/conversations/a199bed7-13d9-4cd7-a839-0bbb1026ccaf/deep-dive/progress'
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.status === 'all_complete') {
    eventSource.close();
    console.log('Deep dive complete!');
  } else {
    console.log(`${data.component}: ${data.status}`);
  }
};

eventSource.onerror = (error) => {
  console.error('SSE Error:', error);
  eventSource.close();
};
```

---

## Get Diagram Data

**Phase 4: Diagram Display**

Get components and their detailed configurations for diagram display.

### Endpoint
```
GET /api/conversations/:id/diagram
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Conversation ID |

### Response

```json
{
  "components": [
    {
      "id": "comp-1",
      "category": "Frontend",
      "name": "Web Application",
      "value": "Next.js",
      "rationale": "SEO-friendly..."
    }
  ],
  "componentDetails": {
    "comp-1": {
      "configuration": {
        "settings": [
          {
            "key": "Framework",
            "value": "Next.js 14",
            "reason": "Latest stable version"
          }
        ],
        "setupSteps": [
          "npx create-next-app@latest my-app",
          "cd my-app",
          "npm run dev"
        ]
      },
      "bestPractices": [
        "Use App Router for better performance",
        "Implement ISR for dynamic content"
      ],
      "securityNotes": [
        "Enable CSRF protection",
        "Sanitize user inputs"
      ],
      "estimatedCost": "$10-50/month for hosting on Vercel"
    }
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `components` | array | Approved components |
| `componentDetails` | object | Details keyed by component ID |

### Component Details Object

| Field | Type | Description |
|-------|------|-------------|
| `configuration` | object | Settings and setup steps |
| `bestPractices` | array | Recommended practices |
| `securityNotes` | array | Security considerations |
| `estimatedCost` | string | Cost estimate |

### Example

```bash
curl http://localhost:3000/api/conversations/a199bed7-13d9-4cd7-a839-0bbb1026ccaf/diagram
```

---

## Get Component Details

Get details for a specific component.

### Endpoint
```
GET /api/conversations/:id/components/:componentId/details
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Conversation ID |
| `componentId` | string | Component ID |

### Response

```json
{
  "configuration": {
    "settings": [
      {
        "key": "Database",
        "value": "PostgreSQL 15",
        "reason": "Latest stable version with better performance"
      }
    ],
    "setupSteps": [
      "Install PostgreSQL on your server",
      "Create database: createdb myapp_production",
      "Configure connection pooling"
    ]
  },
  "bestPractices": [
    "Use connection pooling (pg-pool)",
    "Enable SSL for remote connections",
    "Regular backups with pg_dump"
  ],
  "securityNotes": [
    "Never expose database port directly",
    "Use strong passwords",
    "Enable row-level security"
  ],
  "estimatedCost": "$25-100/month on managed services (AWS RDS, GCP Cloud SQL)"
}
```

### Example

```bash
curl http://localhost:3000/api/conversations/a199bed7-13d9-4cd7-a839-0bbb1026ccaf/components/comp-3/details
```

### Error Response

```json
{
  "error": "Component details not found"
}
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

| Status Code | Meaning |
|-------------|---------|
| `200` | Success |
| `400` | Bad Request (missing/invalid parameters) |
| `404` | Not Found (conversation/component doesn't exist) |
| `500` | Internal Server Error |

### Error Response Format

```json
{
  "error": "Error description",
  "details": "Additional error details"
}
```

---

## Rate Limiting

**Not currently implemented**

For production, consider:
- 100 requests per 15 minutes per IP
- Higher limits for authenticated users

---

## Authentication

**Not currently implemented**

Current version uses in-memory sessions with UUID-based conversation IDs.

For production, consider:
- JWT tokens
- Session-based auth
- API keys for programmatic access

---

## Conversation Lifecycle

```
1. POST /api/conversations
   → Creates conversation, discovers components
   → Returns conversationId + components
   
2. POST /api/conversations/:id/messages (optional, repeatable)
   → Refines components based on user feedback
   → Returns updated components
   
3. POST /api/conversations/:id/approve
   → Approves components, triggers deep dive
   → Returns confirmation
   
4. GET /api/conversations/:id/deep-dive/progress (SSE)
   → Streams real-time progress
   → Fetches details for all components in parallel
   → Closes when all complete
   
5. GET /api/conversations/:id/diagram
   → Returns components + full details
   → Used for diagram rendering
```

---

## Frontend Integration Example

Complete flow using fetch API:

```javascript
// Phase 1: Create Conversation
const response1 = await fetch('http://localhost:3000/api/conversations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idea: 'Doctor appointment booking app',
    userCount: '100-1,000 (Early Growth)',
    compliance: 'HIPAA (Healthcare)',
    skillLevel: 'Intermediate (Built projects)',
    timeline: '2-3 months (Solid MVP)',
    cloudPlatform: 'Amazon Web Services (AWS)',
    aiProviders: ['gemini'],
    providerModels: { gemini: 'gemini-2.0-flash-exp' }
  })
});

const { conversationId, components } = await response1.json();

// Phase 2: Refine (optional)
const response2 = await fetch(
  `http://localhost:3000/api/conversations/${conversationId}/messages`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Add Redis for caching' })
  }
);

const { components: updatedComponents } = await response2.json();

// Phase 3: Approve
await fetch(
  `http://localhost:3000/api/conversations/${conversationId}/approve`,
  { method: 'POST' }
);

// Phase 3: Deep Dive (SSE)
const eventSource = new EventSource(
  `http://localhost:3000/api/conversations/${conversationId}/deep-dive/progress`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.status === 'all_complete') {
    eventSource.close();
    loadDiagram();
  }
};

// Phase 4: Get Diagram Data
async function loadDiagram() {
  const response = await fetch(
    `http://localhost:3000/api/conversations/${conversationId}/diagram`
  );
  const diagramData = await response.json();
  renderDiagram(diagramData);
}
```

---

## Notes

- Conversations are stored in-memory (lost on server restart)
- No authentication required (consider for production)
- SSE connections automatically close on completion
- AI provider fallback is automatic if primary fails

---

## Future API Additions

Potential future endpoints:

- `GET /api/conversations` - List all conversations
- `GET /api/conversations/:id` - Get conversation state
- `DELETE /api/conversations/:id` - Delete conversation
- `POST /api/conversations/:id/export` - Export architecture
- `GET /api/models` - List available AI models

---

For implementation details, see source code in `server/server.js`.
