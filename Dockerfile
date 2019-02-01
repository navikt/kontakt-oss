FROM node:alpine as builder
WORKDIR /usr/src/app

RUN yarn add express mustache-express jsdom request promise http-proxy-middleware


FROM node:alpine
WORKDIR /usr/src/app

COPY build ./build
COPY src/server ./src/server
COPY start.sh ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "src/server/server.js"]
ENTRYPOINT ["/bin/sh", "start.sh"]