from elasticsearch_dsl import Index
from django_elasticsearch_dsl import Document , fields
from django_elasticsearch_dsl.registries import registry



class ArticleDocument(Document):
    title = fields.TextField()
    abstract = fields.TextField()
    authors = fields.TextField()
    institutions = fields.TextField()
    keywords = fields.TextField()
    full_text = fields.TextField()
    pdf_url = fields.TextField()
    references = fields.TextField()
    url = fields.TextField()
    publish_date = fields.TextField()
    approved = fields.BooleanField()

   
    
    class Index:
        name = 'articles'


    

    