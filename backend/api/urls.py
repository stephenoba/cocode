from django.urls import path, include

from  backend.api.views import ping

urlpatterns = [
    path('ping/', ping )
]