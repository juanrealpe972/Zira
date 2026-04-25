from django.db import models
from django.conf import settings

class Income(models.Model):
    CATEGORY_CHOICES = [
        ('salario', 'Salario'),
        ('venta', 'Venta'),
        ('inversion', 'Inversión'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='incomes'
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        db_index=True
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Income {self.id} - {self.category} - {self.amount}"
