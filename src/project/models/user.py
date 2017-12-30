from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import BooleanField


class User(AbstractUser):
    is_developer = BooleanField(default=False)

    class Meta(AbstractUser.Meta):
        pass