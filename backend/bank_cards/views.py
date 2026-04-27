from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Bank_cards
from .serializer import CardSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List bank cards",
        description="Retrieve a list of bank cards for the authenticated user.",
        tags=["Bank Cards"]
    ),
    retrieve=extend_schema(
        summary="Get bank card",
        description="Retrieve a specific bank card by ID.",
        tags=["Bank Cards"]
    ),
    create=extend_schema(
        summary="Create bank card",
        description="Create a new bank card for the authenticated user.",
        tags=["Bank Cards"]
    ),
    update=extend_schema(
        summary="Update bank card",
        description="Update an existing bank card.",
        tags=["Bank Cards"]
    ),
    partial_update=extend_schema(
        summary="Partial update bank card",
        description="Partially update an existing bank card.",
        tags=["Bank Cards"]
    ),
    destroy=extend_schema(
        summary="Delete bank card",
        description="Delete a bank card.",
        tags=["Bank Cards"]
    ),
)
class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las tarjetas del usuario actual con optimización de queries"""
        return Bank_cards.objects.filter(user=self.request.user).select_related('user', 'bank_account')

    def perform_create(self, serializer):
        """Asocia la tarjeta al usuario actual"""
        serializer.save(user=self.request.user)
