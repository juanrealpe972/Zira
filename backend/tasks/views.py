from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import TaskSerializer
from .models import Task
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List tasks",
        description="Retrieve a list of tasks for the authenticated user.",
        tags=["Tasks"]
    ),
    retrieve=extend_schema(
        summary="Get task",
        description="Retrieve a specific task by ID.",
        tags=["Tasks"]
    ),
    create=extend_schema(
        summary="Create task",
        description="Create a new task for the authenticated user.",
        tags=["Tasks"]
    ),
    update=extend_schema(
        summary="Update task",
        description="Update an existing task.",
        tags=["Tasks"]
    ),
    partial_update=extend_schema(
        summary="Partial update task",
        description="Partially update an existing task.",
        tags=["Tasks"]
    ),
    destroy=extend_schema(
        summary="Delete task",
        description="Delete a task.",
        tags=["Tasks"]
    ),
)
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las tareas del usuario actual"""
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la tarea al usuario actual"""
        serializer.save(user=self.request.user)
