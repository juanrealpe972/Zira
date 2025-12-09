from rest_framework import viewsets, permissions
from .serializer import OrderItemSerializer
from .models import OrderItem

class OrderItemView(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
    permission_classes = [permissions.IsAuthenticated]
