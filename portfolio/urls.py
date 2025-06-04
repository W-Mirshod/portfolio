from django.urls import path
from portfolio import views


urlpatterns = [
    path('', views.home, name='home'),
    path('robots.txt', views.robots_txt, name='robots_txt'),
]
