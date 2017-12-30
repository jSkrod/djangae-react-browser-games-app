from django.conf.urls import url, include
from project.api.rankings.api import AddRanking, AddScore, GetScoresUser, GetScoresGame

urlpatterns = [
    url(r'add_ranking$', AddRanking.as_view()),
    url(r'add_score$', AddScore.as_view()),
    url(r'get_scores_game$', GetScoresGame.as_view()),
    url(r'get_scores_user$', GetScoresUser.as_view())
]