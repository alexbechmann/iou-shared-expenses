FROM node as builder

COPY ./cloud /usr/src/app

RUN npm install --prefix /usr/src/app
RUN npm run build --prefix /usr/src/app

FROM parseplatform/parse-server

COPY --from=builder /usr/src/app/lib/main.js /parse-server/cloud/main.js
