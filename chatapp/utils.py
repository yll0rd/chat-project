"""Useful functions"""
from chatapp.models import Conversation


def get_chat_room(user1, user2):
    for chat_room in Conversation.objects.all():
        if user1 in chat_room.users.all() and user2 in chat_room.users.all():
            return chat_room
    return None
