# Projects

Projects are the core organizational unit in AIFindr. Each project represents an isolated knowledge base with its own configuration, branding, and data.

## What is a Project?

A project in AIFindr encapsulates:

- **Knowledge Base**: A collection of documents and embeddings
- **Configuration**: Agent pipelines, search settings, and behaviors
- **Branding**: Custom logos, colors, and UI elements
- **Access Control**: Project-specific permissions and API keys
- **Ingestion Sources**: Configured data sources

## Project Attributes

### Basic Information

- **Name**: Human-readable project name
- **Slug**: URL-friendly identifier
- **Collection Name**: Internal identifier for vector storage
- **Demo Key**: Optional public access key

### Agent Configuration

Each project can have multiple agents with different configurations:

```json
{
  "agentID": "chat-agent-1",
  "type": "chat",
  "params": {
    "temperature": 0.7,
    "maxTokens": 2000,
    "model": "gpt-4"
  }
}
```

Agent types:
- **chat**: Conversational interface
- **search**: Document retrieval
- **qa**: Question answering

### Branding

Customize the appearance of your project:

```json
{
  "logoImage": "https://example.com/logo.png",
  "brandColor": "#FF5733",
  "sloganLineOne": "Your Knowledge",
  "sloganLineTwo": "Always at Hand",
  "searchPlaceholder": "What would you like to know?",
  "searchSuggestions": [
    "How do I get started?",
    "What are the main features?"
  ]
}
```

### Ingestion Sources

Configure where data comes from:

- **Google Cloud Storage**: Buckets and paths
- **Web Service**: HTTP endpoints
- **Direct Upload**: File uploads through API

## Project Lifecycle

### Creation

Projects are created through the admin API:

```bash
POST /admin/api/projects
```

Required fields:
- Name
- Collection name
- Main agent pipeline

### Configuration

After creation, configure:
1. Branding elements
2. Agent parameters
3. Ingestion sources
4. Search suggestions

### Data Ingestion

Populate the project with documents:

1. Configure ingestion source
2. Trigger ingestion job
3. Monitor ingestion status
4. Verify indexed documents

### Usage

Once configured and populated:
- Users can search the knowledge base
- Chat agents can answer questions
- Analytics track usage patterns

### Archival

Projects can be soft-deleted:
- Data remains in database
- No longer accessible via API
- Can be restored if needed

## Multi-Tenancy

Projects provide complete isolation:

### Data Isolation

- Separate vector collections per project
- Independent document storage
- Isolated search results

### Configuration Isolation

- Project-specific agent configurations
- Independent branding
- Separate API keys and permissions

### Performance Isolation

- Resource quotas per project
- Rate limiting per project
- Independent scaling

## Use Cases

### Internal Knowledge Base

```
Company Wiki → Project
  ├── HR Documents
  ├── Engineering Docs
  ├── Product Specs
  └── Policies
```

### Customer Support

```
Support Portal → Project
  ├── FAQs
  ├── Product Documentation
  ├── Troubleshooting Guides
  └── Video Tutorials
```

### Research Repository

```
Research Database → Project
  ├── Published Papers
  ├── Internal Reports
  ├── Experiment Data
  └── Literature Reviews
```

## Best Practices

### Naming

- Use clear, descriptive names
- Consistent slug format
- Meaningful collection names

### Organization

- One project per distinct knowledge domain
- Avoid mixing unrelated content
- Use tags for sub-categorization

### Configuration

- Start with conservative agent settings
- Test search suggestions with real users
- Update branding to match your application

### Data Management

- Regular ingestion updates
- Monitor ingestion failures
- Archive obsolete documents

### Security

- Restrict admin access
- Use project-specific API keys
- Regular permission audits

## API Reference

For detailed API documentation, see:

- [List Projects](../api/projects.md#list-projects)
- [Create Project](../api/projects.md#create-project)
- [Update Project](../api/projects.md#update-project)
- [Delete Project](../api/projects.md#delete-project)

## Next Steps

- [Create Your First Project](../guides/creating-projects.md)
- [Configure Ingestion](../guides/data-ingestion.md)
- [Understanding Ingestors](./ingestors.md)
