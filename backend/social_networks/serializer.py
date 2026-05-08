from rest_framework import serializers
from .models import SocialNetwork

class SocialNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialNetwork
        fields = ['id', 'user', 'platform', 'url', 'username', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']
