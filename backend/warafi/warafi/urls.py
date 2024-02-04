"""
URL configuration for warafi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
import admin.endpoints as admin
import users.endpoints as users
import search.views as search
import elastic.views as elastic
import moderator.endpoints as moderators
from search.views import get_not_approved_articles
from elastic import views

urlpatterns = [ 
               *users.url_patterns,
               *admin.url_patterns,
               path('search/',search.search_view,name='search'),
               path('add_article/',elastic.add_article,name='add_article'),
               *moderators.url_patterns,
               path('articles/delete_article/', views.delete_article, name='delete_article'),
               path('articles/update_article/', views.update_article, name='update_article'),
               path('articles/get_favorites/', views.get_favorites, name='get_article'),
               path('articles/approve_article/', views.approve_article, name='approve_article'),
               path('articles/desapprove_article/', views.desapprove_article, name='desapprove_article'),
               path('articles/not_approved_articles/', get_not_approved_articles, name='get_not_approved_articles'),
               ]

