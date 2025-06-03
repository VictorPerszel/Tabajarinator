from django.urls import path
from .views import RatingCreateView, UserRatingAllView, UserRatingView

urlpatterns = [
    path('create/', RatingCreateView.as_view(), name='rating-create'),
    path('already-rated/', UserRatingView.as_view(), name='rating-already-rated'),
    path('players/', UserRatingAllView.as_view(), name='rating-players'),
]