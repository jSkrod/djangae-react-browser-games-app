from django.conf.urls import url

from project.api.profile.api import ActivateDeveloperMode, DeactivateDeveloperMode

urlpatterns = [
    url('/activate_developer_account$', ActivateDeveloperMode.as_view()),
    url('/deactivate_developer_account$', DeactivateDeveloperMode.as_view())

]