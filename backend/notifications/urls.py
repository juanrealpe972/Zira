from django.urls import path, include
from rest_framework import routers
from notifications import views

router = routers.DefaultRouter()
router.register(r'notifications', views.NotificationView, 'notifications')

urlpatterns = [
    path('', include(router.urls)),
]
