from django.forms import ModelForm
from items.models import Item


class ChangeItemAccessLevel(ModelForm):
    class Meta:
        model = Item
        fields = ("id", "access_level",)
