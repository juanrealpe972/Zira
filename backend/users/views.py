from rest_framework import viewsets, generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import UserSerializer
from .models import User

# Vista CRUD de usuarios (requiere autenticación)
@extend_schema_view(
    list=extend_schema(
        summary="List users",
        description="Retrieve a list of all users. Requires authentication.",
        tags=["Users"]
    ),
    retrieve=extend_schema(
        summary="Get user",
        description="Retrieve a specific user by ID. Requires authentication.",
        tags=["Users"]
    ),
    create=extend_schema(
        summary="Create user",
        description="Create a new user. Requires authentication.",
        tags=["Users"]
    ),
    update=extend_schema(
        summary="Update user",
        description="Update an existing user. Requires authentication.",
        tags=["Users"]
    ),
    partial_update=extend_schema(
        summary="Partial update user",
        description="Partially update an existing user. Requires authentication.",
        tags=["Users"]
    ),
    destroy=extend_schema(
        summary="Delete user",
        description="Delete a user. Requires authentication.",
        tags=["Users"]
    ),
)
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    # 🔴 DESACTIVAR
    @extend_schema(
        summary="Deactivate user",
        description="Deactivate a user account. Requires authentication.",
        tags=["Users"],
        responses={200: {"description": "User deactivated successfully"}}
    )
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
    @extend_schema(
        summary="Activate user",
        description="Activate a user account. Requires authentication.",
        tags=["Users"],
        responses={200: {"description": "User activated successfully"}}
    )
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
@extend_schema(
    summary="Register user",
    description="Register a new user account. Public endpoint (no authentication required).",
    tags=["Authentication"]
)
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]