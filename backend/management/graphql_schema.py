import graphene

from graphene_django.types import DjangoObjectType

from items.models import Item, ItemChange
from users.models import User


class ItemType(DjangoObjectType):
    class Meta:
        model = Item


class ItemChangeType(DjangoObjectType):
    class Meta:
        model = ItemChange


class UserType(DjangoObjectType):
    class Meta:
        model = User


class MonitoringQuery(object):
    all_items = graphene.List(ItemType)
    all_item_changes = graphene.List(ItemChangeType)
    all_users = graphene.List(UserType)

    def resolve_all_items(self, info, **kwargs):
        return Item.objects.all()

    def resolve_all_item_changes(self, info, **kwargs):
        return ItemChange.objects.all()

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


class Query(MonitoringQuery, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more queries to the project
    pass


graphql_schema = graphene.Schema(query=Query)
