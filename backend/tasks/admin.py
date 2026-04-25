from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'status', 'priority', 'due_date', 'created_at')
    search_fields = ('user__email', 'user__username', 'title', 'description')
    list_filter = ('status', 'priority')
    readonly_fields = ('created_at',)
    ordering = ('due_date', '-priority')
    list_editable = ('status', 'priority')