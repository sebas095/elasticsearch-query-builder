FROM node
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 8080
CMD sh -c "sleep 10 && npm run start:seed"