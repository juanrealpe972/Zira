from rest_framework import viewsets, permissions
from .serializer import SubscriptionSerializer
from .models import Subscription

class SubscriptionView(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = [permissions.IsAuthenticated]
