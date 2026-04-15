---
title: Acceder a las analíticas con API privada
description: Consulta métricas, conversaciones y detalle de conversaciones usando una API key.
slug: /api/private-analytics-api
sidebar_label: Analíticas por API privada
custom_edit_url: null
---

# Acceder a las analíticas con API privada

Si quieres **leer las métricas del dashboard**, **listar conversaciones** o **hacer drill-down de una conversación** desde tu propio backend o dashboard, usa la API privada bajo `/api/private/...`.

Esta guía complementa la referencia OpenAPI. Hoy la parte de lectura de analíticas no está reflejada completamente en el explorador, así que aquí dejamos el flujo real de integración.

## Autenticación requerida

Para estas rutas necesitas enviar siempre estos encabezados:

```http
Authorization: Bearer <api_key>
X-Organization-Id: <org_id>
```

Dónde obtenerlos en AI Findr Hub:

1. Genera una API key en `Settings -> API Keys`.
2. Usa una key con acceso a la organización y al proyecto objetivo. `Organization Admin` es una configuración segura para pruebas internas.
3. Copia `Organization ID` y `Project ID` desde `Project -> Technical Information`.

Sugerencia para trabajar desde terminal:

```bash
export BASE_URL="https://api.saas.aifindr.ai"
export AIFINDR_API_KEY="key_..."
export AIFINDR_ORG_ID="org_..."
export PROJECT_ID="prj_..."
export CONVERSATION_ID="conv_..."
```

## 1. Resumen de analíticas del proyecto

**Endpoint**

```http
GET /api/private/projects/{projectId}/analytics
```

**Query params**

- `from` opcional. Acepta `YYYY-MM-DD` o RFC3339.
- `to` opcional. Acepta `YYYY-MM-DD` o RFC3339.

Si omites `from` y `to`, el backend usa una ventana por defecto de aproximadamente 7 días.

**Ejemplo**

```bash
curl -sS --location \
  "$BASE_URL/api/private/projects/$PROJECT_ID/analytics?from=2026-04-01&to=2026-04-15" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**Qué devuelve**

- `interval`: granularidad agregada (`day`, `week`, `month`).
- `from`, `to`: rango efectivo aplicado.
- `metrics.summary`: usuarios únicos, conversaciones únicas, recurrencia y success rate.
- `metrics.feedback`: conteos positivos, negativos y total.
- `metrics.funnel`: etapas del funnel con comparación respecto al periodo anterior.
- `metrics.kpis`: interacciones, chats con clics y caracteres escritos.
- `metrics.actions`: desglose por acción registrada.

Respuesta abreviada:

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

## 2. Listado de conversaciones

**Endpoint**

```http
GET /api/private/projects/{projectId}/conversations
```

**Query params más útiles**

- `startDate`, `endDate`: fechas en `YYYY-MM-DD`.
- `page`: por defecto `1`.
- `perPage`: por defecto `20`, máximo `100`.
- `search`: busca texto dentro de los mensajes.
- `voteType`: filtra por feedback `up` o `down`.
- `metadata`: filtra por coincidencia textual dentro del metadata serializado.
- `userId`: limita a conversaciones asociadas a un usuario concreto.

Restricción importante:

- `metadata` es mutuamente excluyente con `search` y `voteType`.

**Ejemplo**

```bash
curl -sS --location \
  "$BASE_URL/api/private/projects/$PROJECT_ID/conversations?startDate=2026-04-01&endDate=2026-04-15&page=1&perPage=50&search=whatsapp" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**Qué devuelve**

- `items[]`: conversaciones con `id`, `firstUserMessage`, `metadata`, `date`, `tags`, `latestEvaluation`.
- `pagination`: total, página actual y tamaño de página.

Respuesta abreviada:

```json
{
  "items": [
    {
      "id": "conv_...",
      "firstUserMessage": "¿Cómo conecto WhatsApp?",
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

## 3. Detalle de una conversación

**Endpoint**

```http
GET /api/private/conversations/{conversationId}
```

**Query params**

**Ejemplo**

```bash
curl -sS --location \
  "$BASE_URL/api/private/conversations/$CONVERSATION_ID" \
  -H "Authorization: Bearer $AIFINDR_API_KEY" \
  -H "X-Organization-Id: $AIFINDR_ORG_ID" | jq .
```

**Qué devuelve**

- `id`, `metadata`, `createdAt`.
- `messages[]`: transcript cronológico.
- `feedbacks[]`: feedback asociado a la conversación.
- `events[]`: timeline analítico con queries, respuestas, clicks, feedback o formularios.
- `tags[]`, `summary`, `latestEvaluation`.
- `productMemory`: snapshot de productos referenciados durante la conversación.

Respuesta abreviada:

```json
{
  "id": "conv_...",
  "metadata": { "distinctId": "abc-123" },
  "messages": [
    { "role": "user", "content": "¿Cómo conecto WhatsApp?" },
    { "role": "assistant", "content": "..." }
  ],
  "events": [
    { "actionType": "widget:open" },
    { "actionType": "query:initial", "query": "¿Cómo conecto WhatsApp?" }
  ],
  "productMemory": {}
}
```

## Recomendaciones prácticas

1. Empieza por `/analytics` para detectar cambios de volumen, funnel o feedback.
2. Pasa a `/conversations` para encontrar casos relevantes con filtros por fecha, búsqueda o feedback.
3. Usa `/conversations/{conversationId}` para inspeccionar el transcript y el timeline exacto.

Ten en cuenta que algunos campos pueden venir vacíos o ser omitidos según los permisos asociados a la API key, por ejemplo `latestEvaluation` o datos sensibles dentro de `metadata`.

## Equivalentes con JWT

Si ya trabajas con el Admin API autenticado con JWT, los equivalentes son:

- `GET /admin/api/projects/{projectId}/analytics`
- `GET /admin/api/projects/{projectId}/conversations`
- `GET /admin/api/conversations/{conversationId}`
