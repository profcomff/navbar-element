FROM node:16 AS build
WORKDIR /app
ADD ./package.json yarn.lock /app/
RUN corepack enable && yarn install --frozen-lockfile --link-duplicates
ADD . /app
RUN yarn run build

FROM nginx:1.21
ADD ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN export APPJS_NAME=$(cd /usr/share/nginx/html && ls js/*.js) \
    && sed -i 's|APPJS_NAME|'${APPJS_NAME}'|g' /etc/nginx/conf.d/default.conf
