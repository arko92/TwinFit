
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include("user_account.urls")),
    path("profiles/", include("user_profile.urls")),
    path("services/", include("services.urls")),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
