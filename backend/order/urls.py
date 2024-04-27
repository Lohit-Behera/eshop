from django.urls import path
from . import views

urlpatterns = [
    path('payment/', views.create_payment, name='payment'),
    path('create/', views.create_order, name='create_order'),
    path('get/', views.get_user_orders, name='get_orders'),
    
    path('get/<str:pk>/', views.get_order_by_id, name='get_order_by_id'),
]