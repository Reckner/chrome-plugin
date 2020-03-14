FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 5777

CMD [ "npm", "run", "start:dev" ]