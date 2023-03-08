from django.urls import path, include

from  backend.api.views import ping, AuthTokenView

urlpatterns = [
    path('ping/', ping ),
    path('token/', AuthTokenView.as_view(), name='login'),
]