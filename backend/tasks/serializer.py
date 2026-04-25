from rest_framework import serializers
from .models import Task
from datetime import date


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'user', 'title', 'description', 'status', 'priority', 'due_date', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_title(self, value):
        """Valida que el título no esté vacío"""
        if not value or not value.strip():
            raise serializers.ValidationError("El título no puede estar vacío")
        return value.strip()
    
    def validate_due_date(self, value):
        """Valida que la fecha de vencimiento no sea pasada para nuevas tareas"""
        if value and value < date.today():
            raise serializers.ValidationError("La fecha de vencimiento no puede ser pasada")
        return value
