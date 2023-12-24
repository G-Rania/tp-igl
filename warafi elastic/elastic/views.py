from django.http import HttpResponse
from elastic.models import Article
from elastic.documents import ArticleDocument
from django_elasticsearch_dsl.registries import registry
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def add_article(request):
    if request.method == 'POST':
        _title = request.POST.get('title')
        _text = request.POST.get('text')
         # Create an Article instance
        new_article =  Article.objects.create(
        title=_title,
        text=_text
        ).save

        
        return HttpResponse("Article added successfully!")
    return HttpResponse("error")
