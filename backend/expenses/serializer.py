from rest_framework import serializers
from .models import Expense

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
