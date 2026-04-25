from django.contrib import admin
from .models import Income


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'category', 'amount', 'date', 'created_at')
    search_fields = ('user__email', 'user__username', 'description')
    list_filter = ('category', 'date')
    readonly_fields = ('created_at',)
    ordering = ('-date',)
    date_hierarchy = 'date'
