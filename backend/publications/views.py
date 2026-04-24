from rest_framework import viewsets, permissions
from .models import Publication
from .serializer import PublicationSerializer
from users.permissions import IsOwner


class PublicationView(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las publicaciones del usuario actual"""
        return Publication.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        """Asocia la publicación al usuario actual como autor"""
        serializer.save(author=self.request.user)
