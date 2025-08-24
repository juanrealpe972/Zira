from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import UserSerializer
from .models import User

# Vista CRUD de usuarios (requiere autenticación por defecto)
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]  # protege con token

# Vista de registro de usuario (no requiere token)
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # acceso libre
