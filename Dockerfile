FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY src ./src
RUN bun run build

FROM oven/bun:1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=bun:bun /app/dist ./dist
ENV PORT=3000
EXPOSE 3000
USER bun
CMD ["bun", "dist/index.js"]
