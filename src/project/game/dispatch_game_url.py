import hashlib
import logging
import mimetypes

from django.http import HttpResponseNotFound, StreamingHttpResponse
from django.core.servers.basehttp import FileWrapper
import cloudstorage as gcs

from project.models.game import Game, GameFile
from utils.models import get_or_none


def dispatch(request):
    logging.error(request.META['HTTP_HOST'].rfind("-game"))
    index = request.META['HTTP_HOST'].rfind("-game")
    if index == -1:
        return HttpResponseNotFound('<h1>Page not found</h1>')

    game_name = request.META['HTTP_HOST'][:index]
    game = get_or_none(Game, game_name=game_name)

    if game is None:
        return HttpResponseNotFound('<h1>Game not found</h1>')

    m = hashlib.md5()
    logging.warning(request.get_full_path().lower()[1:])
    m.update(request.get_full_path()[1:])
    file_md5 = m.hexdigest()

    file_entry = get_or_none(GameFile, game=game, path=file_md5)
    if file_entry is None:
        return HttpResponseNotFound('<h1>File not found</h1>')

    chunk_size = 8192

    response = StreamingHttpResponse(FileWrapper(gcs.open(file_entry.gcs_path, 'r'), chunk_size),
                                     content_type=mimetypes.guess_type(request.get_full_path().lower())[0])

    response['Content-Length'] = gcs.stat(file_entry.gcs_path).st_size
    return response
