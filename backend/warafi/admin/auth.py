from datetime import timedelta

from django.db import IntegrityError
from warafi.models import Admin
from warafi.models import TokenAdmin
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
            admin_id = data.get('admin_id')
            token_user = TokenAdmin.objects.get(admin_id = admin_id, token = token)
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
                admin = Admin.objects.get(email = username)
            except ValidationError:    
                admin = Admin.objects.get(username=username)
            if admin.password == password:
                access_token = AccessToken.for_user(admin)
                access_token.set_exp(lifetime = timedelta(days=15))
                token_user = TokenAdmin.objects.create(admin = admin, token = access_token)    
            # Set the access token in a cookie
                response = JsonResponse({'access_token': str(access_token),'admin_id':admin.pk},status =200)
                response.set_cookie('access_token', access_token, httponly=True, expires= timezone.now() + timedelta(days=15))   # Setting httponly for security
                return response
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except Admin.DoesNotExist:
            return JsonResponse({'error': 'Admin does not exist'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def is_token_valid(admin_id,token):
    try:
        AccessToken(token)
        token_admin = TokenAdmin.objects.get(admin_id = admin_id,token = token)
        if token_admin:  # Attempt to parse the token
            return True
        else: return False
    except TokenError:
        return False
    
def check_token(request):
    token = request.headers.get('Authorization', '').split(' ')[1]
    data = json.loads(request.body)
    admin_id = data.get('admin_id')  # Extract token from Authorization header

    if is_token_valid(admin_id,token):
        # Token is valid, allow access to the view
        return JsonResponse({'message': 'Token is valid'}, status = 200)
    else:
        # Token is invalid or expired, deny access
        return JsonResponse({'error': 'Invalid or expired token'}, status=401)
    
@csrf_protect
@csrf_exempt    
def get_admin_data(request):
    if request.method == 'POST':
        token_status = check_token(request=request).status_code
        if token_status == 200:
            data = json.loads(request.body)
            admin_id = data.get('admin_id')
            admin = Admin.objects.get(id = admin_id)
            return JsonResponse({'username': admin.username}, status = 200)
        else: return JsonResponse({'error':'Invalid token'}, status = 401)
    else: return JsonResponse({'error':'Invalid request method'},status = 402)      

