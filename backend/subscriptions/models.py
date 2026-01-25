from django.db import models
from django.conf import settings

class Subscription(models.Model):

    STATUS_CHOICES = [
        ('activa', 'Activa'),
        ('cancelada', 'Cancelada'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subscriptions"
    )

    plan_name = models.CharField(max_length=100)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='activa'
    )

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plan_name} - {self.status}"
