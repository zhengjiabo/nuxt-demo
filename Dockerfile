FROM node:16-alpine

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

# 这里可以优化，只添加需要被打包的文件
ADD .nuxt/ /code/.nuxt/
ADD plugins/ /code/plugins/
ADD script/ /code/script/
ADD static/ /code/static/
ADD pages/ /code/pages/
ADD nuxt.config.js ecosystem.config.js /code/

RUN yarn build


ENV HOST 0.0.0.0

EXPOSE 3000

CMD [ "yarn", "start" ]

