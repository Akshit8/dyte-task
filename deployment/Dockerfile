FROM node:14-alpine

WORKDIR /app

COPY bin ./bin
COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]