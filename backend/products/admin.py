from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock', 'is_available', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('is_available', 'created_at')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
    list_editable = ('is_available', 'stock')