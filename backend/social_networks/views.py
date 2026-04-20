from rest_framework import viewsets, permissions
from .serializer import SocialNetworkSerializer
from .models import SocialNetwork

class social_networks(viewsets.ModelViewSet):
    serializer_class = SocialNetworkSerializer
    queryset = SocialNetwork.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user')

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset