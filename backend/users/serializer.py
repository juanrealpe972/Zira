from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "national_id", "name", "email", "phone_prefix", "phone", "address",
            "company", "role", "country", "city", "photo", "verified", "created_at",
            "is_active", "is_staff", "password"
        ]
        extra_kwargs = {"password": {"write_only": True}}  # Password write-only

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User.objects.create_user(**validated_data, password=password)
        return user
