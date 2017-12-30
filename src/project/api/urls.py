from django.conf.urls import url, include
from project.game.api import GetGamesByUser, GetGames, RemoveGame

urlpatterns = [
    url(r'^user/', include('project.api.user.urls')),
    url(r'^profile', include('project.api.profile.urls')),
    url(r'^list_games_user/(?P<username>\w+)', GetGamesByUser.as_view(), name='list_games'),
    url(r'^remove_user_game/(?P<game_name>\w+)', RemoveGame.as_view(), name='remove_game'),
    url(r'^list_games', GetGames.as_view()),
    url(r'comment', include('project.api.comment.urls')),
    url(r'ranking/', include('project.api.rankings.urls')),
]