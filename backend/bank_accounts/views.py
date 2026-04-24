from rest_framework import viewsets, permissions
from .models import BankAccount
from .serializer import BankAccountSerializer
from users.permissions import IsOwner


class BankAccountViewSet(viewsets.ModelViewSet):
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las cuentas del usuario actual"""
        return BankAccount.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la cuenta al usuario actual"""
        serializer.save(user=self.request.user)
