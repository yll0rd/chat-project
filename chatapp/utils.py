"""Useful functions"""
from chatapp.models import Conversation


def get_chat_room(user1, user2):
    """Gets the chat room of the two users passed"""
    for chat_room in Conversation.objects.all():
        if user1 in chat_room.users.all() and user2 in chat_room.users.all():
            return chat_room
    return None


def customised_sort(users_with_timestamps: list):
    """Sorts the list passed in terms of timestamps"""
    new_list = list()
    # Adding users with messages in new list.
    for tu in users_with_timestamps:
        if tu[1]:
            new_list.append(tu)
    # Sorting the new list.
    new_list = sorted(new_list, key=lambda x: x[1], reverse=True)
    # Adding the rest of users without messages
    for tu in users_with_timestamps:
        if tu[1] is None:
            new_list.append(tu)
    return new_list
