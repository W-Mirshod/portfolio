from django.urls import path
from . import views

urlpatterns = [
    path('', views.v2_main, name='home'),  # V2 is now home
    path('contact/', views.contact_view, name='contact'),  # Handle contact form
]
