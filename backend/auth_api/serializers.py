# auth_api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'profile_picture', 'telephone', 'bio']

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
            profile.telephone = profile_data.get('telephone', profile.telephone)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.save()
        
        return instance
    
    def to_internal_value(self, data):
        # Handle nested profile data with dot notation
        internal_value = super().to_internal_value(data)
        
        # Extract profile data from dot notation
        profile_data = {}
        for key, value in data.items():
            if key.startswith('profile.'):
                profile_field = key.split('.', 1)[1]  # Remove 'profile.' prefix
                profile_data[profile_field] = value
        
        if profile_data:
            internal_value['profile'] = profile_data
        
        return internal_value

