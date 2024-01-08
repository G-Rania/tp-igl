from django.http import HttpResponse
from elastic.documents import ArticleDocument
from datetime import datetime
from elasticsearch_dsl import Search, connections
from elasticsearch.exceptions import NotFoundError
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def add_article(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            _title = data.get('title')
            _abstract = data.get('abstract')
            _authors = data.get('authors')
            _institutions = data.get('institutions')
            _keywords = data.get('keywords')
            _full_text = data.get('full_text')
            _pdf_url = data.get('pdf_url')
            _references = data.get('references')
            existing_articles = Search(index="articles").query(
                "bool",
                must=[
                    {"term": {"title": _title}},
                    {"term": {"full_text": _full_text}},
                ]
            )
            if existing_articles.execute():
                return HttpResponse("Error: Article with the same title and text already exists", status=400)
            # Create ArticleDocument instance
            new_article = ArticleDocument(
                title=_title,
                abstract=_abstract,
                authors=_authors,
                institutions=_institutions,
                keywords=_keywords,
                full_text=_full_text,
                pdf_url=_pdf_url,
                references=_references,
                publish_date=datetime.utcnow().isoformat(),
                approved = "false"
            )

            # Save the document
            new_article.save()
            return HttpResponse("Article indexed successfully!")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error decoding JSON: {e}", status=400)
    return HttpResponse("Error: Invalid HTTP method")




@csrf_exempt
def delete_article(request):
    if request.method == 'DELETE':
        try:
            es_client = connections.get_connection()
            index_name = 'articles'
            data = json.loads(request.body)
            article_id = data.get('id')
            es_client.delete(index=index_name, id=article_id)

            return JsonResponse({"message": f"Document with ID {article_id} deleted successfully."}, status=204)
        
        except NotFoundError:

            return JsonResponse({"error": f"Document with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)



@csrf_exempt
def update_article(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            article_id = data.get('id')

            # Connect to your Elasticsearch instance
            es_client = connections.get_connection()

            index_name = 'articles'

            # Fetch the existing document by ID
            existing_document = es_client.get(index=index_name, id=article_id)
            
            # Update fields based on the new data
            for key, value in data.items():
                existing_document['_source'][key] = value

            # Perform the update operation
            es_client.update(index=index_name, id=article_id, body={'doc': existing_document['_source']})

            return JsonResponse({"message": f"Document with ID {article_id} updated successfully."}, status=200)
        
        except NotFoundError:
            return JsonResponse({"error": f"Document with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    

@csrf_exempt
def approve_article(request, article_id):
    if request.method == 'POST':
        try:
            es_client = connections.get_connection()
            index_name = 'articles'
            article = es_client.get(index=index_name, id=article_id)
            
            article['_source']['approved'] = "true"
            

            es_client.update(index=index_name, id=article_id, body={'doc': article['_source']})

            return JsonResponse({"message": f"Document with ID {article_id} approved successfully."}, status=200)
        
        
        except NotFoundError:
            return JsonResponse({"error": f"Article with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def get_article(request, article_id):
    if request.method == 'POST':
        try:
            es_client = connections.get_connection()
            article = ArticleDocument.get(id=article_id, using=es_client)
            
            # Convert article data to a dictionary
            article_data = {
                "id":article.meta.id,
                "approved":article.approved,
                "title": article.title,
                "abstract": article.abstract,
                "authors": article.authors,
                "institutions": article.institutions,
                "keywords": article.keywords,
                "full_text": article.full_text,
                "references": article.references,
                "publish_date": article.publish_date
            }

            return JsonResponse(article_data, safe=False)
        
        except NotFoundError:
            return JsonResponse({"error": f"Article with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)
