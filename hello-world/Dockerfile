FROM node:carbon-alpine as builder
WORKDIR /tmp/build
COPY . .
RUN npm install
RUN npm run build

FROM node:carbon-alpine
WORKDIR /opt/app
COPY --from=builder /tmp/build/ ./
CMD npm start
