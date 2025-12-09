from django.urls import path, include
from rest_framework import routers
from savings import views

router = routers.DefaultRouter()
router.register(r'savings', views.SavingView, 'savings')

urlpatterns = [
    path('', include(router.urls)),
]
