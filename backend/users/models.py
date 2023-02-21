from django.contrib.auth.models import AbstractUser
from django.db.models import CharField


class User(AbstractUser):
    """
    Default custom user model for Sample Project.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    #: First and last name do not cover name patterns around the globe
    name = CharField("Name of User", blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
