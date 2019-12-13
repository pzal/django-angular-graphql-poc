from users.models import User
from items.models import Item, ItemChange

some_guy = User.objects.create_user(email="some_guy@example.com", password="secret")

item_1 = Item.objects.create(name="Item nr 1", created_by=some_guy, access_level=1)
item_2 = Item.objects.create(name="Item nr 2", created_by=some_guy, access_level=0)
item_3 = Item.objects.create(name="Item nr 3", created_by=some_guy, access_level=0)

item_change_1 = ItemChange.objects.create(made_by=some_guy, item=item_1)
item_change_2 = ItemChange.objects.create(made_by=some_guy, item=item_2)
