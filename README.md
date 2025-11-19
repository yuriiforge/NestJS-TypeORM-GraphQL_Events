# NestJS Events Project

This project is a full-featured **NestJS application** demonstrating best practices in backend development using modern tooling and modular architecture. It includes authentication, PostgreSQL with TypeORM, GraphQL or REST support, validation, testing, Docker integration, and scalable configuration.

## Features

### **Authentication & Authorization**

- JWT-based authentication (access tokens)
- Local strategy for username/password login
- Guards for REST & GraphQL (`AuthGuardJwt`, `AuthGuardJwtGql`)
- Custom `@CurrentUser()` decorator to extract authenticated user

### **Database Layer**

- PostgreSQL database
- TypeORM integration via `@nestjs/typeorm`
- Auto-loading of entities
- Entity relationships (One-to-Many, Many-to-One, Many-to-Many)
- Repository pattern via dependency injection

### **Entities Implemented**

- **User** — authentication and authorization
- **Event** — main domain entity
- **Attendee** — relationship entity linked to Event

### **CRUD Functionality**

The project includes full CRUD operations for core modules:

- Create / Read / Update / Delete Events
- Manage attendees
- Register new users
- Authenticate users

CRUD follows NestJS best practices:

- DTO validation with `class-validator`
- Transformation using `class-transformer`
- Controller → Service → Repository architecture

### **Testing**

The application contains:

- **Unit tests** (services, controllers)
- **E2E tests** using `@nestjs/testing` + Supertest
- Jest preconfigured for TypeScript

### **Docker Support**

Includes fully functional **Docker Compose setup**:

- Builds the NestJS server
- Starts PostgreSQL database
- Environment variables controlled via `.env` and `@nestjs/config`

### **Technologies Used**

- **NestJS** (v11)
- **TypeScript** (v5)
- **TypeORM** (v0.3)
- **PostgreSQL**
- **GraphQL** using `@nestjs/graphql`
- **Passport + JWT** for authentication
- **Class Validator** for input validation
- **Jest** for testing
- **Docker** for containerization

## Environment Configuration

The app uses `@nestjs/config` with a strongly typed environment interface.
Copy variables from `.env.example` into `.env`

## Running the Project

### **Install Dependencies**

```
npm install
```

### **Run in Development Mode**

```
npm run start:dev
```

## Production Build

```
npm run build
npm run start:prod
```
