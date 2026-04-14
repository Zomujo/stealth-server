# Stealth Server API Documentation

## Endpoints

Refere to the swagger docs for api documentation of all endpoints. It can be accessed from `/docs` route of the server url

### Auth (`/auth`)
- **POST** `/auth/signup` - User signup [Public]
- **PUT** `/auth/profile-picture` - Update profile picture [Secured]
- **DELETE** `/auth/profile-picture` - Delete profile picture [Secured]
- **POST** `/auth/login` - User login [Public]
- **GET** `/auth/user` - Get current user info [Secured]
- **GET** `/auth/sessions` - Get active sessions [Secured]
- **GET** `/auth/refresh` - Refresh access token [Public]
- **POST** `/auth/forgot-password/send` - Send forgot password code [Public]
- **POST** `/auth/verification/send-mail` - Send email verification mail [Public]
- **GET** `/auth/verify` - Verify account [Public]
- **POST** `/auth/forgot-password/validate-code` - Validate reset code [Public]
- **PATCH** `/auth/forgot-password/reset` - Reset password [Public]
- **PATCH** `/auth/` - Update profile [Secured]
- **POST** `/auth/change-email/send-mail` - Send change email OTP [Secured]
- **POST** `/auth/change-email/validate-otp` - Validate change email OTP [Secured]
- **PUT** `/auth/change-password` - Change password [Secured]
- **DELETE** `/auth/session/:id` - Terminate session [Public]

### Admin (`/admin`)
- **POST** `/admin/user` - Create admin user [Secured, Permission: USERS:READ_WRITE]
- **GET** `/admin/users` - List admin users [Secured, Permission: USERS:READ]
- **GET** `/admin/users/:id` - Get admin user details [Secured, Permission: USERS:READ]
- **PATCH** `/admin/users/:id/role` - Update user role [Secured, Permission: USERS:READ_WRITE]
- **PATCH** `/admin/users/:id/password` - Update user password [Secured, Permission: USERS:READ_WRITE]
- **PATCH** `/admin/users/:id/reset-password` - Reset user password [Secured, Permission: USERS:READ_WRITE]
- **PATCH** `/admin/users/:id/deactivate` - Deactivate user [Secured, Permission: USERS:READ_WRITE]
- **PATCH** `/admin/users/:id/activate` - Activate user [Secured, Permission: USERS:READ_WRITE]
- **GET** `/admin/roles` - Get available roles [Secured, Permission: USERS:READ_WRITE]

### Departments (`/departments`)
- **POST** `/departments` - Create department [Secured, Permission: DEPARTMENTS:READ_WRITE]
- **GET** `/departments/no-paginate` - List departments without pagination [Secured, Permission: DEPARTMENTS:READ]
- **GET** `/departments` - List departments [Secured, Permission: DEPARTMENTS:READ]
- **GET** `/departments/:id` - Get department details [Secured, Permission: DEPARTMENTS:READ]
- **PATCH** `/departments/:id` - Update department [Secured, Permission: DEPARTMENTS:READ_WRITE]
- **DELETE** `/departments/:id` - Delete department [Secured, Permission: DEPARTMENTS:READ_WRITE_DELETE]

### Facilities (`/facilities`)
- **POST** `/facilities` - Create facility [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]
- **GET** `/facilities` - List facilities [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]
- **GET** `/facilities/no-paginate` - List facilities without pagination [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]
- **GET** `/facilities/:id` - Get facility details [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]
- **PATCH** `/facilities/:id` - Update facility [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]
- **DELETE** `/facilities/:id` - Delete facility [Public, Roles: HospitalAdmin, RegionalAdmin, NationalAdmin]

### Inventory (`/items`, `/stock-adjustments`, `/suppliers`, `/item-categories`)
- **POST** `/items` - Create item [Secured, Permission: ITEMS:READ_WRITE]
- **GET** `/items` - List items [Secured, Permission: ITEMS:READ]
- **GET** `/items/export` - Export items [Secured, Permission: ITEMS:READ]
- **GET** `/items/validity` - Get items validity [Secured, Permission: ITEMS:READ]
- **GET** `/items/no-paginate` - List items without pagination [Secured]
- **GET** `/items/analytics/:id` - Get item analytics [Secured, Permission: ITEMS:READ]
- **GET** `/items/counts` - Get item counts [Secured, Permission: ITEMS:READ]
- **GET** `/items/:id" - Get item details [Secured, Permission: ITEMS:READ]
- **PATCH** `/items/:id` - Update item [Secured, Permission: ITEMS:READ_WRITE]
- **PATCH** `/items/adjust-prices/:id` - Adjust item prices [Secured, Permission: ITEMS:READ_WRITE]
- **DELETE** `/items/:id` - Delete item [Secured, Permission: ITEMS:READ_WRITE_DELETE]
- **POST** `/items/add-batch` - Add item batch [Secured, Permission: ITEMS:READ_WRITE]
- **GET** `/items/batches/:itemId/no-paginate` - List batches without pagination [Secured, Permission: ITEMS:READ]
- **GET** `/items/validity/export` - Export items validity [Secured, Permission: ITEMS:READ]
- **GET** `/items/:id/batches` - List item batches [Secured, Permission: ITEMS:READ]
- **GET** `/items/batches/:id` - Get batch details [Secured, Permission: ITEMS:READ]
- **PATCH** `/items/edit-batch/:id` - Update batch [Secured, Permission: ITEMS:READ_WRITE]
- **GET** `/items/report/stock-level` - Stock level report [Secured, Permission: REPORTS:READ]
- **GET** `/items/report/expiry` - Expiry report [Secured, Permission: REPORTS:READ]
- **POST** `/stock-adjustments` - Create stock adjustment [Secured, Permission: STOCK_ADJUSTMENT:READ_WRITE]
- **GET** `/stock-adjustments/export` - Export stock adjustments [Secured, Permission: STOCK_ADJUSTMENT:READ]
- **GET** `/stock-adjustments` - List stock adjustments [Secured, Permission: STOCK_ADJUSTMENT:READ]
- **GET** `/stock-adjustments/:id` - Get stock adjustment details [Secured, Permission: STOCK_ADJUSTMENT:READ]
- **PATCH** `/stock-adjustments/:id` - Update stock adjustment [Secured, Permission: STOCK_ADJUSTMENT:READ_WRITE]
- **DELETE** `/stock-adjustments/:id` - Delete stock adjustment [Secured, Permission: STOCK_ADJUSTMENT:READ_WRITE_DELETE]
- **POST** `/suppliers` - Create supplier [Secured, Permission: SUPPLIERS:READ_WRITE]
- **GET** `/suppliers` - List suppliers [Secured, Permission: SUPPLIERS:READ]
- **GET** `/suppliers/no-paginate` - List suppliers without pagination [Secured]
- **GET** `/suppliers/:id` - Get supplier details [Secured, Permission: SUPPLIERS:READ]
- **PATCH** `/suppliers/:id` - Update supplier [Secured, Permission: SUPPLIERS:READ_WRITE]
- **PATCH** `/suppliers/:id/deactivate` - Deactivate supplier [Secured, Permission: SUPPLIERS:READ_WRITE]
- **PATCH** `/suppliers/:id/activate` - Activate supplier [Secured, Permission: SUPPLIERS:READ_WRITE]
- **DELETE** `/suppliers/:id` - Delete supplier [Secured, Permission: SUPPLIERS:READ_WRITE_DELETE]
- **DELETE** `/suppliers` - Bulk delete suppliers [Secured, Permission: SUPPLIERS:READ_WRITE_DELETE]
- **POST** `/item-categories` - Create item category [Secured, Permission: ITEMS_CATEGORIES:READ_WRITE]
- **GET** `/item-categories` - List categories [Secured, Permission: ITEMS_CATEGORIES:READ]
- **GET** `/item-categories/no-paginate` - List categories without pagination [Secured, Permission: ITEMS_CATEGORIES:READ]
- **GET** `/item-categories/:id` - Get category details [Secured, Permission: ITEMS_CATEGORIES:READ]
- **PATCH** `/item-categories/:id` - Update category [Secured, Permission: ITEMS_CATEGORIES:READ_WRITE]
- **DELETE** `/item-categories/:id` - Delete category [Secured, Permission: ITEMS_CATEGORIES:READ_WRITE_DELETE]

### Sales (`/sales`)
- **GET** `/sales/items` - List sales items [Secured, Permission: SALES:READ]
- **POST** `/sales` - Create sale [Secured, Permission: SALES:READ_WRITE]
- **GET** `/sales` - List sales [Secured, Permission: SALES:READ]
- **GET** `/sales/export` - Export sales [Secured, Permission: REPORTS:READ]
- **GET** `/sales/report/periodic-sales` - Periodic sales report [Secured, Permission: REPORTS:READ]
- **GET** `/sales/export/periodic-sales` - Export periodic sales report [Secured, Permission: REPORTS:READ]
- **GET** `/sales/report/top-selling` - Top selling items report [Secured, Permission: REPORTS:READ]
- **PATCH** `/sales/:id` - Update sale [Secured, Permission: SALES:READ_WRITE]
- **GET** `/sales/:id` - Get sale details [Secured, Permission: SALES:READ]
- **DELETE** `/sales/:id` - Delete sale [Secured, Permission: SALES:READ_WRITE_DELETE]

### Orders (`/item-orders`)
- **POST** `/item-orders` - Create order [Secured, Permission: DRUG_ORDERS:READ_WRITE]
- **GET** `/item-orders` - List orders [Secured, Permission: DRUG_ORDERS:READ]
- **GET** `/item-orders/:id` - Get order details [Secured, Permission: DRUG_ORDERS:READ]
- **PATCH** `/item-orders/:id` - Update order [Secured, Permission: DRUG_ORDERS:READ_WRITE]
- **PUT** `/item-orders/state/:id` - Update order state [Secured, Permission: DRUG_ORDERS:READ_WRITE]
- **DELETE** `/item-orders/:id` - Delete order [Secured, Permission: DRUG_ORDERS:READ_WRITE_DELETE]

### Patients (`/patients`)
- **POST** `/patients` - Create patient [Secured, Permission: SALES:READ_WRITE]
- **GET** `/patients` - List patients [Secured, Permission: SALES:READ]
- **GET** `/patients/:id` - Get patient details [Secured, Permission: SALES:READ]
- **PATCH** `/patients/:id` - Update patient [Secured, Permission: SALES:READ_WRITE]
- **DELETE** `/patients/:id` - Delete patient [Secured, Permission: SALES:READ_WRITE_DELETE]

### Dashboard (`/dashboard`)
- **GET** `/dashboard/general` - General stats [Secured]
- **GET** `/dashboard/items/top-selling` - Top selling items [Secured]
- **GET** `/dashboard/items/least-selling` - Least selling items [Secured]
- **GET** `/dashboard/sales/trend` - Sales trend [Secured]
- **GET** `/dashboard/item-categories/top-selling` - Top selling categories [Secured]
- **GET** `/dashboard/sales/daily` - Daily sales [Secured]
- **GET** `/dashboard/sales/payment-methods` - Payment methods distribution [Secured]
- **GET** `/dashboard/sales/markup` - Markup stats [Secured]

### Reports (`/reports`)
- **POST** `/reports` - Create report [Secured, Permission: REPORTS:READ_WRITE]
- **GET** `/reports` - List reports [Secured, Permission: REPORTS:READ]
- **GET** `/reports/:type/data` - Get report data by type [Secured, Permission: REPORTS:READ]
- **GET** `/reports/:id` - Get report details [Secured, Permission: REPORTS:READ]
- **PATCH** `/reports/:id` - Update report [Secured, Permission: REPORTS:READ_WRITE]
- **DELETE** `/reports/:id` - Delete report [Secured, Permission: REPORTS:READ_WRITE_DELETE]

### Requests (`/department-requests`, `/item-requests`)
- **GET** `/department-requests` - List department requests [Secured]
- **PUT** `/department-requests/:id` - Update department request [Secured]
- **GET** `/department-requests/:id` - Get department request details [Secured]
- **DELETE** `/department-requests/:id` - Delete department request [Secured]
- **POST** `/item-requests` - Create item request [Secured]
- **GET** `/item-requests` - List item requests [Secured]
- **GET** `/item-requests/:id` - Get item request details [Secured]
- **PATCH** `/item-requests/:id` - Update item request [Secured]
- **DELETE** `/item-requests/:id` - Delete item request [Secured]

### Notifications (`/notifications`, `/sms`, `/mail`)
- **GET** `/notifications` - List notifications [Secured]
- **PUT** `/notifications/read` - Mark all as read [Secured]
- **PUT** `/notifications/:id/read` - Mark notification as read [Secured]
- **DELETE** `/notifications/:id` - Delete notification [Secured]
- **POST** `/sms` - Send SMS [Public]
- **GET** `/sms` - List SMS history [Public]
- **GET** `/sms/:id` - Get SMS details [Public]

### Complaints (`/complaints`)
- **POST** `/complaints` - Submit a complaint [Secured]

### Markup (`/batches/:batchId/markup`)
- **DELETE** `/batches/:batchId/markup` - Delete batch markup [Secured, Permission: ITEMS:READ_WRITE]

### Audit Logs (`/audits`)
- **GET** `/audits/export` - Export audit logs [Secured, Permission: REPORTS:READ]
- **GET** `/audits` - List audit logs [Secured, Permission: REPORTS:READ]
- **GET** `/audits/super-admin` - List super admin logs [Secured, Permission: REPORTS:READ]
- **GET** `/audits/:id` - Get audit log details [Secured, Permission: REPORTS:READ]

### Sync (`/sync`)
- **POST** `/sync` - Create sync [Public]
- **GET** `/sync` - List syncs [Public]
- **GET** `/sync/:id` - Get sync details [Public]
- **DELETE** `/sync/:id` - Delete sync [Public]

### System (`/health`, `/`)
- **GET** `/health` - Health check [Public]
- **GET** `/` - App index [Public]

### Stockmate USSD & SMS (`/ims-stockmate/ussd`, `/ims-stockmate/sms`)
- **POST** `/ims-stockmate/ussd/webhook/dev-test` - USSD dev-test webhook [Public]
- **POST** `/ims-stockmate/ussd/webhook/dev` - USSD dev webhook [Public]
- **POST** `/ims-stockmate/ussd/webhook` - USSD production webhook [Public]
- **POST** `/ims-stockmate/ussd/events` - USSD events webhook [Public]
- **POST** `/ims-stockmate/sms/webhook/dev-test` - SMS dev-test webhook [Public]
- **POST** `/ims-stockmate/sms/webhook/twilio` - SMS twilio webhook [Public]
- **POST** `/ims-stockmate/sms/webhook` - SMS production webhook [Public]

### User Settings (`/user`, `/users`)
- **GET** `/users/no-paginate` - List users without pagination [Secured]
- **POST** `/users/super-admin` - Create super admin [Public]
- **PATCH** `/user/settings` - Update user settings [Secured]
- **GET** `/user/settings` - Get user settings [Secured]
- **PATCH** `/user/settings/expiry` - Update expiry settings [Secured]
- **GET** `/user/settings/expiry` - Get expiry settings [Secured]

### Exports (`/exports`)
- **GET** `/exports` - List exports [Public]
- **GET** `/exports/performance` - Get performance exports [Public]
- **GET** `/exports/:id` - Get export details [Public]
- **DELETE** `/exports/:id` - Delete export [Public]

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
