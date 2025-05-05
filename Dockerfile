FROM node:lts-slim
WORKDIR /app/
COPY ./portfolio/ .
RUN npm i
EXPOSE 3000
CMD [ "npm", "start" ]