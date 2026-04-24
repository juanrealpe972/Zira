from rest_framework import viewsets, permissions
from .models import Bank_cards
from .serializer import CardSerializer
from users.permissions import IsOwner


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las tarjetas del usuario actual"""
        return Bank_cards.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la tarjeta al usuario actual"""
        serializer.save(user=self.request.user)
