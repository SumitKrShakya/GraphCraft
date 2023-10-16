FROM node:18.10.0-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

EXPOSE 3000

# ENV MONGOOSE_URI=mongodb+srv://sumitshakyaofficial:fUTdhC9CnTtaWD6q@cluster0.vh3kmop.mongodb.net/graph
COPY .env /app/.env

CMD ["npm", "start"]


