from django.db import models
from django.conf import settings

class Bank_cards(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bank_cards"
    )
    bank_account = models.ForeignKey(
        "bank_accounts.BankAccount",  # <- referencia con "app.Model"
        on_delete=models.CASCADE,
        related_name="bank_cards"
    )
    card_type = models.CharField(max_length=20)
    card_number = models.CharField(max_length=20, unique=True)
    cardholder_name = models.CharField(max_length=100)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.card_type} - {self.card_number[-4:]}"
