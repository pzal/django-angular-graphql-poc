from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from graphene_django.views import GraphQLView
from management.graphql_schema import graphql_schema as management_graphql_schema

admin_patterns = [
    path("admin/", admin.site.urls),
    path("ping/", lambda request: HttpResponse("pong")),
]

urlpatterns = admin_patterns + [
    path("users/", include("users.urls")),
    path(
        "management/",
        GraphQLView.as_view(graphiql=True, schema=management_graphql_schema),
    ),
]
