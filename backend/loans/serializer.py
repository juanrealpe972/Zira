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
