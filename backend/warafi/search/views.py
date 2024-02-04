import json
from django.http import JsonResponse
from django.shortcuts import render
from .search import lookup
from users.auth import check_token
from .search import search_single_query


def search_view(request):
    # https://www.google.com/search?q=ffff&oq=ffff&aqs=chrome..69i57j46j0l6.824j0j7&sourceid=chrome&ie=UTF-8

    
    query_params = request.GET
    q = query_params.get('q')
    f = query_params.getlist('f')
    user_id = query_params.get('user_id')
    author = query_params.get('author')
    keyword = query_params.get('keyword')
    institution = query_params.get('institution')
    start_date = query_params.get('start_date')
    end_date = query_params.get('end_date')

    context = {}

    if q is not None:
        results = lookup(user_id=user_id,query=q,author=author,keyword=keyword,institution=institution,start_date=start_date,end_date=end_date,fields=f)
        context['results'] = results
        context['query'] = q
    return JsonResponse({"data":results})

def get_not_approved_articles(request):
     if request.method == 'POST':
            results = search_single_query()
            return  JsonResponse({"articles":results}, status=200)