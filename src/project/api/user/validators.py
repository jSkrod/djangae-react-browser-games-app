from rest_framework import status
from rest_framework.exceptions import APIException
from settings import PASSWORD_MIN_LENGTH


class APIStatusException(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'An server error occured.'

    def __init__(self, detail, field, status_code):
        if status_code is not None:
            self.status_code = status_code
        if detail is not None:
            self.detail = {field: detail}
        else:
            self.detail = {'detail': self.default_detail}


class PasswordValidator(object):
    def __init__(self, min_length):
        self.min_length = min_length

    def validate(self, password, User=None):
        self.validate_length(password)
        self.validate_characters(password)

    def validate_length(self, password):
        if len(password) < self.min_length:
            detail = 'Password must contain at least {} characters'.format(str(PASSWORD_MIN_LENGTH))
            raise APIStatusException(detail, 'password_too_short', status_code=status.HTTP_400_BAD_REQUEST)

    def validate_characters(self, password):
        if not password.isalnum():
            raise APIException(
                'Password can only contain alphanumeric characters',
                code='password_too_short'
            )