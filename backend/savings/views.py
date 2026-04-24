from rest_framework import viewsets, permissions
from .serializer import SavingSerializer
from .models import Saving
from users.permissions import IsOwner


class SavingView(viewsets.ModelViewSet):
    serializer_class = SavingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los ahorros del usuario actual"""
        return Saving.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el ahorro al usuario actual"""
        serializer.save(user=self.request.user)
