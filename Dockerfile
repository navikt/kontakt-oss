FROM node:alpine
WORKDIR /usr/src/app

COPY build/ build/
COPY server/ server/

WORKDIR /usr/src/app/server
RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
