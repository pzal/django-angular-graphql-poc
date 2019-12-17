import graphene

from graphene_django.types import DjangoObjectType, Field

from items.models import Item


class ItemType(DjangoObjectType):
    class Meta:
        model = Item


class ItemsQuery(object):
    all_items = graphene.List(ItemType)
    item = graphene.Field(ItemType, id=graphene.String())

    def resolve_all_items(self, info, **kwargs):
        if info.context.user.is_anonymous:
            return Item.objects.none()

        return Item.objects.filter(access_level__lte=info.context.user.access_level)

    def resolve_item(self, info, id):
        return Item.objects.get(pk=id)
