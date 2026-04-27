from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Comment
from .serializer import CommentSerializer
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List comments",
        description="Retrieve a list of comments for the authenticated user.",
        tags=["Comments"]
    ),
    retrieve=extend_schema(
        summary="Get comment",
        description="Retrieve a specific comment by ID.",
        tags=["Comments"]
    ),
    create=extend_schema(
        summary="Create comment",
        description="Create a new comment for the authenticated user.",
        tags=["Comments"]
    ),
    update=extend_schema(
        summary="Update comment",
        description="Update an existing comment.",
        tags=["Comments"]
    ),
    partial_update=extend_schema(
        summary="Partial update comment",
        description="Partially update an existing comment.",
        tags=["Comments"]
    ),
    destroy=extend_schema(
        summary="Delete comment",
        description="Delete a comment.",
        tags=["Comments"]
    ),
)
class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo los comentarios del usuario actual"""
        return Comment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia el comentario al usuario actual"""
        serializer.save(user=self.request.user)
