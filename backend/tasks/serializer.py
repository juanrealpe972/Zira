# Este componente se crea para poder comvertir los valores ingresar desde Django a json y poderlos agregar desde el frontend
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'done') # En caso de querer convertir algunos valores en JSON se hace así.
        fields = '__all__' # En caso de tener muchos campos, que los convierta a todos en JSONs
