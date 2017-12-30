from django.conf.urls import url, include
from project.api.user.game.api import AddGame, GetUploadURL, ReuploadGetUploadURL, ReuploadGame
from project.api.user.game.backend_api import UnpackGame

urlpatterns = [
    url(r'^add', AddGame.as_view()),
    url(r'^reupload/(?P<game_name>[-:\w]+)$', ReuploadGame.as_view()),
    url(r'^get_upload_url', GetUploadURL.as_view()),
    url(r'^reupload_get_upload_url', ReuploadGetUploadURL.as_view()),
    url(r'^unpack_game', UnpackGame.as_view())
]