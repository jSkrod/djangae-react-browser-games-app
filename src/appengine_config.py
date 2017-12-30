# https://github.com/gae-init/gae-init/pull/527
# solving issue of lack of msvcrt module
import os

if not os.environ.get('SERVER_SOFTWARE', '').startswith('Google App Engine') and os.name == 'nt':
    os.name = None
