import datetime
import jwt
from django.contrib.auth import get_user_model, logout
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from chatapp.serializers import UserSerializer

User = get_user_model()


# Create your views here.

class RegisterView(APIView):
    # authentication_classes = [SessionAuthentication]

    # def get(self, request):
    #     return render(request, 'chatapp/signup.html')

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'Error': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request):
        # email = request.data["email"]
        username = request.data["username"]
        password = request.data["password"]
        user = User.objects.filter(username=username).first()
        try:
            if user is None:
                raise AuthenticationFailed('User not Found!')
            elif not user.check_password(password):
                raise AuthenticationFailed('Incorrect password!')
            else:
                payload = {
                    'id': user.id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),  # Expiring 60 minutes later
                    'iat': datetime.datetime.utcnow()
                }

                token = jwt.encode(payload, 'secret', algorithm='HS256')
                successful_response = Response()
                # We don't want the frontend to access the cookie, so, httponly=True
                successful_response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True, max_age=24*60*60)
                successful_response.data = {
                    "jwt": token,
                    'message': "Signup successful",
                    "user": {**request.data, 'name': user.name}
                }
                successful_response.status_code = status.HTTP_201_CREATED
                return successful_response
        except Exception as e:
            print(e)
            return Response({'message': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def checkLoginView(request):
    # Get the JWT token from the request cookie
    token = request.COOKIES.get('jwt')
    stat = status.HTTP_200_OK if token else status.HTTP_401_UNAUTHORIZED
    return Response({'isLoggedIn': bool(token)}, status=stat)


@api_view(['GET'])
def logOutView(request):
    # logout(request)
    response = Response({})
    response.delete_cookie(key='jwt', samesite='None')
    response.status_code = status.HTTP_200_OK
    return response


class ForgotPasswordView(APIView):
    pass
