from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Conversation(models.Model):
    room_name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(User, limit_choices_to=2)

    def __str__(self):
        return self.room_name


class Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
