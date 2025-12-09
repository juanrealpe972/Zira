from rest_framework import viewsets, permissions
from .models import Publication
from .serializer import PublicationSerializer

class PublicationView(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    queryset = Publication.objects.all()
    permission_classes = [permissions.IsAuthenticated]
