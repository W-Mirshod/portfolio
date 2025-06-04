#!/bin/bash

# Navigate to the project directory
cd /mnt/portfolio

# Fetch the latest changes from the repository
git fetch origin
git reset --hard origin/master
git clean -fd
git pull

# Rebuild and restart the Docker containers 
docker-compose up --build -d
