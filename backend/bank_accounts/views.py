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

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user')

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset