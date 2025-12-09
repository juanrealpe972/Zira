from django.db import models
from django.conf import settings

class Product(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products"
    )  # Owner of the product

    name = models.CharField(max_length=255)  # Product name
    description = models.TextField(blank=True)  # Product description
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Product price
    stock = models.IntegerField()  # Quantity in stock
    created_at = models.DateTimeField(auto_now_add=True)  # Created timestamp

    def __str__(self):
        return self.name
