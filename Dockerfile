# pull official base image
FROM node:12.18.1-alpine as build

# set working directory
WORKDIR /app

ARG BACKEND_URL
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV BACKEND_URL ${BACKEND_URL}

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent

# add app
COPY . ./
# start app
RUN REACT_APP_BACKEND_URL=$BACKEND_URL yarn build-heroku

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
