from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework import status

User = get_user_model()


# Create your views here.

@login_required(login_url='/signin')
def home(request):
    print(request.user)
    contacts = User.objects.get_query(request)
    context = {'name': request.user.name, 'contacts': contacts}
    return render(request, 'chatapp/index.html', context=context, status=status.HTTP_200_OK)
