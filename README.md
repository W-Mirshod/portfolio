server {
    listen 1516;
    server_name w-mirshod.com www.w-mirshod.com;

    location / {
        proxy_pass http://127.0.0.1:2425;l
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /home/root/w-mirshod_project/static/;
    }

    location /media/ {
        alias /home/root/w-mirshod_project/media/; 
    }

    error_log /var/log/nginx/w-mirshod.com_error.log;
    access_log /var/log/nginx/w-mirshod.com_access.log;
}
