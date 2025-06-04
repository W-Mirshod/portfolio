server {
    server_name w-mirshod.com www.w-mirshod.com;

    # Document root for the static files
    root /mnt/portfolio/root;

    # Static files
    location /static/ {
        alias /mnt/portfolio/staticfiles/;
    }
    # Media files (if any)
    location /media/ {
        alias /mnt/portfolio/mediafiles;
    }

    # Reverse proxy to Gunicorn or your application
    location / {
        proxy_pass http://localhost:8080;  # Assuming your app is running on port 8080
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/w-mirshod.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/w-mirshod.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.w-mirshod.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = w-mirshod.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name w-mirshod.com www.w-mirshod.com;
    return 404; # managed by Certbot
}