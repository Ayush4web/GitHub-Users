FROM node:14

WORKDIR /app/public

COPY package.json .

RUN npm install

COPY . ./

CMD ["npm","start"]

