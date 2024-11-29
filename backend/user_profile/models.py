from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    age = models.CharField(max_length=20, default='')
    height = models.CharField(max_length=20, default='')
    weight = models.CharField(max_length=20, default='')

    ### User daily metrics fields
    sleep_hours = models.CharField(max_length=20, default='')
    calories_intake = models.CharField(max_length=20, default='')
    exercise_duration = models.CharField(max_length=20, default='')  # in hours
    water_intake = models.CharField(max_length=20, default='')   # in litres

    def __str__(self):
        return self.first_name
