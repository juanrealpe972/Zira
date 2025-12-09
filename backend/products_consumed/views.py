from rest_framework import viewsets, permissions
from .models import Products_consumed
from .serializer import ConsumedProductSerializer

class ConsumedProductView(viewsets.ModelViewSet):
    serializer_class = ConsumedProductSerializer
    queryset = Products_consumed.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    # Solo ver los productos del usuario autenticado
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by("-created_at")

    # Asignar automáticamente el usuario del token
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
