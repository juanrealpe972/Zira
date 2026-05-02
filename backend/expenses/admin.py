from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'category', 'amount', 'date', 'type', 'created_at')
    search_fields = ('user__email', 'user__username', 'description')
    list_filter = ('category', 'date')
    readonly_fields = ('created_at',)
    ordering = ('-date',)
    date_hierarchy = 'date'
