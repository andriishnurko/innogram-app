FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app


FROM base AS pruner
RUN pnpm add -g turbo
COPY . .

RUN turbo prune auth_microservice --docker



FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY turbo.json turbo.json

RUN pnpm install --frozen-lockfile

RUN pnpm turbo build --filter=auth_microservice

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder /app/apps/auth_microservice/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/auth_microservice/package.json ./package.json
EXPOSE 3001
CMD ["node", "dist/main.js"]
