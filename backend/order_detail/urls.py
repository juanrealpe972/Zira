from django.urls import path, include
from rest_framework import routers
from order_detail import views

router = routers.DefaultRouter()
router.register(r'order-items', views.OrderItemView, 'order-items')

urlpatterns = [
    path('', include(router.urls)),
]
