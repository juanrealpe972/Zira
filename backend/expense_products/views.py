from rest_framework import viewsets, permissions
from .models import ExpenseProduct
from .serializer import ExpenseProductSerializer
from users.permissions import IsOwner


class ExpenseProductViewSet(viewsets.ModelViewSet):
    queryset = ExpenseProduct.objects.all()
    serializer_class = ExpenseProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los productos de gasto del usuario actual"""
        return ExpenseProduct.objects.filter(expense__user=self.request.user)
