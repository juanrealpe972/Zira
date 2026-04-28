from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import SocialNetworkSerializer
from .models import SocialNetwork
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List social networks",
        description="Retrieve a list of social networks for the authenticated user.",
        tags=["Social Networks"]
    ),
    retrieve=extend_schema(
        summary="Get social network",
        description="Retrieve a specific social network by ID.",
        tags=["Social Networks"]
    ),
    create=extend_schema(
        summary="Create social network",
        description="Create a new social network for the authenticated user.",
        tags=["Social Networks"]
    ),
    update=extend_schema(
        summary="Update social network",
        description="Update an existing social network.",
        tags=["Social Networks"]
    ),
    partial_update=extend_schema(
        summary="Partial update social network",
        description="Partially update an existing social network.",
        tags=["Social Networks"]
    ),
    destroy=extend_schema(
        summary="Delete social network",
        description="Delete a social network.",
        tags=["Social Networks"]
    ),
)
class social_networks(viewsets.ModelViewSet):
    serializer_class = SocialNetworkSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las redes sociales del usuario actual"""
        return SocialNetwork.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la red social al usuario actual"""
        serializer.save(user=self.request.user)