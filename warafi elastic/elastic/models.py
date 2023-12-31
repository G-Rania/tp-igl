from django.db import models

# Create your models here.

class Article(models.Model):
   title = models.CharField(max_length=500)
   text = models.TextField(null=True,blank =True)
   publishDate = models.DateTimeField(auto_now_add=True)

   def get_absolute_url(self):
       return f"articles/{self.id}"
    