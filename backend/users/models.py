from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")  # Email is mandatory
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Password is encrypted here
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)  # Superuser must have is_staff=True
        extra_fields.setdefault("is_superuser", True)  # Superuser must have is_superuser=True
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    national_id = models.CharField(max_length=20, blank=True, null=True)  # Cedula
    name = models.CharField(max_length=150)  # Nombre
    email = models.EmailField(unique=True)  # Correo
    phone_prefix = models.CharField(max_length=5, blank=True, null=True)  # Prefijo
    phone = models.CharField(max_length=20, blank=True, null=True)  # Telefono
    address = models.CharField(max_length=255, blank=True, null=True)  # Direccion
    company = models.CharField(max_length=150, blank=True, null=True)  # Empresa
    role = models.CharField(max_length=50, blank=True, null=True)  # Rol
    country = models.CharField(max_length=100, blank=True, null=True)  # Pais
    city = models.CharField(max_length=100, blank=True, null=True)  # Ciudad
    photo = models.CharField(max_length=255, blank=True, null=True)  # Foto
    verified = models.BooleanField(default=False)  # Verificado
    created_at = models.DateTimeField(default=timezone.now)  # Creado en

    # Required by Django
    is_active = models.BooleanField(default=True)  # Is the user active
    is_staff = models.BooleanField(default=False)  # Staff flag

    USERNAME_FIELD = "email"  # Use email as username
    REQUIRED_FIELDS = ["name"]  # Required fields

    objects = UserManager()

    def __str__(self):
        return self.email  # Display email
