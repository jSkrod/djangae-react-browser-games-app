from django.db import models
from project.models.game import Game

from project.models.user import User


# MIN - score is better if it is lower than previous
# MAX - score is better if it is higher than previous
RANKING_TYPE = {
    "MAX": 2,
    "MIN": 1,
}


class RankingManager(models.Manager):
    def create_ranking(self, game, type=RANKING_TYPE["MAX"]):
        game = self.create(game=game, type=type)

        return game


class Ranking(models.Model):
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=False)
    type = models.IntegerField(default=RANKING_TYPE["MAX"])

    objects = RankingManager()


class ScoreManager(models.Manager):
    def create_score(self, ranking, user, value):
        # score = self.create(ranking=ranking, user=user, value=value)

        score, created = self.update_or_create(ranking=ranking, user=user, defaults={'value': value})

        return score


class Score(models.Model):
    ranking = models.ForeignKey(Ranking, on_delete=models.SET_NULL, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    value = models.IntegerField()

    objects = ScoreManager()