from django.db import models
from django.conf import settings

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('alimentacion', 'Alimentación'),
        ('transporte', 'Transporte'),
        ('vivienda', 'Vivienda'),
        ('servicios', 'Servicios públicos'),
        ('salud', 'Salud'),
        ('educacion', 'Educación'),
        ('entretenimiento', 'Entretenimiento'),
        ('compras', 'Compras'),
        ('ropa', 'Ropa'),
        ('tecnologia', 'Tecnología'),
        ('viajes', 'Viajes'),
        ('mascotas', 'Mascotas'),
        ('suscripciones', 'Suscripciones'),
        ('deudas', 'Pago de deudas'),
        ('ahorro', 'Ahorro'),
        ('inversion', 'Inversión'),
        ('impuestos', 'Impuestos'),
        ('seguros', 'Seguros'),
        ('regalos', 'Regalos'),
        ('otros', 'Otros'),
    ]
    
    TYPE_CHOICES = [
        ('test', 'Test'),
        ('production', 'Producción'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='expenses'
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        db_index=True
    )
    
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default='production',
        db_index=True
    )

    title = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Expense {self.id} - {self.category} - {self.amount}"
