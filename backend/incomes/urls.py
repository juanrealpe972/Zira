from django.urls import path, include
from rest_framework import routers
from incomes import views

router = routers.DefaultRouter()
router.register(r'incomes', views.IncomeView, 'incomes')

urlpatterns = [
    path('', include(router.urls)),
]
