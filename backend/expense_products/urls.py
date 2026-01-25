from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseProductViewSet

router = DefaultRouter()
router.register(r'expense-products', ExpenseProductViewSet, basename='expense-product')

urlpatterns = [
    path('', include(router.urls)),
]
