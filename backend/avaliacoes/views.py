from .models import Avaliacao
from .serializers import AvaliacaoSerializer, UserAvaliacaoSerializer
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class AvaliacaoCreateView(generics.CreateAPIView):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(corneta=self.request.user, avaliado_id=self.request.data.get('avaliado'))

class UserAvaliacaoView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAvaliacaoSerializer

    def get(self, request):
        user = self.request.user
        profiles = Avaliacao.objects.filter(corneta=user)
        serializer = UserAvaliacaoSerializer(profiles, many=True)
        return Response(serializer.data)