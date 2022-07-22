FROM node:16-alpine

WORKDIR /usr/hackrio-aws-app/app/backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
