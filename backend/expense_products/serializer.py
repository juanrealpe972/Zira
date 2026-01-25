from rest_framework import serializers
from .models import ExpenseProduct


class ExpenseProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseProduct
        fields = [
            "id",
            "expense",
            "product",
            "quantity",
            "subtotal",
        ]
        read_only_fields = ["id", "subtotal"]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than zero.")
        return value
