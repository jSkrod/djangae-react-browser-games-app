from django.conf.urls import url

from project.game.api import ServeGameFile, GameInfo

urlpatterns = [
    url(r'get_info/(?P<game_name>[a-z]+$)', GameInfo.as_view()),
    url(r'(?P<game_name>[\w\- ]+)/(?P<path>.*$)', ServeGameFile.as_view())
]