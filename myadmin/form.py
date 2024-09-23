from typing import Any
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm


class UserCreateForm(UserCreationForm):

    class Meta:
        fields= ('username', 'email', 'first_name', 'last_name', 'password', 'password1')
        model =get_user_model()

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.fields['username'].label= 'Нэвтрэх нэр'
        self.fields['email'].label='Емайл хаяг'

        