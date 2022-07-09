FROM node:16-alpine

WORKDIR /usr/src

COPY package.json yarn.lock ./.pnp.cjs ./.pnp.loader.mjs ./.yarnrc.yml ./

COPY ./.yarn ./.yarn

COPY ./apps/main/package.json ./apps/main/package.json

COPY ./packages ./packages

RUN yarn install

COPY ./ ./

RUN yarn build:main

EXPOSE 3000

CMD ["yarn", "start:main"]