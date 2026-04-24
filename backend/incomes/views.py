from rest_framework import viewsets, permissions
from .models import Income
from .serializer import IncomeSerializer
from users.permissions import IsOwner


class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los ingresos del usuario actual"""
        return Income.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el ingreso al usuario actual"""
        serializer.save(user=self.request.user)
