from django.db import models
from django.conf import settings  # para usar AUTH_USER_MODEL

class SocialNetwork(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="social_networks"
    )  # Usuario dueño de la red social
    platform = models.CharField(max_length=100)  # Facebook, Instagram
    url = models.URLField(max_length=255, unique=True)  # URL del perfil
    username = models.CharField(max_length=100)  # Nombre de usuario
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha de creación

    def __str__(self):
        return f"{self.platform} - {self.username}"
