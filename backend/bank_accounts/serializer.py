from rest_framework import serializers
from .models import BankAccount

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['id', 'user', 'bank_name', 'account_type', 'account_number', 'balance', 'created_at']
        read_only_fields = ['id', 'created_at']
