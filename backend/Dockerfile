FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir django djangorestframework
RUN pip install --no-cache-dir gunicorn
EXPOSE 8000

# Entrypoint script to run migrations and create superuser
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"] 