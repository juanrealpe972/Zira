from django.urls import path, include
from rest_framework import routers
from bank_accounts import views

router = routers.DefaultRouter()
router.register(r'bank_accounts', views.BankAccountViewSet, 'bank_accounts')

urlpatterns = [
    path('', include(router.urls)),
]
