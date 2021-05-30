FROM node:14 as build
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm update
RUN npm install -g @angular/cli@8.1.1
COPY . .
EXPOSE 4200
CMD ["ng","serve","--host=0.0.0.0"]