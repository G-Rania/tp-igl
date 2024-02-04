from django.urls import path
from . import auth

url_patterns = [
    path ('moderator/auth/sign_out/',auth.sign_out,name='sign_out'),
    path ('moderator/auth/login/',auth.login,name='login'),
    path ('moderator/auth/get_mod_data/',auth.get_mod_data, name='get_mod_data'),
]