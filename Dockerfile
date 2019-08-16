FROM nginx:alpine

COPY dist/ /usr/share/nginx/html/
COPY test/ /usr/share/nginx/html/

COPY conf/ /etc/nginx/conf.d/
