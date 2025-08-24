from rest_framework import viewsets, permissions
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]
