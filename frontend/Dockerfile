FROM node:alpine3.11 as build-deps

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

FROM nginx:1.17.9-alpine

ENV WORKDIR /usr/src/app

WORKDIR ${WORKDIR}

COPY nginx.conf /etc/nginx/nginx.conf.template

COPY --from=build-deps ${WORKDIR}/build /var/www

COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]