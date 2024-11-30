from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

#A través de todo este código, se puede saber que datos son los que se van a traer y ya se puede generar el CRUD.