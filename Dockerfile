# syntax=docker/dockerfile:1.6

# Stage 1: Base & Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Test 
FROM deps AS test
COPY . . 
RUN npm run test 

# Stage 3: Build
FROM deps AS builder
WORKDIR /app

COPY . .

RUN --mount=type=secret,id=sentry_token \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_token) npm run build

# Stage 4: Production (Final Image)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --omit=dev 

EXPOSE 3000
CMD ["sh", "-c", "npm run migration:run && node dist/main"]