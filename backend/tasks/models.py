from django.db import models
from django.conf import settings

class Task(models.Model):
    user = models.ForeignKey( 
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tasks"
    ) # Usuario propietario de la tarea
    title = models.CharField(max_length=200) # Task titulo
    description = models.TextField(blank=True) # Task descripcion
    status = models.CharField(
        max_length=20, default='pending',
        choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed')],
    ) # Task estado
    priority = models.CharField(max_length=20, default='normal') # Task prioridad
    due_date = models.DateField(null=True, blank=True) # Task fecha de vencimiento
    created_at = models.DateTimeField(auto_now_add=True) # Fecha de creacion

    def __str__(self):
        return self.title
