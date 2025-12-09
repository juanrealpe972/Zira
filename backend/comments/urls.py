from django.urls import path, include
from rest_framework import routers
from .views import CommentView

router = routers.DefaultRouter()
router.register(r'comments', CommentView, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
]
