# Portfolio Website

This repository contains my portfolio website built with React and Django, now fully migrated to a React frontend with Vite.

## Production Deployment

### 1. Build and Run Docker Container

```bash
cd app
docker build -t portfolio-app .
docker run -d -p 8080:8080 --name portfolio-container portfolio-app
```

### 2. Host Nginx Configuration

Create or modify `/etc/nginx/sites-available/w-mirshod.com.conf` with the following:

```nginx
server {
    server_name w-mirshod.com www.w-mirshod.com;

    # Reverse proxy to Docker container
    location / {
        proxy_pass http://localhost:8080;
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
```

### 3. Enable Site and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/w-mirshod.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Certificate with Let's Encrypt

```bash
sudo certbot --nginx -d w-mirshod.com -d www.w-mirshod.com
```

### 5. Update DNS Records

Ensure your domain's DNS records point to your server's IP address:

- A record for `w-mirshod.com` pointing to your server IP
- A record for `www.w-mirshod.com` pointing to your server IP