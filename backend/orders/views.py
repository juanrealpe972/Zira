from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import OrderSerializer
from .models import Order
from users.permissions import IsOwner


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
