from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from utils.models import BaseModel, BaseModelManager


class UserManager(BaseModelManager, BaseUserManager):
    def create_user(self, email, password=None, access_level=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=self.normalize_email(email))

        if access_level:
            user.access_level = access_level

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.access_level = 1000
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    USERNAME_FIELD = "email"
    email = models.EmailField(unique=True)  # changes email to unique and blank to false
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # only for django admin

    access_level = models.SmallIntegerField(default=0)

    objects = UserManager()
    all_objects = UserManager(archived_too=True)
