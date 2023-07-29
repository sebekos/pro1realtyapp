FROM node:16 as builder
WORKDIR /app
COPY . .
RUN rm -rf client
COPY /client/build /app/client/build
RUN npm ci --production

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .
CMD [ "node", "server.js" ]