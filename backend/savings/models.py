from django.db import models
from django.conf import settings

class Saving(models.Model):  # Ahorros
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="savings"
    )  # Usuario asociado

    amount = models.DecimalField(max_digits=12, decimal_places=2)  # Monto del ahorro
    goal = models.CharField(max_length=255)  # Objetivo
    description = models.TextField(blank=True)  # Descripción
    start_date = models.DateField()  # Fecha de inicio
    end_date = models.DateField()  # Fecha de fin
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha de creación

    def __str__(self):
        return f"{self.goal} - {self.amount}"
