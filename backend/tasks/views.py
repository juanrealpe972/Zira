from rest_framework import viewsets, permissions
from .serializer import TaskSerializer
from .models import Task
from users.permissions import IsOwner


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las tareas del usuario actual"""
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la tarea al usuario actual"""
        serializer.save(user=self.request.user)
