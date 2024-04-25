from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Review, Cart
from .serializers import ProductSerializer, CartSerializer

# Create your views here.
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_details(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def create_cart(request):
    try:
        data = request.data
        user = request.user
        product = Product.objects.get(id=data['product_id'])
        if Cart.objects.filter(user=user, product=product).exists():
            cart = Cart.objects.get(user=user, product=product)
            total = cart.quantity + data['quantity']
            if total > product.countInStock:
                return Response({'message': 'Not enough stock'}, status=status.HTTP_400_BAD_REQUEST)
            cart.quantity = total
            cart.save()
            serializer = CartSerializer(cart, many=False)
            return Response(serializer.data)
        else:
            cart = Cart.objects.create(
                user = user,
                product = product,
                name = product.name,
                price = product.price,
                image = f'/images/{product.image}',
                countInStock = product.countInStock,
                quantity = data['quantity']
            )

            serializer = CartSerializer(cart, many=False)
            return Response(serializer.data)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    cart = Cart.objects.filter(user=user)
    for c in cart:
        product = c.product
        if product.countInStock < c.quantity:
            c.quantity = product.countInStock
            c.save()
        elif product.countInStock == 0:
            c.quantity = 0
            c.save()
        else:
            pass
    serializer = CartSerializer(cart, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart(request, pk):
    cart = Cart.objects.get(id=pk)
    cart.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)