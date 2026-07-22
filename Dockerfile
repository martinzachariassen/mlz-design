# syntax=docker/dockerfile:1

# ── Build stage ───────────────────────────────────────────────────────────────
# Node image (Storybook 10 needs Node >= 20.16) with Bun installed for the
# frozen-lockfile install. Storybook runs under Node via its bin shebang.
FROM node:22-slim AS build
WORKDIR /app
RUN npm install -g bun@1
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build:storybook

# ── Runtime stage ─────────────────────────────────────────────────────────────
# Just Node + the static output + the zero-dependency server.
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/storybook-static ./storybook-static
COPY server.mjs ./server.mjs
EXPOSE 8080
CMD ["node", "server.mjs"]
