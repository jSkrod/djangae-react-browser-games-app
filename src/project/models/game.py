from django.db import models

from project.models.user import User
from project.utils.urls import change_game_hostname

GAME_STATUSES = {
    "NOT_CREATED": 1,
    "CREATED": 2,
    "ERROR": 3,
    "UPDATING" : 5
}


class GameBaseManager(models.Manager):
    def create_game(self, name, zip, user, image, description, title):
        game = self.create(game_name=name, game_main_zip=zip, user=user, image=image, description=description, title=title)

        return game


class GameManager(GameBaseManager):
    def get_queryset(self):
        return super(GameManager, self).get_queryset().filter(is_deleted=False)


class Game(models.Model):
    game_name = models.CharField(max_length=20)
    game_main_zip = models.FileField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL)
    title = models.CharField(max_length=20)
    description = models.TextField()
    image = models.ImageField(upload_to='/game_images/')
    is_deleted = models.BooleanField(default=False)

    status = models.IntegerField(default=GAME_STATUSES["NOT_CREATED"])

    objects = GameManager()
    all_object = GameBaseManager()

    sum_of_ratings = models.IntegerField(default=0)
    ratings_count = models.IntegerField(default=0)

    @property
    def get_url(self):
        return change_game_hostname(self.game_name)

    @property
    def get_rating(self):
        if self.ratings_count == 0 or self.ratings_count is None or self.sum_of_ratings is None:
            return -1

        return self.sum_of_ratings / self.ratings_count

    def add_rating(self, value):
        if self.sum_of_ratings is None:
            self.sum_of_ratings = 0
        self.sum_of_ratings += value

        if self.ratings_count is None:
            self.ratings_count = 0
        self.ratings_count += 1
        self.save()


class GameFile(models.Model):
    game = models.ForeignKey(Game, on_delete=models.SET_NULL)
    path = models.CharField(max_length=250)
    gcs_path = models.CharField(max_length=300)
