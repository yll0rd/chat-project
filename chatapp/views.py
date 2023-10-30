from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from chatapp.models import ChatUsers

User = get_user_model()


# Create your views here.
@login_required(login_url='/signin')
def home(request):
    print(request.user)
    context = {'name': request.user.name}
    return render(request, 'chatapp/index.html', context=context)


class RegisterView(APIView):
    def get(self, request):
        return render(request, 'chatapp/signup.html')

    def post(self, request, format=None):
        print(request.POST)
        first_name = request.POST['F_name']
        second_name = request.POST['S_name']
        name = f"{first_name.capitalize()} {second_name.capitalize()}"
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']

        # if not username or not password or not email:
        #     return Response({'error': 'Please provide all required fields'})
        try:
            user = User.objects.create_user(username=username, name=name, password=password, email=email)
        except Exception as e:
            return Response({'error': str(e)})
        if user:
            print(user.username)
            return redirect('chatapp:login')
        return redirect('chatapp:signup')


class LoginView(APIView):

    def get(self, request):
        return render(request, 'chatapp/login.html')

    def post(self, request):
        # email = request.POST["email"]
        print(request.POST)
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if not user:
            return JsonResponse({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            login(request, user)
            return redirect('chatapp:home')
