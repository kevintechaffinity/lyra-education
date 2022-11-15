FROM node:16.13
RUN apt-get update

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -D @swc/cli @swc/core
RUN npm install

COPY . .

EXPOSE 8080 3000

RUN npm run-script build
CMD [ "npm", "start" ]
