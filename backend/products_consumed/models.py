from django.db import models
from django.conf import settings

class Products_consumed(models.Model): # Producto consumido
    user = models.ForeignKey( # Usuario
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products_consumed"
    )
    name = models.CharField(max_length=255) # Nombre
    description = models.TextField(blank=True, null=True) # Descripción
    category = models.CharField(max_length=100, blank=True, null=True) # Categoría
    unit_price = models.DecimalField(max_digits=12, decimal_places=2) # Precio unitario
    created_at = models.DateTimeField(auto_now_add=True) # Creado en

    def __str__(self):
        return f"{self.name} - {self.unit_price}"
