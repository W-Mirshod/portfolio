# Use official Python image as base
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt && pip install gunicorn

# Copy project
COPY . /app/

# Collect static files (optional, for Django staticfiles)
RUN python manage.py collectstatic --noinput

# Expose port 8080
EXPOSE 8080

# Start Gunicorn server
CMD ["gunicorn", "root.wsgi:application", "--bind", "0.0.0.0:8080"]
