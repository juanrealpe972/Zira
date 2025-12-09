from rest_framework import viewsets, permissions
from .serializer import SavingSerializer
from .models import Saving

class SavingView(viewsets.ModelViewSet):
    serializer_class = SavingSerializer
    queryset = Saving.objects.all()
    permission_classes = [permissions.IsAuthenticated]
