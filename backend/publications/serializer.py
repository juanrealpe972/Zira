from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = [
            'id',
            'author',
            'title',
            'content',
            'tag',
            'is_published',
            'is_active',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
