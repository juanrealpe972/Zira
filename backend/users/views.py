from rest_framework import viewsets, generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import User

# Vista CRUD de usuarios (requiere autenticación)
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    # 🔴 DESACTIVAR
    @action(detail=True, methods=["patch"])
    def deactivate(self, request, pk=None):
        user = self.get_object()

        if not user.is_active:
            return Response(
                {"message": "El usuario ya está desactivado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = False
        user.save()

        return Response(
            {"message": "Usuario desactivado correctamente"},
            status=status.HTTP_200_OK
        )

    # 🟢 ACTIVAR
    @action(detail=True, methods=["patch"])
    def activate(self, request, pk=None):
        user = self.get_object()

        if user.is_active:
            return Response(
                {"message": "El usuario ya está activo"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = True
        user.save()

        return Response(
            {"message": "Usuario activado correctamente"},
            status=status.HTTP_200_OK
        )


# Vista de registro (pública)
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]