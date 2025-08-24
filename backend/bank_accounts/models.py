from django.db import models
from django.conf import settings  # para usar AUTH_USER_MODEL

class BankAccount(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bank_accounts"
    )  # Usuario dueño de la cuenta

    bank_name = models.CharField(max_length=100)  # Nequi, Bancolombia
    account_type = models.CharField(max_length=50)  # ahorro, corriente
    account_number = models.CharField(max_length=50, unique=True)  # número único de cuenta
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)  # saldo
    created_at = models.DateTimeField(auto_now_add=True)  # fecha de creación

    def __str__(self):
        return f"{self.bank_name} - {self.account_number}"
