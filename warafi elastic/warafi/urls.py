
from django.contrib import admin
from django.urls import path
from search.views import search_view
from elastic import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add-article/', views.add_article, name='add_article'),
    path('search/', search_view, name='search_view'),

]
