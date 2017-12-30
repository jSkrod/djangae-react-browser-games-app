from django.core.validators import MaxValueValidator, MinValueValidator
from project.models.game import Game
from project.models.user import User
from django.db import models


class CommentManager(models.Manager):
    def create_comment(self, text, user, game, rating):
        comment = self.create(text=text, user=user, game=game, rating=rating)

        return comment


class Comment(models.Model):
    text = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=False)
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=False)
    rating = models.IntegerField(validators=[
                                    MaxValueValidator(10),
                                    MinValueValidator(0)
    ])

    objects = CommentManager()
