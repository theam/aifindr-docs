# Architecture Overview

AIFindr is built with a modern, scalable architecture designed to handle AI-powered search and knowledge management at scale.

## System Components

### Backend API Server

The core of AIFindr is a Go-based API server that:

- Handles all HTTP requests
- Manages authentication and authorization
- Coordinates data ingestion
- Processes search queries
- Manages projects and configurations

### Database Layer

PostgreSQL serves as the primary data store:

- **Projects**: Configuration and metadata
- **Users & Permissions**: Authentication and authorization data
- **Ingestion History**: Tracking of data ingestion jobs
- **Agent Configurations**: AI agent settings and pipelines

### Vector Database

A specialized vector database stores document embeddings:

- **Document Chunks**: Processed and embedded text segments
- **Semantic Search**: Fast similarity search capabilities
- **Collections**: Organized by project for multi-tenancy

### Ingestor Service

The ingestor handles document processing:

- **Document Parsing**: Extract text from various formats
- **Chunking**: Split documents into manageable pieces
- **Embedding**: Generate vector representations
- **Storage**: Store embeddings in vector database

## Architecture Patterns

### Multi-Client Architecture

AIFindr supports multiple clients through Go build tags:

```go
// +build client.general
```

This allows:
- Client-specific features
- Custom branding per client
- Isolated configurations

### Multi-Tenancy

Projects provide isolation between different tenants:

- Separate vector collections
- Independent configurations
- Isolated data and search results

### API-First Design

Everything is accessible through the REST API:

- Consistent interface
- Easy integration
- Clear documentation

## Data Flow

### Ingestion Flow

```
Documents → Ingestor → Processing → Embeddings → Vector DB
                ↓
           Metadata → PostgreSQL
```

1. Documents are submitted for ingestion
2. Ingestor processes and chunks documents
3. Embeddings are generated using AI models
4. Vectors stored in vector database
5. Metadata stored in PostgreSQL

### Query Flow

```
User Query → API Server → Embedding → Vector Search → Results
                ↓
           Permission Check
                ↓
           Result Ranking → Response
```

1. User submits a natural language query
2. Query is embedded using the same model
3. Vector similarity search finds relevant documents
4. Results are ranked and filtered
5. Response returned to user

## Scalability

### Horizontal Scaling

Multiple instances can run behind a load balancer:

- Stateless API servers
- Shared database layer
- Session management externalized

### Database Scaling

- Read replicas for query workloads
- Connection pooling
- Optimized indexes

### Ingestor Scaling

- Google Cloud Jobs for large-scale processing
- Asynchronous job processing
- Status callbacks for monitoring

## Security Architecture

### Authentication

- JWT-based authentication
- API key support for machine-to-machine
- Integration with Auth0 or custom providers

### Authorization

- Permission-based access control
- Fine-grained permissions per operation
- Project-level isolation

### Data Security

- Encrypted connections (TLS)
- Secure credential management
- Environment-based configuration

## Deployment Options

### Docker Deployment

```
Docker Container
  ├── API Server
  ├── PostgreSQL (or external)
  └── Vector DB (or external)
```

### Kubernetes Deployment

- Horizontal pod autoscaling
- Service mesh integration
- ConfigMaps for configuration

### Cloud Platforms

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances

## Technology Stack

- **Language**: Go 1.19+
- **Database**: PostgreSQL 12+
- **Vector DB**: Configurable (Qdrant, Weaviate, etc.)
- **AI Models**: OpenAI, Anthropic, or custom
- **Deployment**: Docker, Kubernetes

## Performance Characteristics

- **API Response Time**: < 100ms for most endpoints
- **Search Latency**: < 500ms for semantic search
- **Ingestion**: Depends on document size and count
- **Concurrent Users**: Scales horizontally

## Next Steps

- [Understanding Projects](./projects.md)
- [Ingestor Details](./ingestors.md)
- [Setup Guide](../getting-started/setup.md)
