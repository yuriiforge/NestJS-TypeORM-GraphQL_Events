# syntax=docker/dockerfile:1.6

# Stage 1: Base & Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder (tests + build)
FROM deps AS builder
WORKDIR /app
COPY . .

# Run tests
RUN npm run test

# Build
RUN --mount=type=secret,id=sentry_token \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_token)" npm run build

RUN npm prune --omit=dev

# Stage 3: Production
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["sh", "-c", "node dist/main"]
