from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from chatapp.models import Conversation, Messages

User = get_user_model()


# Create your views here.

@login_required(login_url='/signin')
def home(request):
    user_id = request.user.id
    contacts = User.objects.get_query(user_id)
    context = {'name': request.user.name, 'contacts': contacts}
    # msg = {}
    # for convo in Conversation.objects.all():
    #     for message in Messages.objects.filter(conversation=convo):
    #         me
    return render(request, 'chatapp/index.html', context=context, status=status.HTTP_200_OK)


class FetchMessages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_one_name: str, user_two_name: str):
        user1 = User.objects.get(username=user_one_name)
        user2 = User.objects.get(username=user_two_name)
        convo = Conversation.objects.filter(users=user1).filter(users=user2)
        messages = Messages.objects.filter(conversation=convo)
        msgs = {"data": []}
        for msg in messages:
            msgs["data"].append({
                "sender": msg.user.name,
                "content": msg.content,
                "timestamp": msg.timestamp
            })
        return JsonResponse(msgs)
