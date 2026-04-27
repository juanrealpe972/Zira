from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Publication
from .serializer import PublicationSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List publications",
        description="Retrieve a list of publications for the authenticated user.",
        tags=["Publications"]
    ),
    retrieve=extend_schema(
        summary="Get publication",
        description="Retrieve a specific publication by ID.",
        tags=["Publications"]
    ),
    create=extend_schema(
        summary="Create publication",
        description="Create a new publication for the authenticated user.",
        tags=["Publications"]
    ),
    update=extend_schema(
        summary="Update publication",
        description="Update an existing publication.",
        tags=["Publications"]
    ),
    partial_update=extend_schema(
        summary="Partial update publication",
        description="Partially update an existing publication.",
        tags=["Publications"]
    ),
    destroy=extend_schema(
        summary="Delete publication",
        description="Delete a publication.",
        tags=["Publications"]
    ),
)
class PublicationView(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las publicaciones del usuario actual"""
        return Publication.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        """Asocia la publicación al usuario actual como autor"""
        serializer.save(author=self.request.user)
