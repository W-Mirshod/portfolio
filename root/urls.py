"""
URL configuration for root project.
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from root import settings

urlpatterns = [
    path('admin-page/', admin.site.urls),
    path('', include('portfolio.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
