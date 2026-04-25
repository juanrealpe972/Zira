from rest_framework import serializers
from .models import Expense
from decimal import Decimal


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = [
            'id',
            'user',
            'category',
            'amount',
            'description',
            'date',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate_amount(self, value):
        """Valida que el monto sea positivo"""
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0")
        return value
    
    def validate_date(self, value):
        """Valida que la fecha no sea futura"""
        from datetime import date
        if value > date.today():
            raise serializers.ValidationError("La fecha no puede ser futura")
        return value
