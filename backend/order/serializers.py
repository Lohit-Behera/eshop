from rest_framework import serializers
from .models import Order, OrderItem

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderAdminDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'total_price','created_at', 'is_delivered', 'name', 'email']