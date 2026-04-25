from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = [
            'id',
            'user',
            'plan_name',
            'status',
            'start_date',
            'end_date',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if start_date and end_date and start_date >= end_date:
            raise serializers.ValidationError({
                'end_date': 'La fecha de fin debe ser mayor a la fecha de inicio'
            })
        return data
    
    def validate_start_date(self, value):
        """Valida que la fecha de inicio no sea pasada"""
        from django.utils import timezone
        if value < timezone.now():
            raise serializers.ValidationError("La fecha de inicio no puede ser pasada")
        return value
