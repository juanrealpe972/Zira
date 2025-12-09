from django.db import models
from django.conf import settings

class Subscription(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('canceled', 'Canceled'),
        ('trial', 'Trial'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subscriptions"
    )  # User that owns the subscription

    plan_name = models.CharField(max_length=100)  # Name of the subscription plan
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='trial'
    )  # Subscription status
    start_date = models.DateTimeField()  # When the subscription starts
    end_date = models.DateTimeField()    # When the subscription ends

    created_at = models.DateTimeField(auto_now_add=True)  # Creation timestamp

    def __str__(self):
        return f"{self.plan_name} - {self.user}"
