---
title: Access analytics with the private API
description: Read metrics, conversations, and conversation detail using an API key.
slug: /api/private-analytics-api
sidebar_label: Private analytics API
custom_edit_url: null
---

# Access analytics with the private API

If you need to **read dashboard metrics**, **list conversations**, or **drill down into a single conversation** from your own backend or dashboard, use the private API under `/api/private/...`.

This guide complements the OpenAPI reference. At the moment, the analytics read endpoints are not fully represented in the explorer, so this page documents the real integration flow.

## Required authentication

Always send these headers:

```http
Authorization: Bearer <api_key>
X-Organization-Id: <org_id>
```

Where to get them in AI Findr Hub:

1. Generate an API key in `Settings -> API Keys`.
2. Use a key with access to the target organization and project. `Organization Admin` is a safe default for internal testing.
3. Copy `Organization ID` and `Project ID` from `Project -> Technical Information`.

Suggested shell variables:

```bash
export BASE_URL="https://api.saas.aifindr.ai"
export AIFINDR_API_KEY="key_..."
export AIFINDR_ORG_ID="org_..."
export PROJECT_ID="prj_..."
export CONVERSATION_ID="conv_..."
```

## 1. Project analytics summary

**Endpoint**

```http
GET /api/private/projects/{projectId}/analytics
```

**Query params**

- `from` optional. Accepts `YYYY-MM-DD` or RFC3339.
- `to` optional. Accepts `YYYY-MM-DD` or RFC3339.

If you omit `from` and `to`, the backend uses a default window of roughly 7 days.

**Example**

```bash
curl -sS --location \
  "$BASE_URL/api/private/projects/$PROJECT_ID/analytics?from=2026-04-01&to=2026-04-15" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**What it returns**

- `interval`: aggregation granularity (`day`, `week`, `month`).
- `from`, `to`: effective range applied.
- `metrics.summary`: unique users, unique conversations, recurrence, success rate.
- `metrics.feedback`: positive, negative, and total counts.
- `metrics.funnel`: funnel stages with previous-period comparison.
- `metrics.kpis`: interactions, chats with clicks, characters written.
- `metrics.actions`: breakdown by tracked action.

Short response example:

```json
{
  "interval": "week",
  "from": "2026-04-01",
  "to": "2026-04-15",
  "metrics": {
    "summary": {
      "uniqueUsers": { "total": 1771, "previousTotal": 1604, "variancePct": 10 }
    },
    "feedback": {
      "total": { "total": 44 }
    },
    "kpis": {
      "interactions": { "total": 2160 }
    },
    "actions": {
      "query:initial": { "total": 2163 }
    }
  }
}
```

## 2. Conversations list

**Endpoint**

```http
GET /api/private/projects/{projectId}/conversations
```

**Most useful query params**

- `startDate`, `endDate`: `YYYY-MM-DD` dates.
- `page`: defaults to `1`.
- `perPage`: defaults to `20`, max `100`.
- `search`: full-text search within messages.
- `voteType`: filter by feedback `up` or `down`.
- `metadata`: text match against serialized metadata.
- `userId`: restrict to conversations associated with a specific user.

Important restriction:

- `metadata` is mutually exclusive with `search` and `voteType`.

**Example**

```bash
curl -sS --location \
  "$BASE_URL/api/private/projects/$PROJECT_ID/conversations?startDate=2026-04-01&endDate=2026-04-15&page=1&perPage=50&search=whatsapp" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**What it returns**

- `items[]`: conversations with `id`, `firstUserMessage`, `metadata`, `date`, `tags`, `latestEvaluation`.
- `pagination`: total, current page, page size.

Short response example:

```json
{
  "items": [
    {
      "id": "conv_...",
      "firstUserMessage": "How do I connect WhatsApp?",
      "metadata": { "distinctId": "abc-123" },
      "date": "2026-04-15T09:24:10Z",
      "tags": [],
      "latestEvaluation": {}
    }
  ],
  "pagination": {
    "total": 2176,
    "currentPage": 1,
    "perPage": 50
  }
}
```

## 3. Single conversation detail

**Endpoint**

```http
GET /api/private/conversations/{conversationId}
```

**Query params**

**Example**

```bash
curl -sS --location \
  "$BASE_URL/api/private/conversations/$CONVERSATION_ID" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**What it returns**

- `id`, `metadata`, `createdAt`.
- `messages[]`: chronological transcript.
- `feedbacks[]`: feedback linked to the conversation.
- `events[]`: analytics timeline with queries, responses, clicks, feedback, or forms.
- `tags[]`, `summary`, `latestEvaluation`.
- `productMemory`: snapshot of products referenced during the conversation.

Short response example:

```json
{
  "id": "conv_...",
  "metadata": { "distinctId": "abc-123" },
  "messages": [
    { "role": "user", "content": "How do I connect WhatsApp?" },
    { "role": "assistant", "content": "..." }
  ],
  "events": [
    { "actionType": "widget:open" },
    { "actionType": "query:initial", "query": "How do I connect WhatsApp?" }
  ],
  "productMemory": {}
}
```

## Practical workflow

1. Start with `/analytics` to spot changes in volume, funnel, or feedback.
2. Move to `/conversations` to find relevant cases with date, search, or feedback filters.
3. Use `/conversations/{conversationId}` to inspect the exact transcript and event timeline.

Some fields may be empty or omitted depending on the permissions attached to the API key, for example `latestEvaluation` or sensitive values inside `metadata`.

## JWT equivalents

If you already work with the Admin API using JWTs, the equivalent routes are:

- `GET /admin/api/projects/{projectId}/analytics`
- `GET /admin/api/projects/{projectId}/conversations`
- `GET /admin/api/conversations/{conversationId}`
