from django.urls import path
from chatapp.views.user_views import *
from chatapp.views.chat_views import *

app_name = "chatapp"
urlpatterns = [
    path('', home, name='home'),
    path('signin/', LoginView.as_view(), name='login'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('signout/', logOutView, name='sign-out'),

    path('messages/<str:room_id>', FetchMessages.as_view())
]
