from rest_framework import viewsets, permissions
from .models import Comment
from .serializer import CommentSerializer

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
