FROM node

WORKDIR /app

COPY    . .

RUN npm install
RUN pwd 
RUN ls -la

EXPOSE  8090
CMD     [ "server.js" ]