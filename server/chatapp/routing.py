from django.urls import re_path

from chatapp.consumer import ChatConsumer, HomeConsumer

websocket_urlpatterns = [
    re_path(r'^/?$', HomeConsumer.as_asgi()),
    re_path(r'(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
]
