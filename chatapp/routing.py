from django.urls import path

from chatapp.consumer import ChatConsumer

websocket_urlpatterns = [
    path('', ChatConsumer.as_asgi()),
]