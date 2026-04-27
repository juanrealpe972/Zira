from django.db import models
from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Loan
from .serializer import LoanSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List loans",
        description="Retrieve a list of loans where the user is debtor or creditor.",
        tags=["Loans"]
    ),
    retrieve=extend_schema(
        summary="Get loan",
        description="Retrieve a specific loan by ID.",
        tags=["Loans"]
    ),
    create=extend_schema(
        summary="Create loan",
        description="Create a new loan for the authenticated user.",
        tags=["Loans"]
    ),
    update=extend_schema(
        summary="Update loan",
        description="Update an existing loan.",
        tags=["Loans"]
    ),
    partial_update=extend_schema(
        summary="Partial update loan",
        description="Partially update an existing loan.",
        tags=["Loans"]
    ),
    destroy=extend_schema(
        summary="Delete loan",
        description="Delete a loan.",
        tags=["Loans"]
    ),
)
class LoanView(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los préstamos donde el usuario es deudor o acreedor con optimización"""
        return Loan.objects.filter(
            models.Q(user=self.request.user) | models.Q(person=self.request.user)
        ).select_related('user', 'person')

    def perform_create(self, serializer):
        """Asocia el préstamo al usuario actual como deudor"""
        serializer.save(user=self.request.user)
