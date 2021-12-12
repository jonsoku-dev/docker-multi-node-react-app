FROM node:16 as builder

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# 다른 stage 에 있는 파일을 복사 할 때 다른 stage 이름을 명시
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

