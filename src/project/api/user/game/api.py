from google.appengine.api.blobstore import blobstore
from google.appengine.api.taskqueue import taskqueue
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from project.api.user.game.serializer import GameSerializer
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status

from project.models.Ranking import Ranking, RANKING_TYPE
from project.models.game import Game, GAME_STATUSES


class AddGame(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = GameSerializer(data=request.data, context={'user': request.user})

        if serializer.is_valid():
            game_model = serializer.save()
            Ranking.objects.create_ranking(game=game_model, type=RANKING_TYPE['MAX'])
            taskqueue.add(url='/api/user/game/unpack_game', target='unpack-game', queue_name='unpack-game', params={'gameId': game_model.id})
            return Response("OK", status=status.HTTP_201_CREATED, content_type='application/json')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type='application/json')


class ReuploadGame(UpdateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'game_name'

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response("wrong_user", status=status.HTTP_403_FORBIDDEN)

        if instance.status != GAME_STATUSES['CREATED'] and instance.status != GAME_STATUSES['ERROR']:
            return Response("is_unpacking", status=status.HTTP_403_FORBIDDEN)

        after_update = self.partial_update(request, *args, **kwargs)

        if request.data.get('file') is not None:
            taskqueue.add(url='/api/user/game/unpack_game', target='unpack-game', queue_name='unpack-game', params={'gameId': instance.id})

        return after_update


class UnpackGame(views.APIView):
    permission_classes = ()


class GetUploadURL(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        url = {
            'url': blobstore.create_upload_url('/api/user/game/add')
        }

        return Response(url, status=status.HTTP_200_OK)


class ReuploadGetUploadURL(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        url = {
            'url': blobstore.create_upload_url('/api/user/game/reupload/%s' % request.data.get('gameName'))
        }

        return Response(url, status=status.HTTP_200_OK)