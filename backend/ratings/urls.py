from django.urls import path
from .views import RatingCreateView, UserRatingAllView, UserRatingView, CurrentUserView

urlpatterns = [
    path('create/', RatingCreateView.as_view(), name='rating-create'),
    path('already-rated/', UserRatingView.as_view(), name='rating-already-rated'),
    path('players/', UserRatingAllView.as_view(), name='rating-players'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
]