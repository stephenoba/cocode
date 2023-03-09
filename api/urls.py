from django.urls import path, include
from rest_framework import routers

from  .views import ping, AuthTokenView
from .views import SpaceViewSet

router = routers.DefaultRouter()
router.register(r'spaces', SpaceViewSet)

urlpatterns = [
    path('ping/', ping ),
    path('token/', AuthTokenView.as_view(), name='login'),
    path('', include(router.urls)),
]