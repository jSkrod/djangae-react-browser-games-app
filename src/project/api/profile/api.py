from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import views, status
from rest_framework.response import Response


class ActivateDeveloperMode(views.APIView):
    http_method_names = ('get')
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        if not request.user.is_developer:
            request.user.is_developer = True
            request.user.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_403_FORBIDDEN)


class DeactivateDeveloperMode(views.APIView):
    http_method_names = ('get')
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        if request.user.is_developer:
            request.user.is_developer = False
            request.user.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_403_FORBIDDEN)