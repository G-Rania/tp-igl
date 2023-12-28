from django.http import HttpResponse
from elastic.documents import ArticleDocument
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
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
            return HttpResponse("Article indexed successfully!")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error decoding JSON: {e}", status=400)
    return HttpResponse("Error: Invalid HTTP method")

