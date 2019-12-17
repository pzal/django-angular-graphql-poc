from users.models import User
from items.models import Item, ItemChange

admin = User.objects.filter(is_superuser=True).first()

item_1 = Item.objects.create(name="Item nr 1", created_by=admin, access_level=1)
item_2 = Item.objects.create(name="Item nr 2", created_by=admin, access_level=2)
item_3 = Item.objects.create(name="Item nr 3", created_by=admin, access_level=3)
item_4 = Item.objects.create(name="Item nr 4", created_by=admin, access_level=4)

item_change_1 = ItemChange.objects.create(made_by=admin, item=item_1)
item_change_2 = ItemChange.objects.create(made_by=admin, item=item_2)
