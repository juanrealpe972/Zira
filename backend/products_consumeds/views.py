from rest_framework import viewsets, permissions
from .models import ProductConsumed
from .serializer import ProductConsumedSerializer


class ProductConsumedViewSet(viewsets.ModelViewSet):
    serializer_class = ProductConsumedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProductConsumed.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
