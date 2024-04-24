from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('<str:pk>/', views.get_product_details, name='product_details'),
]