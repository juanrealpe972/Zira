from rest_framework import viewsets, permissions
from .models import Bank_cards
from .serializer import CardSerializer

class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Bank_cards.objects.all()
    permission_classes = [permissions.IsAuthenticated]
