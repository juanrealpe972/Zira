from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Income
from .serializer import IncomeSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List incomes",
        description="Retrieve a list of incomes for the authenticated user. Supports filtering by category, date, search, and ordering.",
        tags=["Incomes"]
    ),
    retrieve=extend_schema(
        summary="Get income",
        description="Retrieve a specific income by ID.",
        tags=["Incomes"]
    ),
    create=extend_schema(
        summary="Create income",
        description="Create a new income for the authenticated user.",
        tags=["Incomes"]
    ),
    update=extend_schema(
        summary="Update income",
        description="Update an existing income.",
        tags=["Incomes"]
    ),
    partial_update=extend_schema(
        summary="Partial update income",
        description="Partially update an existing income.",
        tags=["Incomes"]
    ),
    destroy=extend_schema(
        summary="Delete income",
        description="Delete an income.",
        tags=["Incomes"]
    ),
)
class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'date']
    search_fields = ['description']
    ordering_fields = ['amount', 'date', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Retorna solo los ingresos del usuario actual con optimización"""
        return Income.objects.filter(user=self.request.user).select_related('user')

    def perform_create(self, serializer):
        """Asocia el ingreso al usuario actual"""
        serializer.save(user=self.request.user)
