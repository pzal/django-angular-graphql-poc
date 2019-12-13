from django.db import models
from utils.models import BaseModel


class Item(BaseModel):
    name = models.TextField()
    created_by = models.ForeignKey("users.User", on_delete=models.CASCADE)
    access_level = models.SmallIntegerField(default=0)


class ItemChange(BaseModel):
    item = models.ForeignKey(
        "items.Item", related_name="item_changes", on_delete=models.CASCADE
    )
    made_by = models.ForeignKey("users.User", on_delete=models.CASCADE)
