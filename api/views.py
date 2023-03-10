from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.db.models import Q

from space.models import Space, Member

from .serializers import SpaceSerializer


@api_view(['POST'])
def join_space(request):
    if request.method == 'POST':
        space_qs = Space.objects.filter(code=request.data.get("code"))
        if space_qs:
            space = space_qs[0]
            if space.owner != request.user and request.user not in space.members.all():
                member, _ = Member.objects.get_or_create(user=request.user, scope=Member.ScopeType.VIEWER)
                space.members.add(member)
            data = SpaceSerializer(space).data
            return Response(data=data, status=200)
        return Response({"error": "Not found"}, status=404)

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
        print(user)
        queryset = queryset.filter(Q(members__user=user) | Q(owner=user))
        return queryset
    
    def perform_create(self, serializer):
        serializer.save()