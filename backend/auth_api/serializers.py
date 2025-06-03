# auth_api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'profile_picture', 'bio']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile
        
        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.save()
        
        # Update profile fields
        if profile_data:
            profile.profile_picture = profile_data.get('profile_picture', profile.profile_picture)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.save()
        
        return instance

