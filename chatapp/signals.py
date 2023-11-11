from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from chatapp.models.chat_models import Conversation

User = get_user_model()


@receiver(post_save, sender=User)
def create_chatroom(sender, instance, created, **kwargs):
    """Automatically creates a chatroom with other users"""
    if created:
        other_users = User.objects.get_query(excluded_user_id=instance.id)
        if other_users is None:
            return
        for user in other_users:
            convo = Conversation.objects.create(room_name=f"{str(instance)}_{str(user)}")
            convo.users.add(instance, user)
