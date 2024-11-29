from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator


@method_decorator(csrf_protect, name='dispatch')  ## making it csrf protected
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, ) ## overwrite the default permissions for views

    def post(self, request, format=None):

        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password) ## Create user account

                        user = User.objects.get(id=user.id)  # get the user

                        # UserProfile.objects.create(user=user, first_name='', last_name='', age='', height='', weight='') # Create an empty user profile for the registered user
                        UserProfile.objects.create(user=user,
                                                   first_name='',
                                                   last_name='',
                                                   age='',
                                                   height='',
                                                   weight='',
                                                   sleep_hours='',
                                                   calories_intake='',
                                                   exercise_duration='',
                                                   water_intake=''
                                                   )  # Create an empty user profile for the registered user
                        
                        return Response({'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except Exception as e:
            return Response({'error': f'Something went wrong when registering account: {str(e)}'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):  # Sets a csrf token for the frontend
    permission_classes = (permissions.AllowAny, ) ## overwrite the default permissions for views

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})

# @method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'Fail'})
        except Exception as e:
            return Response({'error': f'Something went wrong when checking authentication status: {str(e)}'})
        
@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)  # User logging in is not expected to be already authenticated
    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            # check if the user is authenticated
            user = auth.authenticate(username=username, password=password)

            if user is not None:  # If the user is authenticated
                auth.login(request, user)  # Login the user
                return Response({'success': f'{username} logged in successfully'})
            else:
                return Response({'error': f'Error Authenticating {username}'})
        except Exception as e:
            return Response({'error': f'Something went wrong when logging in: {str(e)}'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            user = self.request.user  # returns the user logged in in the current session
            auth.logout(request)
            return Response({'success': f'{user} logged out successfully'})
        except Exception as e:
            return Response({'error': f'Something went wrong when logging out: {str(e)}'})
        

class DeleteAccountView(APIView):  # View to delete an user account
    def delete(self, request, format=None):
        user = self.request.user  # get the user currently logged in

        try:
            User.objects.filter(id=user.id).delete()  # delete the user
            return Response({'success': f'{user}\'s  account deleted successfully'})
        except Exception as e:
            return Response({'error': f'Something went wrong when deleting user: {str(e)}'})
        

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            users = User.objects.all()
            users = UserSerializer(users, many=True)
            return Response(users.data)
        except Exception as e:
            return Response({'error': f'Something went wrong when getting users: {str(e)}'})