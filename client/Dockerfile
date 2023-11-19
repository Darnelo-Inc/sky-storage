FROM node:20-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build

FROM nginx:1.25.0-alpine
COPY --from=builder /app/build /var/www/sky-storage/
EXPOSE 80
EXPOSE 443
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]