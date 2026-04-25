from rest_framework import serializers
from .models import Loan


class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'id',
            'user',
            'person',
            'amount',
            'loan_date',
            'is_paid',
            'paid_amount',
            'note',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate_amount(self, value):
        """Valida que el monto sea positivo"""
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0")
        return value
    
    def validate_paid_amount(self, value):
        """Valida que el monto pagado no sea negativo"""
        if value < 0:
            raise serializers.ValidationError("El monto pagado no puede ser negativo")
        return value
    
    def validate(self, data):
        """Valida que paid_amount no exceda el amount"""
        paid_amount = data.get('paid_amount', 0)
        amount = data.get('amount')
        if amount and paid_amount > amount:
            raise serializers.ValidationError({
                'paid_amount': "El monto pagado no puede exceder el monto del préstamo"
            })
        # Si está marcado como pagado, validar que paid_amount == amount
        if data.get('is_paid') and amount and paid_amount < amount:
            raise serializers.ValidationError({
                'is_paid': "No se puede marcar como pagado si el monto pagado es menor al monto total"
            })
        return data
    
    def validate_loan_date(self, value):
        """Valida que la fecha del préstamo no sea futura"""
        from datetime import date
        if value > date.today():
            raise serializers.ValidationError("La fecha del préstamo no puede ser futura")
        return value
