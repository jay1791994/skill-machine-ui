FROM node:21-bullseye AS build
WORKDIR /skill-machine-ui
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build


# Stage 2: Serve the application using Nginx

FROM nginx:alpine
COPY --from=build /skill-machine-ui/dist/skill-machine-ui/browser /usr/share/nginx/html/
COPY --from=build /skill-machine-ui/dist/skill-machine-ui/browser/index.csr.html /usr/share/nginx/html/index.html
RUN ls /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

