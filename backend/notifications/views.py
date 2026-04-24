from rest_framework import viewsets, permissions
from .models import Notification
from .serializer import NotificationSerializer
from users.permissions import IsOwner


class NotificationView(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las notificaciones del usuario actual"""
        return Notification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la notificación al usuario actual"""
        serializer.save(user=self.request.user)
