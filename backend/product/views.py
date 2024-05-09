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
    search = request.query_params.get('search', '')
    brand = request.query_params.get('brand', '')
    
    if brand != '':
        products = Product.objects.filter(brand__icontains=brand).order_by('name')
    elif search != '':
        products = Product.objects.filter(name__icontains=search).order_by('name')
    else:
        products = Product.objects.all().order_by('-createdAt')[:36]

    page = request.query_params.get('page')
    paginator = Paginator(products, 12)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

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

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_products(request):
    products = Product.objects.all().order_by('name')
    
    page = request.query_params.get('page')
    paginator = Paginator(products, 10)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)
    
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({'massage': 'Product deleted successfully'})
    except:
        return Response({'message': 'An error occurred while deleting product'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        category='Sample Category',
        countInStock=0,
        rating=0,
        numReviews=0,
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    image = request.FILES.get('image')
    
    product = Product.objects.get(id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.countInStock = data['countInStock']
    product.description = data['description']
    if image:
        product.image = image
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    alreadyExists = Review.objects.filter(product=product, user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name + ' ' + user.last_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        product.numReviews = Review.objects.filter(product=product).count()

        reviews = Review.objects.filter(product=product)
        total_rating = sum(review.rating for review in reviews)
        product.rating = total_rating / product.numReviews if product.numReviews > 0 else 0

        product.save()

        return Response('Review Added')
    
@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-numReviews','-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)