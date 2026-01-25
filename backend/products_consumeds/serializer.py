from rest_framework import serializers
from .models import ProductConsumed


class ProductConsumedSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = ProductConsumed
        fields = [
            "id",
            "user",
            "name",
            "description",
            "category",
            "unit_price",
            "created_at",
        ]
        read_only_fields = ["id", "user", "created_at"]

    def validate_unit_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Unit price must be greater than zero."
            )
        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Product name cannot be empty."
            )
        return value.strip()
