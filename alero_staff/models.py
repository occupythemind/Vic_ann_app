from django.db import models
from uuid import uuid4
from django.contrib.auth import get_user_model

class Announcement(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=200*100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

