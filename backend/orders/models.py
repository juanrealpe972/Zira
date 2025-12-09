from django.db import models
from django.conf import settings

class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )  # Owner of the order

    total = models.DecimalField(max_digits=10, decimal_places=2)  # Total amount
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('paid', 'Paid'),
            ('shipped', 'Shipped'),
        ],
        default='pending'
    )  # Order status

    created_at = models.DateTimeField(auto_now_add=True)  # Created timestamp

    def __str__(self):
        return f"Order #{self.id} - {self.status}"
