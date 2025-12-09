from django.urls import path, include
from rest_framework import routers
from products_consumed import views

router = routers.DefaultRouter()
router.register(r'products_consumed', views.ConsumedProductView, 'products_consumed')

urlpatterns = [
    path('', include(router.urls)),
]
