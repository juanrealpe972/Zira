from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'publication',
            'user',
            'content',
            'created_at',
            'is_active'
        ]
        read_only_fields = ['id', 'created_at']
