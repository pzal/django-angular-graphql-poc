from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

from management.graphql_schema import graphql_schema as management_graphql_schema
from django.contrib.auth import authenticate, get_user_model
from django.middleware.csrf import CsrfViewMiddleware
from django.utils.translation import gettext_lazy as _
from rest_framework.authentication import get_authorization_header
from rest_framework import HTTP_HEADER_ENCODING, exceptions


from graphene_django.views import GraphQLView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
    api_view,
)


class CustomTokenAuthentication(TokenAuthentication):
    keyword = None

    def authenticate(self, request):
        auth = get_authorization_header(request)
        if not auth:
            return None

        try:
            token = auth.decode()
        except UnicodeError:
            msg = _(
                "Invalid token header. Token string should not contain invalid characters."
            )
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)


class DRFAuthenticatedGraphQLView(GraphQLView):
    # custom view for using DRF TokenAuthentication with graphene GraphQL.as_view()
    # all requests to Graphql endpoint will require token for auth, obtained from DRF endpoint
    # https://github.com/graphql-python/graphene/issues/249
    @classmethod
    def as_view(cls, *args, **kwargs):
        view = super(DRFAuthenticatedGraphQLView, cls).as_view(*args, **kwargs)
        view = permission_classes((IsAuthenticated,))(view)
        view = authentication_classes((CustomTokenAuthentication,))(view)
        view = api_view(["POST"])(view)
        return view


admin_patterns = [
    path("admin/", admin.site.urls),
    path("ping/", lambda request: HttpResponse("pong")),
]

urlpatterns = admin_patterns + [
    path("users/", include("users.urls")),
    path(
        "management/",
        csrf_exempt(
            DRFAuthenticatedGraphQLView.as_view(
                schema=management_graphql_schema, batch=True
            )
        ),
    ),
]
