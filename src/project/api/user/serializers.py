from django.contrib.auth import authenticate
from project.models.user import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message='not_unique')],
        error_messages={
            'blank': 'required',
            'invalid': 'invalid'
        }
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all(), message='not_unique')],
        max_length=32,
        error_messages={
            'blank': 'required',
            'max_length': 'too_long'
        }

    )
    password = serializers.CharField(min_length=1,
                                     write_only=True,
                                     error_messages={
                                         'blank': 'required',
                                         'min_length': 'too_short'}
                                     )

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

