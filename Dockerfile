FROM node:alpine as builder
WORKDIR /usr/src/app

RUN yarn add express
RUN yarn add mustache-express
RUN yarn add jsdom
RUN yarn add request
RUN yarn add promise


FROM node:alpine
WORKDIR /usr/src/app

COPY build ./build
COPY src/server/server.js ./src/server/server.js
COPY src/server/decorator.js src/server/decorator.js
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "src/server/server.js"]