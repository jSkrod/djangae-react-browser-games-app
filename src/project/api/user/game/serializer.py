from django.core.validators import RegexValidator
from project.models.game import Game
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class NameValidator(RegexValidator):
    regex = r'[a-z]+'
    message = 'Invalid title. Only small alphabetic characters allowed'


class GameSerializer(serializers.ModelSerializer):
    game_url = serializers.ReadOnlyField(source='get_url')
    rating = serializers.ReadOnlyField(source='get_rating')

    game_name = serializers.CharField(
        validators=[UniqueValidator(queryset=Game.all_object.all(), message='not_unique'),
                    RegexValidator(regex=r'^[a-z]+$',
                                   message='only_lower_case',
                                   code='invalid_game_name')],
        max_length=32,
        min_length=4,
        error_messages={
            'invalid': 'invalid',
            'blank': 'required',
            'max_length': 'too_long',
            'min_length': 'too_short'
        }
    )

    file = serializers.FileField(allow_empty_file=False, source='game_main_zip', error_messages={
        'required': 'required',
        'invalid': 'invalid',
        'no_name': 'no_name',
        'empty': 'empty',
        'max_length': 'too_big',
    })

    image = serializers.ImageField(allow_empty_file=False, error_messages={
        'required': 'required',
        'invalid': 'invalid',
        'no_name': 'no_name',
        'empty': 'empty',
        'max_length': 'too_big',
        'invalid_image': "invalid_image"
    })

    title = serializers.CharField(
        validators=[UniqueValidator(queryset=Game.all_object.all(), message='not_unique')],
        max_length=32,
        error_messages={
            'blank': 'required',
            'max_length': 'too_long'
        }

    )

    description = serializers.CharField(allow_blank=True)

    user = serializers.PrimaryKeyRelatedField(read_only=True, source='user.username')

    def create(self, validated_data):
        game = Game.objects.create_game(name=validated_data['game_name'], zip=validated_data['game_main_zip'],
                                        title=validated_data['title'],
                                        user=self.context['user'], image=validated_data['image'],
                                        description=validated_data['description'])
        return game

    class Meta:
        model = Game
        fields = ('game_name', 'file', 'user', 'image', 'title', 'description', 'game_url', 'rating')

