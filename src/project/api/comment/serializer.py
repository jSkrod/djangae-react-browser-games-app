from django.core.validators import MinValueValidator, MaxValueValidator
from project.models.comment import Comment
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    text = serializers.CharField(
        max_length=250,
        min_length=1,
        error_messages={
            'blank': 'required',
            'max_length': 'too_long',
            'min_length': 'too_short'
        }
    )

    rating = serializers.IntegerField(
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ],
        error_messages={
            'blank': 'required'
        }
    )

    user = serializers.PrimaryKeyRelatedField(read_only=True, source='user.username')

    game = serializers.PrimaryKeyRelatedField(read_only=True,  source='game.game_name')

    def create(self, validated_data):
        comment = Comment.objects.create_comment(text=validated_data['text'],
                                                 user=self.context['user'],
                                                 game=self.context['game'],
                                                 rating=validated_data['rating'])

        self.context['game'].add_rating(validated_data['rating'])

        return comment

    class Meta:
        model = Comment
        fields = ('text', 'game', 'user', 'rating')
