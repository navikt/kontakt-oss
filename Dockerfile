FROM navikt/node-express:12.2.0-alpine

WORKDIR /usr/src/app

COPY build/ build/

WORKDIR /usr/src/app/server
COPY server/ .

RUN npm ci
EXPOSE 3000

COPY --from=redboxoss/scuttle:latest /scuttle /bin/scuttle
ENV ENVOY_ADMIN_API=http://127.0.0.1:15000
ENV ISTIO_QUIT_API=http://127.0.0.1:15020
ENTRYPOINT ["scuttle", "/bin/sh", "start.sh"]