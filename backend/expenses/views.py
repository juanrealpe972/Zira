from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Expense
from .serializer import ExpenseSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List expenses",
        description="Retrieve a list of expenses for the authenticated user. Supports filtering by category, date, search, and ordering.",
        tags=["Expenses"]
    ),
    retrieve=extend_schema(
        summary="Get expense",
        description="Retrieve a specific expense by ID.",
        tags=["Expenses"]
    ),
    create=extend_schema(
        summary="Create expense",
        description="Create a new expense for the authenticated user.",
        tags=["Expenses"]
    ),
    update=extend_schema(
        summary="Update expense",
        description="Update an existing expense.",
        tags=["Expenses"]
    ),
    partial_update=extend_schema(
        summary="Partial update expense",
        description="Partially update an existing expense.",
        tags=["Expenses"]
    ),
    destroy=extend_schema(
        summary="Delete expense",
        description="Delete an expense.",
        tags=["Expenses"]
    ),
)
class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'date']
    search_fields = ['description']
    ordering_fields = ['amount', 'date', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Retorna solo los gastos del usuario actual con optimización"""
        return Expense.objects.filter(user=self.request.user).select_related('user')

    def perform_create(self, serializer):
        """Asocia el gasto al usuario actual"""
        serializer.save(user=self.request.user)
