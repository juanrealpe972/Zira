from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import OrderItemSerializer
from .models import OrderItem


@extend_schema_view(
    list=extend_schema(
        summary="List order items",
        description="Retrieve a list of order items for the authenticated user.",
        tags=["Orders"]
    ),
    retrieve=extend_schema(
        summary="Get order item",
        description="Retrieve a specific order item by ID.",
        tags=["Orders"]
    ),
    create=extend_schema(
        summary="Create order item",
        description="Create a new order item for the authenticated user.",
        tags=["Orders"]
    ),
    update=extend_schema(
        summary="Update order item",
        description="Update an existing order item.",
        tags=["Orders"]
    ),
    partial_update=extend_schema(
        summary="Partial update order item",
        description="Partially update an existing order item.",
        tags=["Orders"]
    ),
    destroy=extend_schema(
        summary="Delete order item",
        description="Delete an order item.",
        tags=["Orders"]
    ),
)
class OrderItemView(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
    permission_classes = [permissions.IsAuthenticated]
