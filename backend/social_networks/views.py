from rest_framework import viewsets, permissions
from .serializer import SocialNetworkSerializer
from .models import SocialNetwork

class social_networks(viewsets.ModelViewSet):
    serializer_class = SocialNetworkSerializer
    queryset = SocialNetwork.objects.all()
    permission_classes = [permissions.IsAuthenticated]
