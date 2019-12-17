import graphene

from graphene_django.types import DjangoObjectType

from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class UsersQuery(object):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        if info.context.user.is_anonymous:
            return User.objects.none()

        return User.objects.all()
