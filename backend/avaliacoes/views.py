from .models import Avaliacao
from .serializers import AvaliacaoSerializer, UserAvaliacaoSerializer, UserSerializer
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class AvaliacaoCreateView(generics.ListCreateAPIView):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        Avaliacao.objects.update_or_create(
            corneta=self.request.user,
            avaliado_id=self.request.data.get('avaliado'),
            defaults=serializer.validated_data
        )

class UserAvaliacaoView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAvaliacaoSerializer

    def get(self, request):
        user = self.request.user
        avaliacoes = Avaliacao.objects.filter(corneta=user)
        serializer = UserAvaliacaoSerializer(avaliacoes, many=True)
        return Response(serializer.data)
    
class UserAvaliacaoTodosView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)

    def get_serializer_context(self):
        return {'request': self.request}