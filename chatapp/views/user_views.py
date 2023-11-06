from django.contrib.auth import get_user_model, authenticate, login, logout
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()


# Create your views here.

class RegisterView(APIView):
    def get(self, request):
        return render(request, 'chatapp/signup.html')

    def post(self, request):
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
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if not user:
            error = {'error': 'User does not exist OR Wrong credentials'}
            return render(request, 'chatapp/login.html', context=error, status=status.HTTP_404_NOT_FOUND)
        else:
            login(request, user)
            return redirect('chatapp:home')


def logOutView(request):
    logout(request)
    return render(request, 'chatapp/login.html', status=status.HTTP_200_OK)
