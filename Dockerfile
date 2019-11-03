FROM node:8.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 23009

CMD [ "npm", "start" ]
