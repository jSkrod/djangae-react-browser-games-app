from django.conf.urls import url, include
from project.api.user.api import UserCreate, UserActivate, UserObtainAuthToken, UserChangeEmail, UserChangePassword

urlpatterns = [
    url(r'^register', UserCreate.as_view(), name='account-create'),
    url(r'^login', UserObtainAuthToken.as_view()),
    url(r'^activate/(?P<activation_key>[-:\w]+)/', UserActivate.as_view()),
    url(r'^change_email', UserChangeEmail.as_view()),
    url(r'^change_password', UserChangePassword.as_view()),
    url(r'^game/', include('project.api.user.game.urls'))
]