from django.contrib.auth import get_user_model
from django.core import signing
from project.api.user.serializers import UserSerializer
from project.api.user.validators import PasswordValidator
from project.models.user import User
from rest_framework import status
from rest_framework import views
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from settings import ACCOUNT_ACTIVATION_DAYS, PASSWORD_MIN_LENGTH


class UserCreate(views.APIView):
    permission_classes = ()

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type='application/json')


class UserObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(UserObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        return Response({'token': token.key, 'is_developer': user.is_developer})


class UserActivate(views.APIView):
    permission_classes = ()

    def get(self, *args, **kwargs):
        username = self.validate_key(kwargs.get('activation_key'))
        if username is not None:
            user = self.get_user(username)
            if user is not None:
                user.is_active = True
                user.save()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def validate_key(self, activation_key):
        try:
            username = signing.loads(
                activation_key,
                max_age=ACCOUNT_ACTIVATION_DAYS * 86400
            )
            return username
        except signing.BadSignature:
            return None

    def get_user(self, username):
        User = get_user_model()
        lookup_kwargs = {
            User.USERNAME_FIELD: username,
            'is_active': False
        }
        try:
            user = User.objects.get(**lookup_kwargs)
            return user
        except User.DoesNotExist:
            return None


class UserChangeEmail(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        pass


class UserChangePassword(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        old_password = request.data['old_password']
        new_password = request.data['new_password']

        if old_password and new_password:
            is_correct = request.user.check_password(old_password)

            if is_correct:
                validator = PasswordValidator(PASSWORD_MIN_LENGTH)
                validator.validate(new_password)

                request.user.set_password(new_password)
                request.user.save()
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
