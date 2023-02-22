from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    """
    Default custom user model
    """
    #: First and last name do not cover name patterns around the globe
    name = models.CharField("Name of User", blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore


class Profile(models.Model):
    """
    Extra information about user
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    prog_lang = models.CharField("Programming Language", blank=True, null=True, max_length=20)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()