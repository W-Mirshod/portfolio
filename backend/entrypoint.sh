#!/bin/bash
set -e

# Run migrations
python manage.py migrate
python manage.py collectstatic --noinput

# Create default superuser if it doesn't exist
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='Mirshod').exists():
    User.objects.create_superuser('Mirshod', 'mirshod@example.com', 'MerMirshod2')
END

# Start Gunicorn
exec gunicorn root.wsgi:application --bind 0.0.0.0:8000 