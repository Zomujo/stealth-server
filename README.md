# Stealth Server Backend

A robust NestJS-based backend server for the Stealth application, providing authentication, user management, and various business functionalities.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Security](#security)

## Overview

Stealth Server is a comprehensive backend solution built with NestJS, providing a secure and scalable API for managing users, facilities, and various business operations. The application implements robust authentication and authorization mechanisms, along with features for user management, facility management, and more.

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Permission-based authorization
- Session management
- Password reset functionality
- Email verification
- Multi-device login support

### User Management

- User registration and login
- Profile management
- Password management
- Email change functionality
- Profile picture upload (via Cloudinary)

### Security Features

- Password hashing with bcrypt
- JWT token management
- Session tracking
- Rate limiting
- Input validation
- CORS protection

### Additional Features

- Email notifications
- File upload capabilities
- Location tracking for login sessions
- Facility management
- Department management
- Inventory management
- Sales tracking
- Patient management
- Complaint handling

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer with Pug templates
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Scheduling**: @nestjs/schedule
- **Event Handling**: @nestjs/event-emitter

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Cloudinary account
- SMTP server for email notifications

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd stealth-server
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

## Configuration

The application uses environment variables for configuration. Key variables include:

```env
# APP CONFIGURATION
NODE_ENV=development
PORT=
CLIENT_URL=
STAGING_URL=
# SENTRY_DSN=

# JWT CONFIGURATION
JWT_SECRET=
JWT_TOKEN_AUDIENCE=
JWT_TOKEN_ISSUER=
JWT_ACCESS_TOKEN_TTL=
JWT_REFRESH_TOKEN_TTL=

# DATABASE CONFIGURATION
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_DIALECT=postgres
DATABASE_URL=

# EMAIL CONFIGURATION
EMAIL_HOST=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=
EMAIL_PORT=
CUSTOMER_SERVICE_MAIL=

# TWILIO CONFIGURATION
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# ATSK CONFIGURATION
ATSK_API_KEY=
ATSK_USERNAME=
ATSK_SHORT_CODE=
ATSK_SENDER=
ATSK_DEV_API_KEY=
ATSK_DEV_USERNAME=

# ARKESEL CONFIGURATION
ARK_API_KEY=
ARK_SENDER=

# CLOUDINARY CONFIGURATION
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# REDIS & QUEUE CONFIGURATION
REDIS_URL=
QUEUE_URL=
QUEUE_TLS=

# LOGTAIL CONFIGURATION
# (Add your Logtail config here)

# MISCELLANEOUS
NANOID_GEN=AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890%
```

## API Documentation

The API documentation is available at `/docs` when running the server. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Architecture

### Core Modules

- **AuthModule**: Handles authentication and authorization
- **UserModule**: Manages user-related operations
- **AdminModule**: Administrative functionalities
- **FacilityModule**: Facility management
- **NotificationModule**: Email and notification services
- **CloudinaryModule**: File upload and management

### Security Architecture

- JWT-based authentication with access and refresh tokens
- Role-based access control (RBAC)
- Permission-based authorization
- Session management with device tracking
- Secure password hashing
- Input validation and sanitization

### Database Architecture

- PostgreSQL database with Sequelize ORM
- Modular model structure
- Relationship management between entities
- Transaction support

## Security

The application implements several security measures:

1. **Authentication**
   - JWT-based authentication
   - Token refresh mechanism
   - Session management
   - Multi-device support

2. **Authorization**
   - Role-based access control
   - Permission-based authorization
   - Route protection
   - Resource-level access control

3. **Data Security**
   - Password hashing with bcrypt
   - Input validation
   - SQL injection prevention
   - XSS protection

4. **API Security**
   - Rate limiting
   - CORS protection
   - Request validation
   - Error handling

## Running the Application

1. Development mode:

   ```bash
   yarn start:dev
   ```

2. Production mode:

   ```bash
   yarn build
   yarn start:prod
   ```

The server will be available at `http://localhost:${PORT}` and the API documentation at `http://localhost:${PORT}/docs`.

## Contributing

1. Clone the repository
2. Create your feature branch
3. Commit your changes
4. Push the feature branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
