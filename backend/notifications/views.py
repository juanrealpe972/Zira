from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Notification
from .serializer import NotificationSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List notifications",
        description="Retrieve a list of notifications for the authenticated user.",
        tags=["Notifications"]
    ),
    retrieve=extend_schema(
        summary="Get notification",
        description="Retrieve a specific notification by ID.",
        tags=["Notifications"]
    ),
    create=extend_schema(
        summary="Create notification",
        description="Create a new notification for the authenticated user.",
        tags=["Notifications"]
    ),
    update=extend_schema(
        summary="Update notification",
        description="Update an existing notification.",
        tags=["Notifications"]
    ),
    partial_update=extend_schema(
        summary="Partial update notification",
        description="Partially update an existing notification.",
        tags=["Notifications"]
    ),
    destroy=extend_schema(
        summary="Delete notification",
        description="Delete a notification.",
        tags=["Notifications"]
    ),
)
class NotificationView(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las notificaciones del usuario actual"""
        return Notification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la notificación al usuario actual"""
        serializer.save(user=self.request.user)
