FROM node:16-alpine as builder

WORKDIR /usr/hackrio-aws-app/app/client

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/hackrio-aws-app/app/client/build /usr/share/nginx/html
