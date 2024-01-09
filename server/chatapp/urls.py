from django.urls import path
from chatapp.views.user_views import LoginView, logOutView, RegisterView, ForgotPasswordView, checkLoginView
from chatapp.views.chat_views import contactsView, FetchMessages

app_name = "chatapp"
urlpatterns = [
    path('contacts/', contactsView, name='home'),
    path('check-login/', checkLoginView, name='check-login'),
    path('signin/', LoginView.as_view(), name='login'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('signout/', logOutView, name='sign-out'),
    path('forgot-pass/', ForgotPasswordView.as_view(), name='sign-out'),

    path('messages/<str:room_id>', FetchMessages.as_view())
]

