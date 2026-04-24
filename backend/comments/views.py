from rest_framework import viewsets, permissions
from .models import Comment
from .serializer import CommentSerializer
from users.permissions import IsOwner


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los comentarios del usuario actual"""
        return Comment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el comentario al usuario actual"""
        serializer.save(user=self.request.user)
