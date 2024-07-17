from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/cart/', views.create_cart, name='create-cart'),
    path('get/cart/', views.get_cart, name='get-cart'),
    path('get/all/', views.get_all_products, name='get_all_products'),
    path('create/', views.create_product, name='create-product'),
    path('top/', views.get_top_products, name='top-products'),
    
    path('update/<str:pk>/', views.update_product, name='update-product'),
    path('delete/<str:pk>/', views.delete_product, name='delete-product'),
    path('<str:pk>/', views.get_product_details, name='product_details'),
    path('create/review/<str:pk>/', views.create_product_review, name='create-review'),
    path('delete/cart/<str:pk>/', views.delete_cart, name='delete-cart'),
]