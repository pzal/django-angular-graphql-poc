from django.urls import path
from users.views import AuthTokenView


urlpatterns = [path("api-token-auth/", AuthTokenView.as_view())]

