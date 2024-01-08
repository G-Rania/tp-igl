from django.urls import path
import admin.endpoints as admin
import users.endpoints as users
from search.views import search_view,get_approved_articles,get_not_approved_articles
from elastic import views

urlpatterns = [
               *users.url_patterns,
               *admin.url_patterns,
               path('articles/add-article/', views.add_article, name='add_article'),
               path('articles/delete_article/', views.delete_article, name='delete_article'),
               path('articles/update_article/', views.update_article, name='update_article'),
               path('articles/id/<article_id>/', views.get_article, name='get_article'),
               path('articles/approve_article/<article_id>/', views.approve_article, name='approve_article'),
               path('articles/approved_articles/', get_approved_articles, name='get_approved_articles'),
               path('articles/not_approved_articles/', get_not_approved_articles, name='get_not_approved_articles'),
               path('articles/search/', search_view, name='search_view'),
               ]




