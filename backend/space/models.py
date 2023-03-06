from django.db import models

from backend.utils import uuid_to_str


class Space(models.Model):
    """
    Space Model"""
    code = models.CharField(max_length=32, default=uuid_to_str(), primary_key=True, db_index=True)
    owner = models.ForeignKey("users.User", related_name="space", on_delete=models.SET_NULL, null=True)
    members = models.ManyToManyField('Member', through='SpaceMember')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.code


class Member(models.Model):
    """
    Members Model"""
    class ScopeType(models.TextChoices):
        VIEWER = 'viewer', 'Viewer'
        EDITOR = 'editor', 'Editor'

    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name='space_member')
    scope = models.CharField(max_length=8, choices=ScopeType.choices, default=ScopeType.VIEWER)
    spaces = models.ManyToManyField('Space', through='SpaceMember')

    @property
    def username(self) -> str:
        """propert for user's username"""
        return self.user.username

    def __str__(self) -> str:
        return f"{self.username} [{self.scope}]"


class SpaceMember(models.Model):
    """
    Through model for Space and Member model"""
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"[{self.space.code}] [{self.member.username}]"