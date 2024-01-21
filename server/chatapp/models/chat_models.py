from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Conversation(models.Model):
    room_name = models.CharField(max_length=200, unique=True)
    # users = models.ForeignKey(User, on)
    users = models.ManyToManyField(User)

    def __str__(self):
        room_users = ''
        for user in self.users.all():
            room_users += '-' + str(user)
        return f"{room_users[1:]}"

    class Meta:
        verbose_name = 'Conversation'
        verbose_name_plural = 'Conversations'


class Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.conversation}: {self.content}'

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
