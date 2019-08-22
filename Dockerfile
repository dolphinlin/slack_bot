FROM node:carbon                                                                                                                                                                                
WORKDIR /app

COPY . /app
RUN npm install

CMD node bin/www

EXPOSE 15500