from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from chatapp.models import Messages, Conversation
from chatapp.utils import get_chat_room

User = get_user_model()


# Create your views here.

@login_required(login_url='/signin')
def home(request):
    user_id = request.user.id
    contacts = User.objects.get_query(user_id)
    contact_list = list()
    for contact in contacts:
        message = Messages.objects.filter(conversation=get_chat_room(request.user, contact)).last()
        
        contact_list.append({
            "contact_name": contact.name,
            "room_id": get_chat_room(request.user, contact).room_name,
        })
        if message:
            contact_list[-1]["last_message"] = message.content
        else:
             contact_list[-1]["last_message"] = 'empty chat'
    context = {'contacts': contact_list}
    return render(request, 'chatapp/index.html', context=context, status=status.HTTP_200_OK)


class FetchMessages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id: str):
        convo = Conversation.objects.get(room_name=room_id)
        messages = Messages.objects.filter(conversation=convo)
        if messages is None:
            return JsonResponse({'error': 'No messages found'}, status=status.HTTP_404_NOT_FOUND)
        msgs = {"data": []}
        for msg in messages:
            msgs["data"].append({
                "sender": msg.user.username,
                "content": msg.content,
                "timestamp": msg.timestamp
            })
        return JsonResponse(msgs)
