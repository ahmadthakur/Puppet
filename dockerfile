FROM node:18-alpine3.16

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN apk add --no-cache ffmpeg

COPY . .

CMD [ "node", "src/index.js" ]