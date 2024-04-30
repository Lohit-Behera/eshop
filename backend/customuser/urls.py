from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),
    path('allusers/', views.get_users, name='get_users'),
    
    path('add/address/', views.add_address, name='add_address'),
    path('get/address/', views.get_address, name='get_address'),
    path('contactus/', views.create_contact_us, name='contact_us'),
    path('admin/delete/images/', views.delete_all_images, name='delete_images'),
    
    path('verify/<str:token>/', views.verify_email, name='verify_email'),
    path('details/<str:pk>/', views.get_user_details, name='get_user_details'),
    path('update/<str:pk>/', views.update_user, name='update_use'),
    path('useredit/<str:pk>/', views.edit_user, name='edit_user'),
    path('removeadmin/<str:pk>/', views.remove_admin, name='remove_admin'),
    path('userdelete/<str:pk>/', views.delete_user, name='delete_user'),
    
    path('delete/address/<str:pk>/', views.delete_address, name='delete_address'),
]