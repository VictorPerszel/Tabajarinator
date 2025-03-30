from django.urls import path
from .views import AvaliacaoCreateView, UserAvaliacaoTodosView, UserAvaliacaoView

urlpatterns = [
    path('criar/', AvaliacaoCreateView.as_view(), name='avaliacao-criar'),
    path('ja-avaliados/', UserAvaliacaoView.as_view(), name='avaliacao-ja-avaliados'),
    path('jogadores/', UserAvaliacaoTodosView.as_view(), name='avaliacao-todos'),
]