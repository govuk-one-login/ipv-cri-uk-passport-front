FROM node:20.3.1-alpine
ENV PORT 3000
WORKDIR /app
RUN yarn set version 1.22.17
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
CMD yarn build
CMD yarn dev
EXPOSE $PORT
