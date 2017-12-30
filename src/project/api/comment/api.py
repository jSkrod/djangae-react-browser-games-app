from project.api.comment.serializer import CommentSerializer
from project.models.comment import Comment
from project.models.game import Game
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

class AddComment(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        game_name = request.data.get('game_name')

        if game_name is not None:
            try:
                game = Game.objects.get(game_name=game_name)

                serializer = CommentSerializer(data=request.data, context={'user': user, 'game': game})

                if serializer.is_valid():
                    serializer.save()
                    return Response("OK", status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type='application/json')
            except ObjectDoesNotExist:
                pass
        return Response("game_name not proper", status=status.HTTP_400_BAD_REQUEST)


class GetComment(views.APIView):
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        game_name = request.data.get('game_name')

        if game_name is not None:
            try:
                game = Game.objects.get(game_name=game_name)
                comments = Comment.objects.filter(game=game)
                serializer = CommentSerializer(comments, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                pass

        return Response("game_name not proper", status=status.HTTP_400_BAD_REQUEST)
