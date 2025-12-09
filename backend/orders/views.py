from rest_framework import viewsets, permissions
from .serializer import OrderSerializer
from .models import Order

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticated]
