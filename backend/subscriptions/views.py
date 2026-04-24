from rest_framework import viewsets, permissions
from .serializer import SubscriptionSerializer
from .models import Subscription
from users.permissions import IsOwner


class SubscriptionView(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las suscripciones del usuario actual"""
        return Subscription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la suscripción al usuario actual"""
        serializer.save(user=self.request.user)
