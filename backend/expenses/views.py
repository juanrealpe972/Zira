from rest_framework import viewsets, permissions
from .models import Expense
from .serializer import ExpenseSerializer

class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    permission_classes = [permissions.IsAuthenticated]
