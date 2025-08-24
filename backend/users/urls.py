from django.urls import path, include
from rest_framework import routers
from users import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', views.UserView, basename='users')

urlpatterns = [
    path('', include(router.urls)),

    # Registro
    path('register/', views.RegisterUserView.as_view(), name='register'),

    # Login (token) y refresh
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
