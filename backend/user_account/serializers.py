
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, providing fields for 'id' and 'username'.
    Benifit of using this is that it automatically converts the complex data into a list of JSONs
    """
    class Meta:
        model = User
        fields = ('id', 'username')
