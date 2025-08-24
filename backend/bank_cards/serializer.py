from rest_framework import serializers
from .models import Bank_cards

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank_cards
        fields = [ "id", "user", "bank_account", "card_type", "card_number", "cardholder_name", "expiration_date", "cvv", "created_at" ]
        read_only_fields = ["id", "created_at"]
