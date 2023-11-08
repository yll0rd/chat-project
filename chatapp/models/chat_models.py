from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Conversation(models.Model):
    first_user = models.ForeignKey(User, models.CASCADE, null=True, blank=True,
                                   related_name='room_first_person')
    second_user = models.ForeignKey(User, models.CASCADE, null=True, blank=True,
                                    related_name='room_second_person')


class Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
