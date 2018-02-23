FROM node

COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/
COPY ./tsconfig.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm install
CMD [ "npm", "start" ]