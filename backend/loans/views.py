from rest_framework import viewsets, permissions
from .models import Loan
from .serializer import LoanSerializer

class LoanView(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()
    permission_classes = [permissions.IsAuthenticated]
