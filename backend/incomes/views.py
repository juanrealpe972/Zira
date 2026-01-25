from rest_framework import viewsets, permissions
from .models import Income
from .serializer import IncomeSerializer

class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all()
    permission_classes = [permissions.IsAuthenticated]
