from project.models.Ranking import Ranking, Score
from project.models.game import Game
from registration.forms import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class RankingSerializer(serializers.ModelSerializer):
    game = serializers.SlugRelatedField(queryset=Game.objects.all(), allow_null=False, slug_field='game_name',
                                              validators=[UniqueValidator(queryset=Ranking.objects.all())])
    type = serializers.IntegerField(default=1)

    def create(self, validated_data):
        ranking = Ranking.objects.create_ranking(game=validated_data['game'],
                                                 type=validated_data['type'])
        return ranking

    class Meta:
        model = Ranking
        fields = ('game', 'type')


class ScoreSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), allow_null=False, slug_field='username')
    ranking = serializers.PrimaryKeyRelatedField(queryset=Ranking.objects.all(), allow_null=False)
    game_name = serializers.SlugRelatedField(read_only=True, source='ranking.game', slug_field='game_name')
    value = serializers.IntegerField()

    def create(self, validated_data):
        # score, exists = Score.objects
        score = Score.objects.create_score(user=validated_data['user'],
                                           ranking=validated_data['ranking'],
                                           value=validated_data['value'])

        return score

    class Meta:
        model = Score
        fields = ('user', 'ranking', 'value', 'game_name')
