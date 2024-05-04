from .models import Product, Cart
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serialized_reviews = []
        for review in reviews:
            serialized_review = {
                "id": review.id,
                "name": review.name,
                "rating": review.rating,
                "comment": review.comment,
                "createdAt": review.createdAt,
                "product": review.product_id,
                "user": review.user_id
            }
            serialized_reviews.append(serialized_review)
        return serialized_reviews
    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
class ProductAdminDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name','image', 'countInStock', 'price','id']