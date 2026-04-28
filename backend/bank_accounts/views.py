from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import BankAccount
from .serializer import BankAccountSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List bank accounts",
        description="Retrieve a list of bank accounts for the authenticated user.",
        tags=["Bank Accounts"]
    ),
    retrieve=extend_schema(
        summary="Get bank account",
        description="Retrieve a specific bank account by ID.",
        tags=["Bank Accounts"]
    ),
    create=extend_schema(
        summary="Create bank account",
        description="Create a new bank account for the authenticated user.",
        tags=["Bank Accounts"]
    ),
    update=extend_schema(
        summary="Update bank account",
        description="Update an existing bank account.",
        tags=["Bank Accounts"]
    ),
    partial_update=extend_schema(
        summary="Partial update bank account",
        description="Partially update an existing bank account.",
        tags=["Bank Accounts"]
    ),
    destroy=extend_schema(
        summary="Delete bank account",
        description="Delete a bank account.",
        tags=["Bank Accounts"]
    ),
)
class BankAccountViewSet(viewsets.ModelViewSet):
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las cuentas del usuario actual"""
        queryset = BankAccount.objects.filter(user=self.request.user)
        
        # Filtrar por user_id si se proporciona
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset

    def perform_create(self, serializer):
        """Asocia la cuenta al usuario actual"""
        serializer.save(user=self.request.user)