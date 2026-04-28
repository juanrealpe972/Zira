from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import ProductConsumed
from .serializer import ProductConsumedSerializer


@extend_schema_view(
    list=extend_schema(
        summary="List consumed products",
        description="Retrieve a list of consumed products for the authenticated user.",
        tags=["Products"]
    ),
    retrieve=extend_schema(
        summary="Get consumed product",
        description="Retrieve a specific consumed product by ID.",
        tags=["Products"]
    ),
    create=extend_schema(
        summary="Create consumed product",
        description="Create a new consumed product for the authenticated user.",
        tags=["Products"]
    ),
    update=extend_schema(
        summary="Update consumed product",
        description="Update an existing consumed product.",
        tags=["Products"]
    ),
    partial_update=extend_schema(
        summary="Partial update consumed product",
        description="Partially update an existing consumed product.",
        tags=["Products"]
    ),
    destroy=extend_schema(
        summary="Delete consumed product",
        description="Delete a consumed product.",
        tags=["Products"]
    ),
)
class ProductConsumedViewSet(viewsets.ModelViewSet):
    serializer_class = ProductConsumedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProductConsumed.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
