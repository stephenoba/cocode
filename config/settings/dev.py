from .base import *  # noqa                                                 
from .base import env

DEBUG = True

# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default='django-insecure-(x7then57v7nz##*f7m*0=+jpaba($0u+3^k&(co9i%ys%)n+@'
)