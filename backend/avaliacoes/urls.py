from django.urls import path
from .views import AvaliacaoCreateView, UserAvaliacaoView

urlpatterns = [
    path('criar/', AvaliacaoCreateView.as_view(), name='avaliacao-criar'),
    path('consultar/', UserAvaliacaoView.as_view(), name='avaliacao-consultar'),
]