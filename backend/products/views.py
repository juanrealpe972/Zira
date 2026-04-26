from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import ProductSerializer
from .models import Product
from users.permissions import IsOwner


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
