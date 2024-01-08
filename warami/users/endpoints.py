from django.urls import path
from . import auth
from . import favorites


url_patterns = [
                path('users/auth/create_user/', auth.create_user, name='create_user'),
                path('users/auth/login/', auth.login, name="login"),
                path('users/auth/get_data/', auth.get_user_data, name='get_user_data'),
                path('users/auth/sign_out/', auth.sign_out, name='sign_out'),
                path('users/favorites/add/', favorites.add_favorite, name='add_favorite'),
                path('users/favorites/remove/', favorites.remove_favorite, name='remove_favorite'),
                path('users/favorites/get/',favorites.get_favorites,name="get_favorites"),
                path('users/auth/forgot_password/',auth.forgot_password,name="forgot_password"),
                path('users/auth/reset_password/',auth.reset_password,name="reset_password")
                ]
