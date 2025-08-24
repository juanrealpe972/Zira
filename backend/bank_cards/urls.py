from django.urls import path, include
from rest_framework import routers
from .views import CardViewSet

router = routers.DefaultRouter()
router.register(r'bank_cards', CardViewSet, 'bank_cards')

urlpatterns = [
    path('', include(router.urls)),
]
