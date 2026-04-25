from rest_framework import serializers
from .models import Bank_cards
from datetime import date


class CardSerializer(serializers.ModelSerializer):
    # Campo calculado para mostrar solo los últimos 4 dígitos
    masked_card_number = serializers.SerializerMethodField()
    
    class Meta:
        model = Bank_cards
        fields = ["id", "user", "bank_account", "card_type", "card_number", 
                  "masked_card_number", "cardholder_name", "expiration_date", 
                  "cvv", "created_at"]
        read_only_fields = ["id", "created_at"]
    
    def get_masked_card_number(self, obj):
        """Retorna solo los últimos 4 dígitos del número de tarjeta"""
        if obj.card_number:
            return f"****-****-****-{obj.card_number[-4:]}"
        return None
    
    def validate_cvv(self, value):
        """Valida que el CVV tenga 3 o 4 dígitos"""
        if not value or not value.isdigit():
            raise serializers.ValidationError("El CVV debe contener solo dígitos")
        if len(value) < 3 or len(value) > 4:
            raise serializers.ValidationError("El CVV debe tener 3 o 4 dígitos")
        return value
    
    def validate_card_number(self, value):
        """Valida que el número de tarjeta tenga entre 13 y 19 dígitos"""
        if not value or not value.isdigit():
            raise serializers.ValidationError("El número de tarjeta debe contener solo dígitos")
        if len(value) < 13 or len(value) > 19:
            raise serializers.ValidationError("El número de tarjeta debe tener entre 13 y 19 dígitos")
        return value
    
    def validate_expiration_date(self, value):
        """Valida que la fecha de expiración sea futura"""
        if value < date.today():
            raise serializers.ValidationError("La tarjeta ha expirado")
        return value
    
    def to_representation(self, instance):
        """Override para no mostrar CVV ni número completo en respuestas"""
        data = super().to_representation(instance)
        # El CVV nunca debe mostrarse en las respuestas
        data.pop('cvv', None)
        # Enmascarar número si viene completo (para backward compatibility)
        if data.get('card_number') and len(data.get('card_number', '')) > 4:
            data['card_number'] = f"****-****-****-{data['card_number'][-4:]}"
        return data
