from django.urls import path, include
from rest_framework import routers
from .views import PublicationView

router = routers.DefaultRouter()
router.register(r'publications', PublicationView, basename='publications')

urlpatterns = [
    path('', include(router.urls)),
]
