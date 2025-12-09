from rest_framework import serializers
from .models import Saving

class SavingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saving
        fields = ['id', 'user', 'amount', 'goal', 'description', 'start_date', 'end_date', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    # Validación individual de campos
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0.")
        return value

    # Validaciones generales que dependen de varios campos
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError({
                "non_field_errors": ["La fecha de inicio no puede ser mayor que la fecha de fin."]
            })
        return data

    # Asigna el usuario automáticamente desde el request
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
