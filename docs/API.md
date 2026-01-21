# API Documentation

Reference for all available API endpoints in Jones Family Hub.

## Base URL

- **Development:** `http://localhost:3000`
- **Production:** `https://jonesfamily1832.com`

## Endpoints

### Health Check

**Status:** ✅ Implemented
**Purpose:** Deployment monitoring and health verification

#### GET /api/health

Returns the current health status of the server.

**Request:**
```bash
curl http://localhost:3000/api/health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-20T10:30:00.000Z"
}
```

**Use Cases:**
- Kubernetes/Docker health probes
- Load balancer heartbeats
- Uptime monitoring
- Deployment verification

---

## Future Endpoints

The following endpoints are planned for future implementation:

### Members

#### GET /api/members
List all family members

**Response:**
```json
{
  "members": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "branch": "string",
      "generation": "number"
    }
  ]
}
```

#### GET /api/members/:id
Get a specific member

#### POST /api/members
Create a new member

#### PUT /api/members/:id
Update a member

#### DELETE /api/members/:id
Delete a member

### Reunion

#### GET /api/reunion/info
Get reunion details

#### POST /api/reunion/rsvp
Submit RSVP

#### GET /api/reunion/attendees
List RSVPed attendees

### Directory

#### GET /api/directory/search
Search family directory

#### GET /api/directory/branches
List family branches

### Gallery

#### GET /api/gallery/photos
List photos

#### POST /api/gallery/upload
Upload photo

#### DELETE /api/gallery/photos/:id
Delete photo

---

## Authentication (Future)

Future API endpoints will require authentication via Better Auth:

```typescript
// Include auth token in header
Authorization: Bearer <token>
```

---

## Error Handling

### Standard Error Response

All endpoints return consistent error responses:

```json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "status": 400
}
```

### Common Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## Rate Limiting (Future)

Future API endpoints may implement rate limiting:

- **Limit:** 100 requests per minute per IP
- **Header:** `X-RateLimit-Remaining`

---

## API Standards

All API endpoints follow these standards:

1. **REST conventions** - Use standard HTTP methods (GET, POST, PUT, DELETE)
2. **JSON format** - Request/response bodies are JSON
3. **Error consistency** - Standard error response format
4. **Type safety** - All responses have TypeScript types
5. **Documentation** - All endpoints documented with examples

---

## Integration Examples

### JavaScript/TypeScript

```typescript
// GET request
const response = await fetch('/api/health')
const data = await response.json()
console.log(data)

// POST request (future)
const response = await fetch('/api/members', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
})
```

### cURL

```bash
# Health check
curl -X GET http://localhost:3000/api/health

# POST request (future)
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

---

## Pagination (Future)

Future list endpoints will support pagination:

```
GET /api/members?page=1&limit=20
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```

---

## Versioning (Future)

API versions may be supported:

```
GET /api/v1/members      # Version 1
GET /api/v2/members      # Version 2 (future)
```

---

## Changelog

### Implemented
- ✅ GET /api/health

### Planned
- 🔄 Members CRUD
- 🔄 Reunion management
- 🔄 Directory search
- 🔄 Gallery operations

---

## Questions?

- 📖 See [DEVELOPMENT.md](../DEVELOPMENT.md) for implementation patterns
- 🏗️ See [ARCHITECTURE.md](../ARCHITECTURE.md) for project structure
- 🔍 Check [guides/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
