#stage 1
FROM node:16.14.2 as node
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --configuration=production

#stage 2
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/boat-front /usr/share/nginx/html