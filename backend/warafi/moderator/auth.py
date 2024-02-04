from datetime import timedelta

from django.db import IntegrityError
from warafi.models import Mod
from warafi.models import TokenMod
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import TokenError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

@csrf_protect
@csrf_exempt
def sign_out(request):
    if request.method == 'POST':
        try:
            token = request.headers.get('Authorization', '').split(' ')[1]
            data = json.loads(request.body)
            mod_id = data.get('mod_id')
            token_user = TokenMod.objects.get(mod_id = mod_id, token = token)
            token_user.delete()
            return JsonResponse({"message":"Token removed"},status = 200)
        except: return JsonResponse({'error':'Error while removing'},status = 401)
    else: return JsonResponse({'error':'Invalid request method'})    
    
    
@csrf_protect
@csrf_exempt
def login(request):
    if request.method == 'POST':
        print(request.body)
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Please provide username and password'}, status=400)
        try:
            try:
                validate_email(username)
                mod = Mod.objects.get(email = username)
            except ValidationError:    
                mod = Mod.objects.get(username=username)
            if mod.password == password:
                access_token = AccessToken.for_user(mod)
                access_token.set_exp(lifetime = timedelta(days=15))
                token_mod = TokenMod.objects.create(mod = mod, token = access_token)    
            # Set the access token in a cookie
                response = JsonResponse({'access_token': str(access_token),'mod_id':mod.pk},status =200)
                response.set_cookie('access_token', access_token, httponly=True, expires= timezone.now() + timedelta(days=15))   # Setting httponly for security
                return response
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except Mod.DoesNotExist:
            return JsonResponse({'error': 'Moderator does not exist'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)



def is_token_valid(mod_id,token):
    try:
        AccessToken(token)
        token_mod = TokenMod.objects.get(mod_id = mod_id ,token = token)
        if token_mod:  # Attempt to parse the token
            return True
        else: return False
    except TokenError:
        return False
    
    
def check_token(request):
    token = request.headers.get('Authorization', '').split(' ')[1]
    data = json.loads(request.body)
    mod_id = data.get('mod_id')  # Extract token from Authorization header

    if is_token_valid(mod_id,token):
        # Token is valid, allow access to the view
        return JsonResponse({'message': 'Token is valid'}, status = 200)
    else:
        # Token is invalid or expired, deny access
        return JsonResponse({'error': 'Invalid or expired token'}, status=401)
    
    
@csrf_protect
@csrf_exempt    
def get_mod_data(request):
    if request.method == 'POST':
        token_status = check_token(request=request).status_code
        if token_status == 200:
            data = json.loads(request.body)
            mod_id = data.get('mod_id')
            mod = Mod.objects.get(id = mod_id)
            return JsonResponse({'username': mod.username}, status = 200)
        else: return JsonResponse({'error':'Invalid token'}, status = 401)
    else: return JsonResponse({'error':'Invalid request method'},status = 402)     
