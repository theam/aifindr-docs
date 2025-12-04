# Database Migrations with Atlas & Goose

This document explains how to manage database migrations using **Atlas** and **Goose**. These tools handle both **schema** and **data** migrations, keeping our Go backend’s database stable and maintainable.

## Table of Contents

1. [Schema vs. Data Migrations](#schema-vs-data-migrations)
2. [Why Atlas & Goose?](#why-atlas--goose)
3. [Setup](#setup)
4. [Usage Guide](#usage-guide)
   - [Schema Migrations (GORM Model Changes)](#schema-migrations-gorm-model-changes)
   - [Data Migrations with Go (Complex Changes)](#data-migrations-with-go-complex-changes)
   - [Data Migrations with SQL (Simple Changes)](#data-migrations-with-sql-simple-changes)
   - [Applying Migrations](#applying-migrations)
5. [Summary](#summary)

---

## Schema vs. Data Migrations

### Schema Migrations

Structural updates to the database:

- Adding a `created_at` column to `users`.
- Renaming `orders.amount` to `orders.total_price`.
- Adding a `NOT NULL` constraint to `email`.

### Data Migrations

Changes to existing data:

- Backfilling `created_at` for all users.
- Reformatting `orders` data.
- Converting `user_roles` from text to enums.

---

## Why Atlas & Goose?

We picked **Atlas** and **Goose** for their complementary strengths:

### Atlas: Schema Automation

- Auto-detects changes in GORM models.
- Generates versioned SQL migration files.
- Works seamlessly with our GORM setup.

### Goose: Flexible Execution

- Supports SQL and Go migrations.
- Ensures migrations run in order with versioning.
- Handles complex data migrations in Go.

### Why Both?

- **Atlas** generates schema migrations automatically.
- **Goose** executes all migrations (schema + data) reliably.
- Migrations apply on server startup, keeping the process hands-off.

---

## Setup

1. **Install Atlas**:
  
   ```sh
   curl -sSf https://atlasgo.sh | sh
   ```

2. **Install Goose**:

   ```sh
   go install github.com/pressly/goose/v3/cmd/goose@latest
   # OR
   brew install goose
   ```

## Usage Guide

### Schema Migrations (GORM Model Changes)

1. Update your GORM model (e.g., add a `CreatedAt time.Time` field to `User`).
   - If you created a new model, add it to the `.Load` call [here](../cmd/atlas/main.go)
   - **IMPORTANT** Atlas is configured to not drop tables for models that are deleted. 
   If you need that, create that migration yourself, both in the `-- +goose Up` and `-- +goose Down` sections

2. Generate a migration:

    ```sh
    atlas migrate diff [change_description] --env "gorm"
    ```

3. Check `migrations/` for the new SQL file.

4. Fix timestamps to sequential order. Run this command inside the `migrations/` folder:

    ```sh
    goose fix
    ```

5. Restart the server—migration applies automatically.

### Data Migrations with Go (Complex Changes)

1. For complex transforms (e.g., normalizing data), create a Go migration:

    ```sh
    goose create -s [migration_name] go
    ```

    - Example: `Example: goose create -s normalize_user_roles go`.

2. Edit the `.go` file in `migrations/` and add your logic using the transaction object.

3. Restart the server—migration runs automatically.

### Data Migrations with SQL (Simple Changes)

1. For simple updates (e.g., backfilling a column), create a SQL migration:

    ```sh
    goose create -s [migration_name] sql
    ```

    - Example: `goose create -s backfill_created_at sql

2. Edit the `.sql` file in `migrations/` with your SQL.

3. Restart the server—migration applies automatically.

### Applying Migrations

- Restart the server (e.g., `go run -tags client.bcp main.go`).

- Goose detects and runs pending migrations in order—no manual steps needed.

### Rollback latest migration (only localhost)
In case you want to rollback your latest migration (because you are still developing it) you can run the following command:
```sh
goose postgres "<your DB connection string>" down
```
If you want to reapply it, run the same command but with `up` subcommand:
```sh
goose postgres "<your DB connection string>" up
``` 

---

## Summary

- **Atlas** auto-generates schema migrations from GORM changes.
- **Goose** runs all migrations (schema + data) with versioning.
- Migrations apply on server startup, keeping the DB in sync effortlessly.

For questions or issues, ping the team—we’re here to help!
