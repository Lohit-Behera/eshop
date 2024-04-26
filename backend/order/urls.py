from django.urls import path
from . import views

urlpatterns = [
    path('payment/', views.create_payment, name='payment'),
    path('create/', views.create_order, name='create_order'),
    
]