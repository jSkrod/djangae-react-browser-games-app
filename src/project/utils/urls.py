import os

from google.appengine.api import modules
from urlparse import urlparse, urlunparse


def get_game_instance_url():
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        return "https://game-dot-djangae-template-project.appspot.com"
    else:
        game_url = modules.get_hostname("game")
        game_url = game_url.replace("127.0.0.1", "localhost")
        if not game_url.startswith("http"):
            game_url = "http://%s" % game_url

        return game_url


def change_game_hostname(game_name):
    parsed_url = urlparse(get_game_instance_url(), scheme='http')

    port = parsed_url.port
    if port is None:
        port = ''
    else:
        port = ':%s' % port

    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        new_url = parsed_url._replace(netloc="{}{}".format("%s-%s" % (game_name, parsed_url.hostname), port))
    else:
        new_url = parsed_url._replace(netloc="{}{}".format("%s-game.%s" % (game_name, parsed_url.hostname), port))

    return urlunparse(new_url)
