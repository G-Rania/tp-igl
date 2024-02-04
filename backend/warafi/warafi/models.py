from django.utils import timezone
from django.db import models
from django.core.validators import EmailValidator



class Admin(models.Model):
    email = models.EmailField(max_length = 150, validators=[EmailValidator(message='Enter a valid email address.')], unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)

class TokenAdmin(models.Model):
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    token = models.CharField(max_length=300)
    created_at = models.DateTimeField(default=timezone.now())

    class Meta:
        unique_together = ('admin','token')

class Mod(models.Model):
    email = models.EmailField(max_length = 150, validators=[EmailValidator(message='Enter a valid email address.')], unique = True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)

class TokenMod(models.Model):
    mod = models.ForeignKey(Mod, on_delete=models.CASCADE)
    token = models.CharField(max_length=300)
    created_at = models.DateTimeField(default=timezone.now())

    class Meta:
        unique_together = ('mod','token')    

class User(models.Model):
    email = models.EmailField(max_length = 150, validators=[EmailValidator(message='Enter a valid email address.')], unique = True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    reset_token = models.CharField(max_length=255, null=True, blank=True)
    email_verified = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=255, null=True, blank=True)
    # You might want to use more secure methods for storing passwords in production

class TokenUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=300)
    created_at = models.DateTimeField(default=timezone.now())
    
    class Meta:
        unique_together = ('user','token')

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article_id = models.CharField(max_length=100) # Assuming article_id is an IntegerField

    class Meta:
        unique_together = ('user', 'article_id')



