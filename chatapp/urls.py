from django.contrib import admin
from django.urls import path
from chatapp.views.user_views import *

app_name = "chatapp"
urlpatterns = [
    path('', home, name='home'),
    path('signin/', LoginView.as_view(), name='login'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('signout/', logOutView, name='sign-out'),
]
