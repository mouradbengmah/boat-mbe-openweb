### STAGE 1: Build ###
FROM node:16.14-alpine AS build
WORKDIR /usr/src/app
RUN npm cache clean --force
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/boat-front /usr/share/nginx/html
EXPOSE 4200