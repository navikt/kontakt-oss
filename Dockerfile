FROM node:10.23.1-alpine3.9
WORKDIR /usr/src/app

COPY build/ build/
COPY server/ server/

WORKDIR /usr/src/app/server
RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
