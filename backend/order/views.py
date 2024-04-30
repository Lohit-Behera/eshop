from django.utils import timezone
from backend.settings import RAZORPAY_API_KEY, RAZORPAY_API_SECRET
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from razorpay import Client

from customuser.models import Address
from .models import Order, OrderItem
from product.models import Product, Cart
from .serializers import OrderSerializer, OrderItemSerializer
from customuser.serializers import AddressSerializer

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
                cart = Cart.objects.get(user=user, product=product)

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    price=i['price'],
                    image=f'/images/{product.image}',
                )

                product.countInStock -= int(i['qty'])
                product.save()
                cart.delete()

            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)

    except:
        return Response({'detail': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    user = request.user
    orders = user.order_set.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    order = Order.objects.get(id=pk)
    order_items = OrderItem.objects.filter(order=order)
    address = Address.objects.get(id=order.address.id)
    address_serializer = AddressSerializer(address, many=False)
    item_serializer = OrderItemSerializer(order_items, many=True)
    serializer = OrderSerializer(order, many=False)
    return Response({'order': serializer.data, 'items': item_serializer.data, 'address': address_serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    
    page = request.query_params.get('page')
    paginator = Paginator(orders, 10)
    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)
    
    serializer = OrderSerializer(orders, many=True)
    return Response({'orders': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_order_by_id_admin(request, pk):
    orders = Order.objects.get(id=pk)
    serializer = OrderSerializer(orders, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order(request, pk):
    order = Order.objects.get(id=pk)
    order.is_delivered = True
    order.delivered_at = timezone.now()
    order.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_order(request, pk):
    order = Order.objects.get(id=pk)
    order.delete()
    return Response('Order was deleted')
