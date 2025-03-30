from rest_framework import serializers
from .models import Avaliacao
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name']

class AvaliacaoSerializer(serializers.ModelSerializer):
    corneta = UserSerializer(read_only=True)    
    avaliado = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Avaliacao
        fields = ['id', 'corneta', 'avaliado', 'nota_geral']    

class UserAvaliacaoSerializer(serializers.ModelSerializer):
    id_avaliado = serializers.CharField(source='avaliado.id')
    nome_avaliado = serializers.CharField(source='avaliado.first_name')
    
    class Meta:
        model = Avaliacao
        fields = ['id_avaliado', 'nome_avaliado', 'nota_geral']