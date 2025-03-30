from django.urls import path
from .views import AvaliacaoCreateView, AvaliacaoListView

urlpatterns = [
    path('criar/', AvaliacaoCreateView.as_view(), name='avaliacao-criar'),
    path('consultar/', AvaliacaoListView.as_view(), name='avaliacao-consultar'),
]