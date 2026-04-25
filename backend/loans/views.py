from django.db import models
from rest_framework import viewsets, permissions
from .models import Loan
from .serializer import LoanSerializer
from users.permissions import IsOwner


class LoanView(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los préstamos donde el usuario es deudor o acreedor con optimización"""
        return Loan.objects.filter(
            models.Q(user=self.request.user) | models.Q(person=self.request.user)
        ).select_related('user', 'person')

    def perform_create(self, serializer):
        """Asocia el préstamo al usuario actual como deudor"""
        serializer.save(user=self.request.user)
