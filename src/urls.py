from django.conf.urls import url, include
from google.appengine.api import modules

urlpatterns = [
        url(r'^_ah/', include('djangae.urls')),
        url('^api/docs/', include('rest_framework_docs.urls')),
        url(r'^api/', include('project.api.urls')),
        url(r'^game/', include('project.game.urls')),
        url(r'^accounts/', include('registration.backends.hmac.urls')),
        url(r'^accounts/', include('registration.auth_urls')),
]

if modules.get_current_module_name() == "game":
    urlpatterns = [
        url(r'^_ah/', include('djangae.urls')),
        url(r'^.*', 'project.game.dispatch_game_url.dispatch')
    ]