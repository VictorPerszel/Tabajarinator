from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(APIView):
    """
    View para registro de novos usuários.
    """
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        # Extrair dados da requisição
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        profile_image = request.FILES.get('profile_image')

        # Validar dados
        if not username or not password:
            return Response(
                {'error': 'Todos os campos são obrigatórios'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar se o usuário já existe
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Nome de usuário já existe'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Criar o usuário
        user = User.objects.create_user(username=username, password=password, first_name=first_name)
        
        # Atualizar a foto de perfil se fornecida
        if profile_image:
            user.profile.profile_picture = profile_image
            user.profile.save()

        # Retornar resposta de sucesso
        return Response(
            {'message': 'Usuário registrado com sucesso'},
            status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    """
    View para autenticação de usuários.
    """
    def post(self, request):
        # Extrair dados da requisição
        username = request.data.get('username')
        password = request.data.get('password')

        # Autenticar o usuário
        user = authenticate(username=username, password=password)

        if user:
            # Gerar ou recuperar o token do usuário
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {'token': token.key},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Credenciais inválidas'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()