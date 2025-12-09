from rest_framework import viewsets, permissions
from .serializer import ProductSerializer
from .models import Product

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]
