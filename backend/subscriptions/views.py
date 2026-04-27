from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializer import SubscriptionSerializer
from .models import Subscription
from users.permissions import IsOwner


@extend_schema_view(
    list=extend_schema(
        summary="List subscriptions",
        description="Retrieve a list of subscriptions for the authenticated user.",
        tags=["Subscriptions"]
    ),
    retrieve=extend_schema(
        summary="Get subscription",
        description="Retrieve a specific subscription by ID.",
        tags=["Subscriptions"]
    ),
    create=extend_schema(
        summary="Create subscription",
        description="Create a new subscription for the authenticated user.",
        tags=["Subscriptions"]
    ),
    update=extend_schema(
        summary="Update subscription",
        description="Update an existing subscription.",
        tags=["Subscriptions"]
    ),
    partial_update=extend_schema(
        summary="Partial update subscription",
        description="Partially update an existing subscription.",
        tags=["Subscriptions"]
    ),
    destroy=extend_schema(
        summary="Delete subscription",
        description="Delete a subscription.",
        tags=["Subscriptions"]
    ),
)
class SubscriptionView(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        """Retorna solo las suscripciones del usuario actual"""
        return Subscription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Asocia la suscripción al usuario actual"""
        serializer.save(user=self.request.user)
