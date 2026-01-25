from rest_framework import viewsets, permissions
from .models import Notification
from .serializer import NotificationSerializer

class NotificationView(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    permission_classes = [permissions.IsAuthenticated]
