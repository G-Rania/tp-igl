import json
from django.http import JsonResponse
from . import auth
from warafi.models import Mod
from django.db import IntegrityError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

def get_mods(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            mods = list(Mod.objects.values('id','email','username','password'))
            return JsonResponse({"mods":mods},status = 200)
        else: return JsonResponse({"error":"Admin not authenticated"},status = 401)
    else: return JsonResponse({"error":"Invalid request method"})

def add_mod(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            if not username or not password or not email:
                return JsonResponse({'error': 'Please provide username, password and email'}, status=400)   
            try:
                validate_email(email)
                mod = Mod.objects.create(email=email, username = username, password = password)
                return JsonResponse({"message":"Mod created"},status = 200)
            except ValidationError:
                return JsonResponse({"error":"Email not valid"}, status = 400)
            except IntegrityError:
                return JsonResponse({"error": "Mod already exists"}, status = 406)
        else: return JsonResponse({'error': 'Admin not authenticated'}, status=405)      
    return JsonResponse({'error': 'Invalid request method'}, status=407)

def remove_mod(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            data = json.loads(request.body)
            mod_id = data.get('mod_id')
            mod = Mod.objects.get(id = mod_id)
            mod.delete()
            return JsonResponse({"message":"Mod deleted"},status = 200)
        else: return JsonResponse({'error': 'Admin not authenticated'}, status=405) 
    return JsonResponse({'error': 'Invalid request method'}, status=407)

def update_mod(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            try:
                data = json.loads(request.body)
                mod_id = data.get('mod_id')
                username = data.get('username')
                email = data.get('email')
                password = data.get('password')
                validate_email(email)
                mod = Mod.objects.get(id = mod_id)
                mod.username = username
                mod.password = password
                mod.email = email
                mod.save()
                return JsonResponse({"message": "Mod updated"}, status = 200)
            except ValidationError:
                return JsonResponse({'error': 'Email not valid'}, status=400)     
        else: return JsonResponse({'error': 'Admin not authenticated'}, status=405) 
    else: return JsonResponse({'error': 'Invalid request method'}, status=407)             