from rest_framework import viewsets, permissions
from .models import Expense
from .serializer import ExpenseSerializer
from users.permissions import IsOwner


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los gastos del usuario actual"""
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el gasto al usuario actual"""
        serializer.save(user=self.request.user)
