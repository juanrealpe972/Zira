from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductConsumedViewSet

router = DefaultRouter()
router.register(
    r'products-consumed',
    ProductConsumedViewSet,
    basename='products-consumed'
)

urlpatterns = [
    path('', include(router.urls)),
]
