FROM node:16-alpine

RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node ./nodejs .

RUN npm install typescript -g
RUN npm install

USER node

RUN tsc

WORKDIR /app/dist

COPY --chown=node:node ./nodejs/package-lock.json .
COPY --chown=node:node ./nodejs/package.json .
COPY --chown=node:node ./nodejs/src/resources ./resources

VOLUME /app/dist/resources/data

CMD ["node", "main.js"]