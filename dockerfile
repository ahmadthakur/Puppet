FROM node:v18.12.0.

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

CMD [ "node", "src/index.js" ]