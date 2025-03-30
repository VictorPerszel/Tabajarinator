from rest_framework import generics
from .models import Avaliacao
from .serializers import AvaliacaoSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class AvaliacaoCreateView(generics.CreateAPIView):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(corneta=self.request.user, avaliado_id=self.request.data.get('avaliado'))

class AvaliacaoListView(generics.ListAPIView):
    serializer_class = AvaliacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Avaliacao.objects.filter(corneta=user)