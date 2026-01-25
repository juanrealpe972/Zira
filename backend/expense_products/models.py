from django.db import models


class ExpenseProduct(models.Model):
    CATEGORY_CHOICES = [
        ('comida', 'Comida'),
        ('transporte', 'Transporte'),
        ('hogar', 'Hogar'),
        ('salud', 'Salud'),
        ('educacion', 'Educación'),
    ]

    expense = models.ForeignKey(
        "expenses.Expense",
        on_delete=models.CASCADE,
        related_name="expense_products"
    )
    product = models.ForeignKey(
        "products_consumeds.ProductConsumed",
        on_delete=models.CASCADE,
        related_name="expense_products"
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    quantity = models.PositiveIntegerField()
    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):
        if self.product and self.quantity:
            self.subtotal = self.quantity * self.product.unit_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
