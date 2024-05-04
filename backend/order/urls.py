from django.urls import path
from . import views

urlpatterns = [
    path('payment/', views.create_payment, name='payment'),
    path('create/', views.create_order, name='create_order'),
    path('get/', views.get_user_orders, name='get_orders'),
    path('get/all/', views.get_all_orders, name='get_all_orders'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    path('get/<str:pk>/', views.get_order_by_id, name='get_order_by_id'),
    path('admin/get/<str:pk>/', views.get_order_by_id_admin, name='get_order_by_id_admin'),
    path('update/<str:pk>/', views.update_order, name='update_order'),
    path('delete/<str:pk>/', views.delete_order, name='delete_order'),
]