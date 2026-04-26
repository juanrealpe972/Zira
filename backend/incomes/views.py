from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Income
from .serializer import IncomeSerializer
from users.permissions import IsOwner


class IncomeView(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'date']
    search_fields = ['description']
    ordering_fields = ['amount', 'date', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Retorna solo los ingresos del usuario actual con optimización"""
        return Income.objects.filter(user=self.request.user).select_related('user')

    def perform_create(self, serializer):
        """Asocia el ingreso al usuario actual"""
        serializer.save(user=self.request.user)
