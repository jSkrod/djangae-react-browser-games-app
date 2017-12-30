from django.core import signing
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from django.template.loader import render_to_string
from django.conf import settings
from google.appengine.api.mail import EmailMessage

from settings import ACCOUNT_ACTIVATION_DAYS


@receiver(pre_save, sender=settings.AUTH_USER_MODEL)
def set_new_user_inactive(sender, instance, **kwargs):
    # only when adding user, not modifying
    if instance._state.adding is True:
        instance.is_active = False

        email_message = render_to_string('registration/activation_email.txt', {
            'user': instance.username,
            'activation_key': get_activation_key(instance),
            'expiration_days': ACCOUNT_ACTIVATION_DAYS
        })
        email_subject = render_to_string('registration/activation_email_subject.txt', {
            'user': instance.username
        })
        recipent = instance.email

        email = EmailMessage()
        email.subject = email_subject
        email.to = [recipent]
        email.body = email_message
        email.sender = "l12lpo1@gmail.com"
        email.send()


def get_activation_key(user):
    return signing.dumps(
        obj=getattr(user, user.USERNAME_FIELD)
    )