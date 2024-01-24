import os

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from chatapp.models import Messages, Conversation
from chatapp.utils import get_chat_room, customised_sort, get_user_from_request, strip_time_stamp

User = get_user_model()


# Create your views here

@api_view(['GET'])
def contactsView(request):

    # Registering an admin user
    if os.getenv('ON_PRODUCTION') == 'True':
        try:
            admin_user = User.objects.get(username='yll-admin')
        except User.DoesNotExist:
            admin_user = User.objects.create_superuser(
                username='yll-admin',
                password='azerty@#123',
                email='admin@email.com'
            )
        print(admin_user.username)

    # Get the user ID
    request, _ = get_user_from_request(request)

    # Get the contacts for the user
    contacts = User.objects.get_query(request.user.id)
    users_with_timestamps = []
    for user in contacts:
        user_messages = Messages.objects.filter(conversation=get_chat_room(request.user, user))
        l_m = user_messages.order_by('-timestamp').first()
        timestamp = l_m.timestamp if l_m else None
        users_with_timestamps.append((user, timestamp))
    # Sort users based on the latest message timestamp
    contacts = customised_sort(users_with_timestamps)

    contact_list = list()
    for contact in contacts:
        last_message = Messages.objects.filter(conversation=get_chat_room(request.user, contact[0])).last()
        contact_list.append({
            "username": contact[0].username,
            "contact_name": contact[0].name,
            "room_id": get_chat_room(request.user, contact[0]).room_name,
        })
        if last_message:
            contact_list[-1]["last_message"] = last_message.content
            contact_list[-1]["timestamp"] = strip_time_stamp(contact[1])
        else:
            contact_list[-1]["last_message"] = 'empty chat'
            contact_list[-1]["timestamp"] = ''

    return Response(contact_list, status=status.HTTP_200_OK)


class FetchMessages(APIView):
    def get(self, request, room_id: str):
        request, _ = get_user_from_request(request)
        # Get the conversation with the given room ID
        convo = Conversation.objects.get(room_name=room_id)

        # Get all the messages in the conversation
        messages = Messages.objects.filter(conversation=convo)

        # Check if there are no messages
        if messages is None:
            return JsonResponse({'error': 'No messages found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a dictionary to store the messages
        msgs = {"data": []}

        # Iterate over each message
        for msg in messages:
            # Add the message details to the dictionary
            msgs["data"].append({
                "sender": msg.user.username,
                "content": msg.content,
                "timestamp": msg.timestamp
            })

        # Return the messages as a JSON response
        return Response(msgs)
