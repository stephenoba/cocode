from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/space/(?P<room_name>\w+)/(?P<file_name>[\w,\s-]+\.[A-Za-z]+$)$", consumers.CodeConsumer.as_asgi()),
]