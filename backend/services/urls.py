from django.urls import path
from .views import GetHealthAdviceView

urlpatterns = [
    path('health-advice', GetHealthAdviceView.as_view())
]
