from rest_framework import viewsets, permissions
from .serializer import ProductSerializer
from .models import Product
from users.permissions import IsOwner


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los productos del usuario actual"""
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el producto al usuario actual"""
        serializer.save(user=self.request.user)
