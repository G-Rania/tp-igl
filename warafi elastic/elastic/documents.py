from elasticsearch_dsl import Index
from django_elasticsearch_dsl import Document , fields
from django_elasticsearch_dsl.registries import registry
from .models import Article



@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'articles'


    url = fields.TextField(attr='get_absolute_url')
    class Django:
        model = Article
        fields = ['title','text','publishDate']