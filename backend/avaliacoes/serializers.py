from rest_framework import serializers
from .models import Avaliacao
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name']
        # Exclua campos sensíveis como 'password'


class AvaliacaoSerializer(serializers.ModelSerializer):
    corneta = UserSerializer(read_only=True)    
    avaliado = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Avaliacao
        fields = ['id', 'corneta', 'avaliado', 'nota_geral']    