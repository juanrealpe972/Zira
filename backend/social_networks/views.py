from rest_framework import viewsets, permissions
from .serializer import SocialNetworkSerializer
from .models import SocialNetwork
from users.permissions import IsOwner


class social_networks(viewsets.ModelViewSet):
    serializer_class = SocialNetworkSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las redes sociales del usuario actual"""
        return SocialNetwork.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la red social al usuario actual"""
        serializer.save(user=self.request.user)