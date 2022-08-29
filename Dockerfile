FROM node:16 AS build
ARG BUILD_MODE
WORKDIR /app
ADD ./package.json yarn.lock /app/
RUN corepack enable && yarn install --frozen-lockfile --link-duplicates
ADD . /app
RUN yarn build --mode ${BUILD_MODE}

FROM nginx:1.21
ADD ./default.conf /etc/nginx/conf.d/default.conf
ADD ./docker_entrypoint.sh /docker_entrypoint.sh
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod +x /docker_entrypoint.sh && /docker_entrypoint.sh
