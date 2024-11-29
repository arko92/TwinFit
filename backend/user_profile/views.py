from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from .models import UserProfile

class GetUserProfileView(APIView):
    """
    Returns a user profiles
    """
    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            user_profile = UserProfile.objects.get(user=user)

            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username) })
        except Exception as e:
            return Response({'error': f'Something went wrong when getting user profile: {str(e)}'})


class UpdateUserProfileView(APIView):
    """
    Updates a user profile
    """
    def put(self, request, format=None):
        try:
            user = self.request.user  # Get currently logged in user
            username = user.username  # get the username
            data = self.request.data  # get the update data
            first_name = data['first_name']
            last_name = data['last_name']
            age = data['age']
            height = data['height']
            weight = data['weight']
            sleep_hours = data['sleep_hours']
            calories_intake = data['calories_intake']
            exercise_duration = data['exercise_duration']
            water_intake = data['water_intake']
            
            UserProfile.objects.filter(user=user).update(  # update the profile
                first_name=first_name,
                last_name=last_name,
                age=age,
                height=height,
                weight=weight,
                sleep_hours=sleep_hours,
                calories_intake=calories_intake,
                exercise_duration=exercise_duration,
                water_intake=water_intake
            )

            user_profile = UserProfile.objects.get(user=user)   # get the user profile
            user_profile = UserProfileSerializer(user_profile)  # get the updated profile data

            return Response({'profile': user_profile.data, 'username': str(username)})  # return the updated profile
        except Exception as e:
            return Response({'error': f'Something went wrong when updating user profile: {str(e)}'})