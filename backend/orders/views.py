from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import OrderSerializer
from .models import Order
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List orders",
        description="Retrieve a list of orders for the authenticated user. Supports filtering by status, search, and ordering.",
        tags=["Orders"]
    ),
    retrieve=extend_schema(
        summary="Get order",
        description="Retrieve a specific order by ID.",
        tags=["Orders"]
    ),
    create=extend_schema(
        summary="Create order",
        description="Create a new order for the authenticated user.",
        tags=["Orders"]
    ),
    update=extend_schema(
        summary="Update order",
        description="Update an existing order.",
        tags=["Orders"]
    ),
    partial_update=extend_schema(
        summary="Partial update order",
        description="Partially update an existing order.",
        tags=["Orders"]
    ),
    destroy=extend_schema(
        summary="Delete order",
        description="Delete an order.",
        tags=["Orders"]
    ),
)
class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = []
    ordering_fields = ['total', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Retorna solo las órdenes del usuario actual con optimización de queries"""
        return Order.objects.filter(user=self.request.user).select_related('user')

    def perform_create(self, serializer):
        """Asocia la orden al usuario actual"""
        serializer.save(user=self.request.user)
