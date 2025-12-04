# Ingestors

Ingestors are responsible for processing and indexing documents into AIFindr. They handle document parsing, chunking, embedding generation, and storage.

## Overview

The ingestor transforms raw documents into searchable knowledge:

1. **Document Parsing**: Extract text from various formats (PDF, DOCX, HTML, etc.)
2. **Text Chunking**: Split documents into manageable segments
3. **Embedding Generation**: Create vector representations using AI models
4. **Storage**: Store embeddings in the vector database
5. **Metadata**: Save document metadata in PostgreSQL

## Ingestor Types

### Web Service Ingestor

Recommended for most deployments. Uses an external HTTP service for processing.

**Configuration:**
```bash
PGPT_INGESTOR_TYPE=webservice
PGPT_INGESTOR_URL=http://ingestor-service:5000/api/ingest
PGPT_INGESTOR_JOB_NOTIFY_URL=http://backend:8080/admin/api
PGPT_INGESTOR_TIMEOUT=6000s
```

**Advantages:**
- Separate scaling from main API
- Better resource isolation
- Easier to update independently

### Google Cloud Ingestor

For large-scale, batch processing using Google Cloud Run Jobs.

**Configuration:**
```bash
PGPT_INGESTOR_TYPE=googlecloud
PGPT_INGESTOR_URL=projects/my-project/locations/us-central1/jobs/ingestor-job
PGPT_INGESTOR_JOB_NOTIFY_URL=https://api.example.com/admin/api
PGPT_INGESTOR_TIMEOUT=6000s
```

**Advantages:**
- Handles large document sets
- Automatic scaling
- Pay-per-use pricing

### Library Ingestor (Deprecated)

Direct library integration. Maintained for backwards compatibility only.

**Configuration:**
```bash
PGPT_INGESTOR_TYPE=library
```

**Note:** Not recommended for new deployments. Use web service or Google Cloud instead.

## Ingestion Process

### Step 1: Document Submission

Documents can be submitted via:
- API upload
- Google Cloud Storage reference
- Web service URL

### Step 2: Processing

The ingestor:
1. Downloads/receives the document
2. Detects format and extracts text
3. Cleans and normalizes content
4. Splits into chunks (typically 512-1024 tokens)

### Step 3: Embedding

Each chunk is:
1. Sent to the embedding model (e.g., OpenAI text-embedding-3-small)
2. Converted to a vector representation
3. Stored with metadata

### Step 4: Indexing

Vectors are indexed in the database:
- Fast similarity search enabled
- Metadata linked to original document
- Project collection association

### Step 5: Notification

Callback sent to backend:
- Ingestion status (success/failure)
- Document count
- Error details if any

## Monitoring Ingestion

### Check Ingestion Status

```bash
GET /admin/api/projects/{projectId}/ingestions
```

Response includes:
- Ingestion ID
- Status (pending, processing, completed, failed)
- Start and end times
- Document counts
- Error messages

### View Recent Ingestions

Each project tracks its last 10 ingestions automatically.

## Error Handling

Common ingestion errors:

### Format Not Supported

**Error:** "Unsupported document format"

**Solution:** Convert to supported format (PDF, DOCX, TXT, HTML, MD)

### Timeout

**Error:** "Ingestion timeout exceeded"

**Solution:** Increase `PGPT_INGESTOR_TIMEOUT` or split large documents

### Embedding Failure

**Error:** "Failed to generate embeddings"

**Solution:** Check API key and model availability

### Storage Error

**Error:** "Failed to store vectors"

**Solution:** Check vector database connection and capacity

## Best Practices

### Document Preparation

- Clean formatting before ingestion
- Remove unnecessary whitespace
- Ensure text is extractable (not scanned images)

### Batch Processing

- Group related documents
- Process during off-peak hours
- Monitor resource usage

### Chunk Size Optimization

- Smaller chunks: More precise search, more storage
- Larger chunks: Better context, fewer chunks
- Recommended: 512-1024 tokens per chunk

### Rate Limiting

- Respect embedding API rate limits
- Implement retry logic
- Monitor API usage and costs

## Configuration Examples

### Development Setup

```bash
# Use local web service
PGPT_INGESTOR_TYPE=webservice
PGPT_INGESTOR_URL=http://localhost:5000/api/ingest
PGPT_INGESTOR_JOB_NOTIFY_URL=http://localhost:8080/admin/api
PGPT_INGESTOR_TIMEOUT=600s
```

### Production Setup

```bash
# Use Google Cloud Jobs
PGPT_INGESTOR_TYPE=googlecloud
PGPT_INGESTOR_URL=projects/prod-project/locations/us-central1/jobs/ingestor
PGPT_INGESTOR_JOB_NOTIFY_URL=https://api.aifindr.ai/admin/api
PGPT_INGESTOR_TIMEOUT=6000s
```

## Next Steps

- [Data Ingestion Guide](../guides/data-ingestion.md)
- [API Reference](../api/ingestions.md)
- [Architecture Overview](./architecture.md)
