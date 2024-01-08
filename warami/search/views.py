from django.http import JsonResponse
from django.http import HttpResponse
from .search import search,extract_search_queries,search_single_query
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def search_view(request):
     if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            search_queries = extract_search_queries(data)
       
        
            results = search(search_queries)
            return  JsonResponse(results, safe=False)
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error decoding JSON: {e}", status=400)
        

def get_approved_articles(request):
     if request.method == 'POST':
            results = search_single_query(query='true',fields='approved')
            return  JsonResponse(results, safe=False)
           
def get_not_approved_articles(request):
     if request.method == 'POST':
            results = search_single_query(query='false',fields='approved')
            return  JsonResponse(results, safe=False)
           