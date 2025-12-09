from rest_framework import serializers
from .models import Products_consumed

class ConsumedProductSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")  # Usuario (solo lectura, se asigna con el token)

    class Meta:
        model = Products_consumed
        fields = ["id", "user", "name", "description", "category", "unit_price", "created_at"]
        read_only_fields = ["id", "user", "created_at"]

    # Validación: precio > 0
    def validate_unit_price(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("El precio unitario debe ser mayor a 0.")
        return value

    # Validación extra: nombre no vacío (limpiando espacios)
    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        return value.strip()
