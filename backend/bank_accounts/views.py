from rest_framework import viewsets, permissions
from .models import BankAccount
from .serializer import BankAccountSerializer

class BankAccountViewSet(viewsets.ModelViewSet):
    serializer_class = BankAccountSerializer
    queryset = BankAccount.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user')

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        return queryset