from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Returns a user's profiles
    """
    class Meta:
        model = UserProfile
        fields = '__all__'
