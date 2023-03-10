from django.urls import path, include
from rest_framework import routers

from  .views import join_space, AuthTokenView
from .views import SpaceViewSet

router = routers.DefaultRouter()
router.register(r'spaces', SpaceViewSet)

urlpatterns = [
    path('join/', join_space ),
    path('token/', AuthTokenView.as_view(), name='login'),
    path('', include(router.urls)),
]