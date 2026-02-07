# ---- Builder ----
FROM node:lts-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ---- Production ----
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile --prod

COPY --from=builder /usr/src/app/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
