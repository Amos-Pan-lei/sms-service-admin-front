# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest


# 复制静态资源到容器中
COPY ./dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
# 开放容器的 80 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]