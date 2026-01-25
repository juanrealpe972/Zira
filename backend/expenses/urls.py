from django.urls import path, include
from rest_framework import routers
from expenses import views

router = routers.DefaultRouter()
router.register(r'expenses', views.ExpenseView, 'expenses')

urlpatterns = [
    path('', include(router.urls)),
]
