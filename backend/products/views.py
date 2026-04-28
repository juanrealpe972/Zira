from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import ProductSerializer
from .models import Product
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List products",
        description="Retrieve a list of products for the authenticated user. Supports filtering by name, price, search, and ordering.",
        tags=["Products"]
    ),
    retrieve=extend_schema(
        summary="Get product",
        description="Retrieve a specific product by ID.",
        tags=["Products"]
    ),
    create=extend_schema(
        summary="Create product",
        description="Create a new product for the authenticated user.",
        tags=["Products"]
    ),
    update=extend_schema(
        summary="Update product",
        description="Update an existing product.",
        tags=["Products"]
    ),
    partial_update=extend_schema(
        summary="Partial update product",
        description="Partially update an existing product.",
        tags=["Products"]
    ),
    destroy=extend_schema(
        summary="Delete product",
        description="Delete a product.",
        tags=["Products"]
    ),
)
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'price']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Retorna solo los productos del usuario actual"""
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el producto al usuario actual"""
        serializer.save(user=self.request.user)
