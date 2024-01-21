from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


# Create your models here.


class ChatUsersManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        try:
            user = ChatUsers.objects.get(username=username, **extra_fields)
        except ChatUsers.DoesNotExist:
            user = self.model(username=username, **extra_fields)
            user.set_password(password)
            user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')
        user = self.create_user(username, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

    def get_query(self, excluded_user_id):
        return super().get_queryset().exclude(
            id=excluded_user_id,
        ).exclude(
            is_staff=True,
            is_superuser=True
        )


class ChatUsers(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150, default=username)
    password = models.CharField(max_length=128)
    email = models.EmailField(max_length=150)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = ChatUsersManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    class Meta:
        verbose_name = 'ChatUser'
        verbose_name_plural = 'ChatUsers'
