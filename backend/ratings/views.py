from .models import Rating
from .serializers import RatingSerializer, UserRatingSerializer, UserSerializer
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class RatingCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Get the rated user from the request data
        rated_user = User.objects.get(id=self.request.data.get('rated'))
        
        # Create or update the rating
        Rating.objects.update_or_create(
            rater=self.request.user,
            rated=rated_user,
            defaults=serializer.validated_data
        )

class UserRatingView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserRatingSerializer

    def get(self, request):
        user = self.request.user
        ratings = Rating.objects.filter(rater=user)
        serializer = UserRatingSerializer(ratings, many=True)
        return Response(serializer.data)
    
class UserRatingAllView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)

    def get_serializer_context(self):
        return {'request': self.request}