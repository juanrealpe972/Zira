from rest_framework import viewsets, permissions
from .serializer import OrderSerializer
from .models import Order
from users.permissions import IsOwner


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las órdenes del usuario actual"""
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la orden al usuario actual"""
        serializer.save(user=self.request.user)
