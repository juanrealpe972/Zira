from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'users', views.UserView, basename='user')


urlpatterns = [
    path('', include(router.urls)),

    # Registro
    path('register/', views.RegisterUserView.as_view(), name='register'),

    # Login (token) y refresh
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
