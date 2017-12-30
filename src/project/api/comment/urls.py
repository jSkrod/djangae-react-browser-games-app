from django.conf.urls import url
from project.api.comment.api import AddComment, GetComment

urlpatterns = [
    url(r'/add$', AddComment.as_view()),
    url(r'/get$', GetComment.as_view())
]