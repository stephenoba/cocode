from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.db.models import Q

from space.models import Space

from .serializers import SpaceSerializer


@api_view(['GET', 'POST'])
def ping(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})

class AuthTokenView(ObtainAuthToken):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': user.id})
    

class SpaceViewSet(viewsets.ModelViewSet):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        queryset.filter(Q(members__user=user))
        return queryset
    
    def perform_create(self, serializer):
        serializer.save()