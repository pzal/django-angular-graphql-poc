from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

admin_patterns = [
    path("admin/", admin.site.urls),
    path("ping/", lambda request: HttpResponse("pong")),
]

urlpatterns = admin_patterns + [
    path("users/", include("users.urls")),
]
