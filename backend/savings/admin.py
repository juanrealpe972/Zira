from django.contrib import admin
from .models import Saving


@admin.register(Saving)
class SavingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'goal', 'amount', 'start_date', 'end_date', 'created_at')
    search_fields = ('user__email', 'user__username', 'goal', 'description')
    list_filter = ('start_date', 'end_date')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)