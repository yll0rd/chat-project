from django.urls import re_path

from chatapp.consumer import ChatConsumer

websocket_urlpatterns = [
    re_path(r'(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
]
