from django.urls import path
from . import extract
from . import auth
from . import mods

url_patterns =[path('admin/extract/', extract.extract, name='extract'),
               path('admin/auth/login/', auth.login, name='login'),
               path('admin/auth/sign_out/', auth.sign_out, name='sign_out'),
               path('admin/mods/get_mods/',mods.get_mods , name='get_mods'),
               path('admin/mods/add_mod/', mods.add_mod, name='add_mod'),
               path('admin/mods/remove_mod/', mods.remove_mod, name='remove_mod'),
               path('admin/mods/update_mod/', mods.update_mod, name='update_mod'),
               ]
