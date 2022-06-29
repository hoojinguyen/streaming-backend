FROM node:carbon-alpine

WORKDIR /

ADD . /

RUN ls && \
    rm -r node_modules || true && \
    cd / && yarn install

CMD [ "yarn", "start" ]
