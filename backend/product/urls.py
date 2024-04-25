from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/cart/', views.create_cart, name='create-cart'),
    path('get/cart/', views.get_cart, name='get-cart'),
    
    path('<str:pk>/', views.get_product_details, name='product_details'),
    path('delete/cart/<str:pk>/', views.delete_cart, name='delete-cart'),
]