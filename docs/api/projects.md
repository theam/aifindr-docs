# Project API Examples

## List Projects

Get all active (non-deleted) projects:

```bash
curl -X GET 'http://localhost:8080/admin/api/projects' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Response example:

```json
[
  {
    "id": 123,
    "name": "Project One",
    "slug": "project-one",
    "collectionName": "collection_one",
    "mainAgentPipeline": "pipeline-1",
    "demoKey": "abc123xyz",
    "ingestionSources": [],
    "branding": {
      "logoImage": "https://example.com/logo.png",
      "brandColor": "#FF5733"
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-02T15:30:00Z"
  },
  {
    "id": 124,
    "name": "Project Two",
    "slug": "project-two",
    "collectionName": "collection_two",
    "mainAgentPipeline": "pipeline-2",
    "demoKey": "def456uvw",
    "ingestionSources": [],
    "createdAt": "2024-01-03T09:00:00Z",
    "updatedAt": "2024-01-03T09:00:00Z"
  }
]
```

## Get Project Details

Get details of a specific project including its last 10 ingestions:

```bash
curl -X GET 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Response example:

```json
{
  "id": 123,
  "name": "Project One",
  "slug": "project-one",
  "collectionName": "collection_one",
  "mainAgentPipeline": "pipeline-1",
  "demoKey": "abc123xyz",
  "ingestionSources": [
    {
      "id": 1,
      "kind": "gcs",
      "source": "bucket/path",
      "output": "output/path"
    }
  ],
  "agents": [
    {
      "id": 1,
      "agentID": "agent1",
      "type": "chat",
      "params": {
        "temperature": 0.7
      }
    }
  ],
  "branding": {
    "logoImage": "https://example.com/logo.png",
    "brandColor": "#FF5733",
    "sloganLineOne": "Your Slogan",
    "sloganLineTwo": "Making AI Better",
    "searchPlaceholder": "Search our knowledge base...",
    "searchSuggestions": ["suggestion 1", "suggestion 2"]
  },
  "lastTenIngestions": [
    {
      "id": 10,
      "status": "completed",
      "createdAt": "2024-01-02T15:30:00Z",
      "updatedAt": "2024-01-02T15:35:00Z"
    }
  ],
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-02T15:30:00Z"
}
```

## Update Project

### Full Update Example

```bash
curl -X PATCH 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Updated Project Name",
    "collectionName": "updated_collection",
    "mainAgentPipeline": "new-pipeline",
    "agents": [
      {
        "agentID": "agent1",
        "type": "chat",
        "params": {
          "temperature": 0.7
        }
      }
    ],
    "branding": {
      "logoImage": "https://example.com/logo.png",
      "brandColor": "#FF5733",
      "sloganLineOne": "Your New Slogan",
      "sloganLineTwo": "Making AI Better",
      "searchPlaceholder": "Search our knowledge base...",
      "searchSuggestions": ["suggestion 1", "suggestion 2"]
    }
  }'
```

### Partial Update Examples

Update only the project name:

```bash
curl -X PATCH 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "New Project Name"
  }'
```

Update only branding colors:

```bash
curl -X PATCH 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "branding": {
      "brandColor": "#FF5733"
    }
  }'
```

Update multiple branding fields:

```bash
curl -X PATCH 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "branding": {
      "logoImage": "https://example.com/new-logo.png",
      "sloganLineOne": "New Slogan",
      "searchSuggestions": ["new suggestion 1", "new suggestion 2"]
    }
  }'
```

## Delete Project

Soft delete a project and its associated data:

```bash
curl -X DELETE 'http://localhost:8080/admin/api/projects/123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Note:

- Replace `YOUR_JWT_TOKEN` with a valid JWT token that has the required permissions (`project:update` or `project:delete`)
- Replace `123` with the actual project ID
- The server will return:
  - 204 No Content for successful deletion
  - 200 OK with updated project data for successful updates
  - 400 Bad Request for invalid input
  - 401 Unauthorized for invalid/missing token
  - 403 Forbidden for missing permissions
  - 404 Not Found if the project doesn't exist
