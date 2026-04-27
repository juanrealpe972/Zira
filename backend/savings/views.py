from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import SavingSerializer
from .models import Saving
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List savings",
        description="Retrieve a list of savings for the authenticated user.",
        tags=["Savings"]
    ),
    retrieve=extend_schema(
        summary="Get saving",
        description="Retrieve a specific saving by ID.",
        tags=["Savings"]
    ),
    create=extend_schema(
        summary="Create saving",
        description="Create a new saving for the authenticated user.",
        tags=["Savings"]
    ),
    update=extend_schema(
        summary="Update saving",
        description="Update an existing saving.",
        tags=["Savings"]
    ),
    partial_update=extend_schema(
        summary="Partial update saving",
        description="Partially update an existing saving.",
        tags=["Savings"]
    ),
    destroy=extend_schema(
        summary="Delete saving",
        description="Delete a saving.",
        tags=["Savings"]
    ),
)
class SavingView(viewsets.ModelViewSet):
    serializer_class = SavingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los ahorros del usuario actual"""
        return Saving.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el ahorro al usuario actual"""
        serializer.save(user=self.request.user)
