from rest_framework import serializers
from .models import Avaliacao
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    nota_geral = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'nota_geral']

    def get_nota_geral(self, obj):
        request_user = self.context['request'].user
        avaliacao = Avaliacao.objects.filter(
            avaliado=obj, 
            corneta=request_user
        ).first()
        return avaliacao.nota_geral if avaliacao else None

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