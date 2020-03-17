FROM node:alpine
WORKDIR /app

COPY build/ build/
COPY server/ server/

WORKDIR /app/server
RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
