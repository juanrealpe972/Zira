from django.db import models
from django.conf import settings

class SocialNetwork(models.Model):

    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('linkedin', 'LinkedIn'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
        ('github', 'GitHub'),
        ('otro', 'Otro'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="social_networks"  
    )

    platform = models.CharField(
        max_length=20,
        choices=PLATFORM_CHOICES
    )

    url = models.URLField(max_length=255, unique=True)
    username = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.platform} - {self.username}"
