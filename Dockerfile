FROM node:10
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD yarn start
EXPOSE 9000
EXPOSE 8080

    
