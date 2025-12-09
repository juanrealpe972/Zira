from django.db import models
from django.conf import settings
from orders.models import Order
from products.models import Product

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )  # Order relationship

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="order_items"
    )  # Product relationship

    quantity = models.IntegerField()  # Quantity of the product in the order
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at moment of purchase

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
