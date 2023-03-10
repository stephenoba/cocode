import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class CodeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        file_name = self.scope["url_route"]["kwargs"]["file_name"]
        space_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_name = f"{space_name}{file_name}"
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json["content"]
        _type = text_data_json["type"]
        user_id = text_data_json['user_id']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": _type, "user_id": user_id, "message": message}
        )

    # Receive message from room group
    async def content_change(self, event):
        message = event["message"]
        user_id = event["user_id"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "user_id": user_id}))