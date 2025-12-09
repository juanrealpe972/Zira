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
            'tags',
            'is_published',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
