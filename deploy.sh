#!/bin/bash

# Navigate to the project directory
cd /mnt/portfolio

# Rebuild and restart the Docker containers 
docker-compose up --build -d
