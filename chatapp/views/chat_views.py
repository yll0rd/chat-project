from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from chatapp.models import Messages, Conversation
from chatapp.utils import get_chat_room, customised_sort

User = get_user_model()


# Create your views here.

@login_required(login_url='/signin')
def home(request):
    # Get the user ID
    user_id = request.user.id

    # Get the contacts for the user
    contacts = User.objects.get_query(user_id)
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
            "contact_name": contact[0].name,
            "room_id": get_chat_room(request.user, contact[0]).room_name,
        })
        if last_message:
            contact_list[-1]["last_message"] = last_message.content
            contact_list[-1]["timestamp"] = contact[1]
        else:
            contact_list[-1]["last_message"] = 'empty chat'
            contact_list[-1]["timestamp"] = ''
    context = {'contacts': contact_list}
    return render(request, 'chatapp/index.html', context=context, status=status.HTTP_200_OK)


class FetchMessages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id: str):
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
        return JsonResponse(msgs)
