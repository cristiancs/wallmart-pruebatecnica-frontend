# pull official base image
FROM node:12.18.1-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL $KIWICONNECTORBACKEND_URL

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent

# add app
COPY . ./
# start app
RUN REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]