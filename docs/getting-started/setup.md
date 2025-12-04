# Setup Guide

This guide provides detailed information on setting up AIFindr for development or production use.

## Environment Variables

AIFindr uses environment variables for configuration. Place these in a `.env` file in the project root.

### Required Variables

#### Database Configuration

```bash
# PostgreSQL connection
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=aifindr
```

#### Server Configuration

```bash
# Server settings
PORT=8080
HOST=localhost
```

#### Authentication

```bash
# Auth0 or your authentication provider
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-api-audience
```

### Ingestor Configuration

AIFindr supports different types of data ingestors:

#### Web Service Ingestor

```bash
PGPT_INGESTOR_TYPE=webservice
PGPT_INGESTOR_URL=http://localhost:5000/api/ingest
PGPT_INGESTOR_JOB_NOTIFY_URL=http://localhost:3000/admin/api
PGPT_INGESTOR_TIMEOUT=6000s
```

#### Google Cloud Ingestor

```bash
PGPT_INGESTOR_TYPE=googlecloud
PGPT_INGESTOR_URL=projects/<project_id>/locations/<location>/jobs/<job_id>
PGPT_INGESTOR_JOB_NOTIFY_URL=http://host.docker.internal:3000/admin/api
PGPT_INGESTOR_TIMEOUT=6000s
```

#### Library Ingestor (Deprecated)

```bash
PGPT_INGESTOR_TYPE=library
```

> **Note**: The library mode is deprecated and maintained for backwards compatibility only.

### Optional Variables

#### Monitoring and Error Tracking

```bash
# Sentry for error tracking
SENTRY_DSN=your-sentry-dsn

# Application versioning
APP_VERSION=1.0.0
```

## Client Configuration

AIFindr uses a multi-client architecture. You must specify which client to compile for using build tags.

### Available Clients

The following clients are available in the `client` folder:

- **client.general** - General purpose client
- **client.bcp** - BCP (Banco de Crédito del Perú) client
- **client.depodirect** - DepoDirect client
- **client.repeople** - RePeople client

### Building for a Specific Client

```bash
# Build for general client
go build -tags=client.general ./cmd/server

# Build for BCP client
go build -tags=client.bcp ./cmd/server

# Run directly with client tag
go run -tags=client.general ./cmd/server
```

## Database Setup

### Creating the Database

```bash
# Using psql
createdb aifindr

# Or connect to PostgreSQL and run:
CREATE DATABASE aifindr;
```

### Running Migrations

AIFindr uses **Atlas** and **Goose** for database migrations:

```bash
# Apply all pending migrations
go run ./cmd/migrate up

# Rollback the last migration
go run ./cmd/migrate down

# Check migration status
go run ./cmd/migrate status
```

For more information, see the [Database Migrations guide](../guides/database-migrations.md).

## Development Setup

### Using the Build Script

The project includes a build script that handles build-time variables:

```bash
# Build the project (output to bin/ folder)
./scripts/build.sh

# Build and run
./scripts/build.sh run
```

### Docker Development

For local development with Docker:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Production Considerations

### Security

1. **Never commit your `.env` file** - Use environment variable injection in your deployment
2. **Use strong database passwords** - Generate secure random passwords
3. **Enable HTTPS** - Use a reverse proxy like Nginx or Traefik
4. **Restrict API access** - Use proper authentication and authorization

### Performance

1. **Database Connection Pooling** - Configure appropriate connection pool sizes
2. **Caching** - Consider using Redis for caching frequently accessed data
3. **Load Balancing** - Use multiple instances behind a load balancer
4. **Monitoring** - Set up proper monitoring and alerting

### Scaling

1. **Horizontal Scaling** - Run multiple instances of the service
2. **Database Scaling** - Use read replicas for read-heavy workloads
3. **Ingestor Scaling** - Use Google Cloud Jobs for large-scale ingestion

## Next Steps

- [Create your first project](../guides/creating-projects.md)
- [Set up authentication](../guides/authentication.md)
- [Configure the ingestor](../guides/data-ingestion.md)
- [Learn about the API](../api/overview.md)
