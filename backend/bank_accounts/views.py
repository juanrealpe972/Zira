from rest_framework import viewsets, permissions
from .models import BankAccount
from .serializer import BankAccountSerializer

class BankAccountViewSet(viewsets.ModelViewSet):
    serializer_class = BankAccountSerializer
    queryset = BankAccount.objects.all()
    permission_classes = [permissions.IsAuthenticated]
