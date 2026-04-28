from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import ExpenseProduct
from .serializer import ExpenseProductSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List expense products",
        description="Retrieve a list of expense products for the authenticated user.",
        tags=["Expenses"]
    ),
    retrieve=extend_schema(
        summary="Get expense product",
        description="Retrieve a specific expense product by ID.",
        tags=["Expenses"]
    ),
    create=extend_schema(
        summary="Create expense product",
        description="Create a new expense product for the authenticated user.",
        tags=["Expenses"]
    ),
    update=extend_schema(
        summary="Update expense product",
        description="Update an existing expense product.",
        tags=["Expenses"]
    ),
    partial_update=extend_schema(
        summary="Partial update expense product",
        description="Partially update an existing expense product.",
        tags=["Expenses"]
    ),
    destroy=extend_schema(
        summary="Delete expense product",
        description="Delete an expense product.",
        tags=["Expenses"]
    ),
)
class ExpenseProductViewSet(viewsets.ModelViewSet):
    queryset = ExpenseProduct.objects.all()
    serializer_class = ExpenseProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los productos de gasto del usuario actual"""
        return ExpenseProduct.objects.filter(expense__user=self.request.user)
