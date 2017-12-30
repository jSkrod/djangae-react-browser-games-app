from django.core.exceptions import ObjectDoesNotExist
from project.api.rankings.serializer import RankingSerializer, ScoreSerializer
from project.models.Ranking import Ranking, Score, RANKING_TYPE
from project.models.game import Game
from project.models.user import User
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.models import get_or_none


#
class AddRanking(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = RankingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("OK", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# args = 'game_name', 'user', 'value'
class AddScore(views.APIView):
    permission_classes = ()

    def post(self, request):
        game = get_or_none(Game, game_name=request.data['game_name'])
        if game is None:
            return Response("game_name doesn't exist", status=status.HTTP_400_BAD_REQUEST)

        ranking = get_or_none(Ranking, game=game)

        if ranking is not None:
            username = request.POST.get('user')
            value = request.POST.get('value')

            if username is None or value is None:
                return Response("user and value must not be empty", status=status.HTTP_400_BAD_REQUEST)

            serializer = ScoreSerializer(data={'ranking': ranking.pk, 'user': username, 'value': value})

            if serializer.is_valid():
                serializer.save()
                return Response("OK", status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response("ranking doesn't exist", status=status.HTTP_400_BAD_REQUEST)


# args = 'game_name'
class GetScoresGame(views.APIView):
    permission_classes = ()

    def post(self, request):
        game = get_or_none(Game, game_name=request.data['game_name'])
        if game is None:
            return Response("game_name doesn't exist", status=status.HTTP_400_BAD_REQUEST)

        ranking = get_or_none(Ranking, game=game)

        if ranking is not None:
            # sorting values by ranking type
            ordering = 'value' if ranking.type == RANKING_TYPE['MAX'] else '-value'

            scores = Score.objects.all().filter(ranking=ranking.pk).order_by(ordering)

            serializer = ScoreSerializer(scores, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response("game_name", status=status.HTTP_400_BAD_REQUEST)


# returns all scores for user, requires username
class GetScoresUser(views.APIView):
    permission_classes = ()

    def post(self, request):
        user = get_or_none(User, username=request.POST.get('user'))
        if user is not None:
            scores = Score.objects.all().filter(user=user)

            serializer = ScoreSerializer(scores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("username doesn't exsits", status=status.HTTP_400_BAD_REQUEST)