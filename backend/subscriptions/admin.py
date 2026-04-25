from django.contrib import admin
from .models import Subscription


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'plan_name', 'status', 'start_date', 'end_date')
    search_fields = ('user__email', 'user__username', 'plan_name')
    list_filter = ('status',)
    readonly_fields = ('created_at',)
    ordering = ('-start_date',)
