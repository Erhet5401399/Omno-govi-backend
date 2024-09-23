from django.db import models
# from typing import Any
# from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
# from django.utils import timezone
# Create your models here.




# class CustomUserManager(UserManager):
#     def _create_user(self, email, username, password, **extra_fields):
#         if not email:
#             raise ValueError("Емайл хаяг заавал байх ёстой")
        
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using = self._db)

#     def create_user(self, username: str, email: str | None = ..., password: str | None = ..., **extra_fields: Any) -> Any:
#         extra_fields.setdefault('is_staff', False)
#         extra_fields.setdefault('is_superuser', False)
#         return super().create_user(username, email, password, **extra_fields)
    
#     def create_user(self, email = None, password = None, **extra_field):
#         extra_field.setdefault('is_staff', True)
#         extra_field.setdefault('is_superuser', True)
#         return self._create_user(email, password, **extra_field)

# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(blank=True, default='', unique=True)
#     name = models.CharField(max_length=255, blank=True, unique=True, null=False)

#     is_active = models.BooleanField(default=True)
#     is_superuser = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)

#     date_joined = models.DateTimeField(default=timezone.now)
#     last_login = models.DateTimeField(blank=True, null=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD ='email'
#     EMAIL_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     class Meta:
#         verbose_name ='User'
#         verbose_name_plural= 'Users'

#     def get_full_name(self):
#         return self.name
    
#     def get_short_name(self):
#         return self.name or self.email.split('@')[0]
    