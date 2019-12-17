import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation
from items.queries import ItemType
from items.forms import ChangeItemAccessLevel


class ChangeItemAccessLevelMutation(DjangoModelFormMutation):
    item = graphene.Field(ItemType)

    class Meta:
        form_class = ChangeItemAccessLevel


class ItemsMutation(graphene.ObjectType):
    change_item_access_level = ChangeItemAccessLevelMutation.Field()
