from django.utils import timezone
from backend.settings import RAZORPAY_API_KEY, RAZORPAY_API_SECRET
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from razorpay import Client

from customuser.models import Address
from .models import Order, OrderItem
from product.models import Product
from .serializers import OrderSerializer, OrderItemSerializer

@api_view(['POST'])
def create_payment(request):
    try:
        client = Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))
        amount = int(request.data['amount']) * 100 
        payment = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
        return Response(payment)
    except Exception as e:
        logging.error(e)
        return Response({'error': 'Something went wrong. Try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

import logging
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        user = request.user
        data = request.data
        orderItems = data['orderItems']
        
        if orderItems and len(orderItems) == 0:
            return Response({'detail': 'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Create Order
            address = Address.objects.get(id=data['address'])
            order = Order.objects.create(
                user=user,
                address = address,
                shipping_price = data['shipping_price'],
                total_price = data['total_price'],
                order_payment_id = data['order_payment_id'],
                is_paid = True,
                paid_at = timezone.now(),
            )

            for i in orderItems:
                product = Product.objects.get(id=i['product'])

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    price=i['price'],
                    image=f'/images/{product.image}',
                )

                # update stock
                product.countInStock -= int(item.qty)
                product.save()
        
            return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        logging.error(e)
        return Response({'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)