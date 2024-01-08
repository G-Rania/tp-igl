import json
from django.http import JsonResponse
from warafi.models import Favorite
from warafi.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.core.exceptions import ObjectDoesNotExist
from . import auth

@csrf_protect
@csrf_exempt
def add_favorite(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            data = json.loads(request.body)
            user_id = data.get('user_id')
            article_id = data.get('article_id')
            user = User.objects.get(id = user_id)
            print(user.username)
            if not Favorite.objects.filter(user=user, article_id=article_id).exists():
                Favorite.objects.create(user=user, article_id=article_id)
                return JsonResponse({"message": "Favorite added"}, status =200) 
            return JsonResponse({'error': 'error'}, status=400)
        else: return JsonResponse({"error": "User not authenticated"}, status = 405) 
    else: return JsonResponse({'error':'Invalid request'},status = 401)

@csrf_protect
@csrf_exempt
def remove_favorite(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            data = json.loads(request.body)
            user_id = data.get('user_id')
            article_id = data.get('article_id')
            
            try:
                user = User.objects.get(id=user_id)
                favorite = Favorite.objects.get(user=user, article_id=article_id)
                favorite.delete()
                return JsonResponse({"message": "Favorite removed"}, status=200)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Favorite not found'}, status=404)
        else: return JsonResponse({"error": "User not authenticated"}, status = 405)    
    else:
        return JsonResponse({'error': 'Invalid request'}, status=401)    
    
from django.core.exceptions import ObjectDoesNotExist

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

@csrf_protect
@csrf_exempt
def get_favorites(request):
    if request.method == 'POST':
        token_status = auth.check_token(request=request).status_code
        if (token_status == 200):
            data = json.loads(request.body)
            user_id = data.get('user_id')
            try:
                user = User.objects.get(id=user_id)
                user_favorites = Favorite.objects.filter(user=user)
                
                # Assuming you want to return a list of article IDs
                favorite_article_ids = list(user_favorites.values_list('article_id', flat=True))
                print(len(favorite_article_ids))
                return JsonResponse({'user_favorites': favorite_article_ids}, status=200)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        else: return JsonResponse({'error': 'User not authenticated'}, status=405)    
    else:
        return JsonResponse({'error': 'Invalid request'}, status=401)


