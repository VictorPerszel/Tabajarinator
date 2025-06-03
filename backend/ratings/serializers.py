from rest_framework import serializers
from .models import Rating
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    overall = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'overall']

    def get_overall(self, obj):
        request_user = self.context['request'].user
        rating = Rating.objects.filter(
            rated=obj, 
            rater=request_user
        ).first()
        return rating.overall if rating else None

class RatingSerializer(serializers.ModelSerializer):
    rater = UserSerializer(read_only=True)    
    rated = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    overall = serializers.FloatField(min_value=1, max_value=5)

    class Meta:
        model = Rating
        fields = ['id', 'rater', 'rated', 'overall']

    def validate_overall(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError('Overall rating must be between 1 and 5')
        return value   

class UserRatingSerializer(serializers.ModelSerializer):
    rated_id = serializers.CharField(source='rated.id')
    rated_name = serializers.CharField(source='rated.first_name')
    
    class Meta:
        model = Rating
        fields = ['id', 'rated_id', 'rated_name', 'overall']