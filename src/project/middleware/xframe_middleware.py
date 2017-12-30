import logging
from django.conf import settings


class XFrameMiddleware(object):
    def process_request(self, request):
        pass

    def process_response(self, request, response):
        #TODO: Do it
        referer = request.META.get('HTTP_REFERER')
        if referer is None:
            return response

        return response
