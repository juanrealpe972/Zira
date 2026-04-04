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
        extra_kwargs = {
            "password": {"write_only": True, "required": False},
            "role": {"read_only": True},
            "verified": {"read_only": True},
            "email": {"validators": []},
        }

    def validate_email(self, value):
        value = value.lower()

        user = self.instance  # para update

        if User.objects.filter(email__iexact=value).exclude(
            id=user.id if user else None
        ).exists():
            raise serializers.ValidationError("Este correo ya está registrado")

        return value

    def create(self, validated_data):
        password = validated_data.pop("password", None)

        if not password:
            raise serializers.ValidationError({
                "password": "La contraseña es obligatoria"
            })

        user = User.objects.create_user(password=password, **validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
