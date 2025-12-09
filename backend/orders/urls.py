from django.urls import path, include
from rest_framework import routers
from orders import views

router = routers.DefaultRouter()
router.register(r'orders', views.OrderView, 'orders')

urlpatterns = [
    path('', include(router.urls)),
]
