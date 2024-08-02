FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs18-debian11
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .
CMD [ "server.js" ]