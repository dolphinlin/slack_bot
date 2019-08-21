FROM node:carbon                                                                                                                                                                                
WORKDIR /app

COPY . /app/node
RUN npm install

CMD node bin/www

EXPOSE 15500