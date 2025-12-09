from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'user',
            'name',
            'description',
            'price',
            'stock',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
