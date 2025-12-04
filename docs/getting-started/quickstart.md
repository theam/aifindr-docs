# Quick Start

Get AIFindr up and running in minutes with this quick start guide.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Go** 1.19 or higher
- **PostgreSQL** 12 or higher
- **Docker** (optional, for containerized deployment)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/theam/aifindr-backend.git
cd aifindr-backend
```

### 2. Download Dependencies

```bash
go mod download
go mod tidy
```

### 3. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration. See the [Setup Guide](./setup.md) for detailed information about environment variables.

### 4. Run Database Migrations

```bash
# Using the migration tool
go run ./cmd/migrate up
```

See the [Database Migrations guide](../guides/database-migrations.md) for more details.

### 5. Build and Run

Build the project for your client (use the appropriate client tag):

```bash
# For general client
go build -tags=client.general ./cmd/server

# Or run directly
go run -tags=client.general ./cmd/server
```

The server will start on the port specified in your `.env` file (default: 8080).

## Verify Installation

Test that the server is running:

```bash
curl http://localhost:8080/health
```

You should receive a successful health check response.

## Next Steps

Now that you have AIFindr running, you can:

1. [Set up your first project](../guides/creating-projects.md)
2. [Configure API authentication](../guides/authentication.md)
3. [Learn about the API](../api/overview.md)
4. [Ingest your first documents](../guides/data-ingestion.md)

## Using Docker

Alternatively, you can use Docker to run AIFindr:

```bash
docker-compose up
```

This will start all required services including the database.

## Troubleshooting

### Common Issues

**Port already in use**: Change the port in your `.env` file.

**Database connection failed**: Verify your PostgreSQL connection settings in `.env`.

**Build errors**: Make sure you're using the correct Go version and have run `go mod tidy`.

For more help, check the [Troubleshooting Guide](../guides/troubleshooting.md) or open an issue on GitHub.
