from django.urls import path
from .views import SignupView, GetCSRFToken, CheckAuthenticatedView, LoginView, LogoutView, DeleteAccountView, GetUsersView

urlpatterns = [

    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('get_users', GetUsersView.as_view()),
]
