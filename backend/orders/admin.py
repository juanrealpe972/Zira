from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'status', 'created_at')
    search_fields = ('user__email', 'user__username', 'id')
    list_filter = ('status', 'created_at')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('user')