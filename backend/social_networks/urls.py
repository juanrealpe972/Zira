from django.urls import path, include
from rest_framework import routers
from social_networks import views

router = routers.DefaultRouter()
router.register(r'social_networks', views.social_networks, 'social_networks')

urlpatterns = [
    path('', include(router.urls)),
]
