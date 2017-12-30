import logging
import zipfile

from rest_framework import views
from rest_framework.response import Response
from rest_framework import status

from project.models.game import Game, GameFile, GAME_STATUSES
import hashlib
from utils.models import get_or_none
import cloudstorage as gcs

import uuid


class UnpackGame(views.APIView):
    permission_classes = ()


    def post(self, request):
        game_object = Game.objects.get(pk=request.data.get('gameId'))

        game_object.status = GAME_STATUSES["UPDATING"]
        game_object.save()

        try:
            with zipfile.ZipFile(game_object.game_main_zip, 'r') as game_zip:
                for file_name in game_zip.namelist():
                    self.check_file(game_object, game_zip, file_name)

            game_object.status = GAME_STATUSES["CREATED"]
        except zipfile.BadZipfile:
            game_object.status = GAME_STATUSES["ERROR"]

        game_object.save()
        return Response("OK", status.HTTP_200_OK)

    def check_file(self, game_object, game_zip, path_to_file):
        m = hashlib.md5()
        logging.warning(path_to_file)
        m.update(path_to_file)
        file_md5 = m.hexdigest()
        last_file = get_or_none(GameFile, game=game_object, path=file_md5)
        if last_file is None:
            return self.create_new_file(game_object, game_zip, path_to_file, file_md5)
        else:
            return self.update_file(game_object, last_file, game_zip, path_to_file)

    def create_new_file(self, game_object, game_zip, path, path_to_save):
        gcs_file_path = self.save_to_gcs(game_zip, path, game_object)
        if gcs_file_path is None:
            return False

        logging.info("Creating: %s" % path)
        game_file = GameFile(game=game_object, path=path_to_save, gcs_path=gcs_file_path)
        game_file.save()

        return True

    def update_file(self, game_object, file_to_update, game_zip, path):

        gcs_file_path = self.save_to_gcs(game_zip, path, game_object)
        if gcs_file_path is None:
            return False

        logging.info("Updating: %s, %d" % (path, file_to_update.id))
        file_to_update.gcs_path = gcs_file_path
        file_to_update.save()

        return True

    def save_to_gcs(self, game_zip, path, game_object):
        gcs_file_path = "/uploaded-assets/%s" % str(uuid.uuid4())
        with gcs.open(gcs_file_path, 'w') as gcs_file:
            try:
                file_content = game_zip.read(path)
                gcs_file.write(file_content)
            except Exception:  # Only if index doesn't exists then this error can be there
                game_object.status = GAME_STATUSES["INDEX_NOT_FOUND"]
                return None

        return gcs_file_path
