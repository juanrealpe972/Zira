from rest_framework import viewsets, permissions
from .models import ExpenseProduct
from .serializer import ExpenseProductSerializer


class ExpenseProductViewSet(viewsets.ModelViewSet):
    queryset = ExpenseProduct.objects.all()
    serializer_class = ExpenseProductSerializer
    permission_classes = [permissions.IsAuthenticated]
