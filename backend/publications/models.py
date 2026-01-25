from django.db import models
from django.conf import settings

class Publication(models.Model):

    TAG_CHOICES = [
        ('hogar', 'Hogar'),
        ('comida', 'Comida'),
        ('electrodomestico', 'Electrodoméstico'),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="publications"
    )

    title = models.CharField(max_length=255)
    content = models.TextField()

    tag = models.CharField(
        max_length=20,
        choices=TAG_CHOICES
    )  # etiqueta enum

    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
