import mimetypes

import logging
from django.contrib.auth import get_user_model
from django.http import StreamingHttpResponse
from django.core.servers.basehttp import FileWrapper
from rest_framework.permissions import IsAuthenticated

from project.api.user.game.serializer import GameSerializer
from rest_framework import views, status
from rest_framework.response import Response

from project.models.game import Game, GameFile, GAME_STATUSES
from utils.models import get_or_none
import cloudstorage as gcs


class GameInfo(views.APIView):
    permission_classes = ()

    def get(self, request, game_name):
        game = get_or_none(Game, game_name=game_name)
        if game is None:
            return Response("No game with that name.", status=status.HTTP_404_NOT_FOUND)

        serializer = GameSerializer(game, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServeGameFile(views.APIView):
    permission_classes = ()

    def get(self, request, game_name, path):
        game = get_or_none(Game, game_name=game_name)
        if game is None:
            return Response("1", status=status.HTTP_404_NOT_FOUND)

        file_entry = get_or_none(GameFile, game=game, path=path.lower())
        if file_entry is None:
            return Response("2 %s" % path, status=status.HTTP_404_NOT_FOUND)

        chunk_size = 8192

        response = StreamingHttpResponse(FileWrapper(gcs.open(file_entry.gcs_path, 'r'), chunk_size),
                                         content_type=mimetypes.guess_type(path)[0])

        response['Content-Length'] = gcs.stat(file_entry.gcs_path).st_size
        return response

class GetGames(views.APIView):
    permission_classes = ()

    def get(self, request):
        games = Game.objects.filter(status=GAME_STATUSES["CREATED"])
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveGame(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, game_name):
        game = get_or_none(Game, game_name=game_name)
        if game is not None and game.user == request.user:
            game.is_deleted = True
            game.save()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_403_FORBIDDEN)


class GetGamesByUser(views.APIView):
    permission_classes = ()

    def get(self, request, username):
        user = self.get_user(username)
        if user is not None:
            games = Game.objects.filter(user=user.id)
            serializer = GameSerializer(games, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)

    def get_user(self, username):
        User = get_user_model()
        lookup_kwargs = {
            User.USERNAME_FIELD: username,
            'is_developer': True
        }
        try:
            user = User.objects.get(**lookup_kwargs)
            return user
        except User.DoesNotExist:
            return None
