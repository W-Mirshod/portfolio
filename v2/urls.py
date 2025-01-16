from django.urls import path
from . import views

urlpatterns = [
    path('', views.v2_main, name='v2_main'),
]
