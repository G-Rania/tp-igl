from django.http import HttpResponse, JsonResponse
from elastic.documents import ArticleDocument
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import json
from elasticsearch_dsl import connections
from elasticsearch.exceptions import NotFoundError
from users.auth import check_token
from users.favorites import get_favorites_elastic

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
                publish_date=datetime.utcnow().isoformat()
            )

            # Save the document
            new_article.save()
            return JsonResponse({"message":"Article indexed successfully!"},status = 200)
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error decoding JSON: {e}", status=400)
    return HttpResponse("Error: Invalid HTTP method")

def add_article_from_extraction(extracted_data):
    try:
    # Create ArticleDocument instance
        new_article = ArticleDocument(
            title=extracted_data['title'],
            abstract=extracted_data['abstract'],
            authors=extracted_data['authors'],
            institutions=extracted_data['institues'],
            keywords=extracted_data['keywords'],
            full_text=extracted_data['text'],
            pdf_url=extracted_data['pdf_url'],
            references=extracted_data['refrences'],
            publish_date=extracted_data['publication_date'],
            approved = False
        )

    # Save the document
        new_article.save()
        return JsonResponse({"message":"Article indexed successfully!"},status = 200)
    except json.JSONDecodeError as e:
        return HttpResponse(f"Error decoding JSON: {e}", status=400)

@csrf_exempt
def delete_article(request):
    if request.method == 'DELETE':
        try:
            es_client = connections.get_connection()
            index_name = 'articles'
            data = json.loads(request.body)
            article_id = data.get('id')
            es_client.delete(index=index_name, id=article_id)

            return JsonResponse({"message": f"Document with ID {article_id} deleted successfully."}, status=200)
        
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
def approve_article(request):
    if request.method == 'POST':
        try:
            es_client = connections.get_connection()
            index_name = 'articles'
            data = json.loads(request.body)
            article_id = data.get('article_id')
            article = es_client.get(index=index_name, id=article_id)
            
            article['_source']['approved'] = True
            

            es_client.update(index=index_name, id=article_id, body={'doc': article['_source']})

            return JsonResponse({"message": f"Document with ID {article_id} approved successfully."}, status=200)
        
        
        except NotFoundError:
            return JsonResponse({"error": f"Article with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    
@csrf_exempt
def desapprove_article(request):
    if request.method == 'POST':
        try:
            es_client = connections.get_connection()
            index_name = 'articles'
            data = json.loads(request.body)
            article_id = data.get('article_id')
            article = es_client.get(index=index_name, id=article_id)
            
            article['_source']['approved'] = False
            

            es_client.update(index=index_name, id=article_id, body={'doc': article['_source']})

            return JsonResponse({"message": f"Document with ID {article_id} approved successfully."}, status=200)
        
        
        except NotFoundError:
            return JsonResponse({"error": f"Article with ID {article_id} does not exist."}, status=404)

    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)    


@csrf_exempt
def get_article(article_id):
    try:
        es_client = connections.get_connection()
        article = ArticleDocument.get(id=article_id, using=es_client)
        
        # Convert article data to a dictionary
        article_data = {
            "id":article.meta.id,
            "approved":article.approved,
            "title": article.title,
            "abstract": article.abstract,
            "authors": list(article.authors),
            "institutions": list(article.institutions),
            "keywords": list(article.keywords),
            "full_text": article.full_text,
            "references": list(article.references),
            "publication_date":article.publish_date,
            "url":article.pdf_url
        }

        return article_data
    
    except NotFoundError:
        return JsonResponse({"error": f"Article with ID {article_id} does not exist."}, status=404)

@csrf_exempt    
def get_favorites(request):
    if request.method == 'POST':
        token_status = check_token(request=request).status_code
        if (token_status == 200):
            articles_ids = get_favorites_elastic(request=request)
            articles = []
            for article_id in articles_ids:
                article = get_article(article_id)
                article['favorite'] = True
                articles.append(article)
            return JsonResponse({"articles":articles},status = 200)
        else:
            return JsonResponse({"error":"User not authed"}, status = 402)
    else:
        return JsonResponse({"error":"Invalid request method"},status = 401)    
