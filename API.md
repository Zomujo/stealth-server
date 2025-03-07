# Stealth Server API Documentation

## Endpoints

Refere to the swagger docs for api documentation of all endpoints. It can be accessed from `/docs` route of the server url

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation error occurred",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Unauthorized access",
  "error": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "status": "error",
  "statusCode": 403,
  "message": "Access forbidden",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 410 Gone

```json
{
  "status": "error",
  "statusCode": 410,
  "message": "Resource is no longer available",
  "error": "Gone"
}
```

### 500 Internal Server Error

```json
{
  "status": "error",
  "statusCode": 500,
  "message": "An unexpected error occurred",
  "error": "Internal Server Error"
}
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the access token in the Authorization header:

```text
Authorization: Bearer <access_token>
```

The access token expires after a configured time period (default: 1 hour). Use the refresh token endpoint to obtain a new access token.

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 100 requests per minute per IP address
- 1000 requests per hour per user

## CORS

The API supports CORS for specified origins. Configure allowed origins in the environment variables.
