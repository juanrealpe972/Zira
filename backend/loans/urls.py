from django.urls import path, include
from rest_framework import routers
from loans import views

router = routers.DefaultRouter()
router.register(r'loans', views.LoanView, 'loans')

urlpatterns = [
    path('', include(router.urls)),
]
