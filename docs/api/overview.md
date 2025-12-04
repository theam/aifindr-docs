# API Overview

The AIFindr API is a RESTful API that provides programmatic access to all AIFindr features. This documentation covers the available endpoints, authentication methods, and usage examples.

## Base URL

```
http://localhost:8080
```

For production environments, use your deployed server's URL.

## Authentication

AIFindr uses JWT (JSON Web Tokens) for authentication. Include your token in the `Authorization` header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### API Keys

For machine-to-machine communication, you can use API keys. API keys have specific permissions and can be created in the admin panel.

#### Generating API Keys (Development)

```bash
# Generate for stage environment
go run ./internal/tools/api-key-gen -env=stage

# Generate for production environment
go run ./internal/tools/api-key-gen -env=prod
```

## Permissions

AIFindr uses a permission-based authorization system. Users and API keys must have the appropriate permissions to perform actions.

Common permissions include:

- `project:read` - View projects
- `project:create` - Create new projects
- `project:update` - Update existing projects
- `project:delete` - Delete projects
- `ingestion:create` - Start data ingestion
- `ingestion:read` - View ingestion status

For a complete list of permissions, see the [Permissions Reference](./permissions.md).

## API Sections

### Admin API

The admin API provides management capabilities for projects, users, and system configuration.

Base path: `/admin/api`

- [Projects](./projects.md) - Manage projects
- [Ingestions](./ingestions.md) - Manage data ingestion
- [Users](./users.md) - User management

### Public API

The public API provides search and query capabilities.

Base path: `/api`

- [Search](./search.md) - Search endpoints
- [Chat](./chat.md) - Conversational AI endpoints

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## HTTP Status Codes

AIFindr uses standard HTTP status codes:

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `204 No Content` - Request succeeded with no response body
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Rate limits may apply depending on your deployment configuration. Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000
```

## Versioning

The API is currently at version 1. Future versions will be indicated in the URL path:

```
/api/v2/...
```

## Common Headers

### Request Headers

```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

### Response Headers

```
Content-Type: application/json
X-Request-ID: unique-request-id
```

## Pagination

List endpoints support pagination using query parameters:

```
?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Next Steps

- [Projects API](./projects.md) - Learn about project management
- [Authentication Guide](../guides/authentication.md) - Detailed authentication setup
- [API Examples](./examples.md) - Complete code examples
