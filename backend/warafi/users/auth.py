from datetime import timedelta
import random

from django.db import IntegrityError
from warafi.models import User
from warafi.models import TokenUser
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import TokenError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

@csrf_protect
@csrf_exempt
def sign_out(request):
    if request.method == 'POST':
        try:
            token = request.headers.get('Authorization', '').split(' ')[1]
            data = json.loads(request.body)
            user_id = data.get('user_id')
            token_user = TokenUser.objects.get(user_id = user_id, token = token)
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
                user = User.objects.get(email = username)
            except ValidationError:    
                user = User.objects.get(username=username)
            if user.password == password:
                if user.email_verified:
                    access_token = AccessToken.for_user(user)
                    access_token.set_exp(lifetime = timedelta(days=15))
                    token_user = TokenUser.objects.create(user = user, token = access_token)    
                # Set the access token in a cookie
                    response = JsonResponse({'access_token': str(access_token),'user_id':user.pk,'verified':True},status =200)
                    response.set_cookie('access_token', access_token, httponly=True, expires= timezone.now() + timedelta(days=15))   # Setting httponly for security
                    return response
                else:
                    setOTP(user.email)
                    return JsonResponse({'user_id':user.pk, 'verified':False})
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def generate_otp():
    return random.randint(10000, 99999)



def setOTP(email):
    user = User.objects.get(email=email)
    otp_code = generate_otp()
    user.otp_code = otp_code
    user.save()
    send_mail(
        'Email Verification OTP',
        f'Your OTP for email verification is: {otp_code}',
        'your_email@example.com',
        [email],
    )

@csrf_protect
@csrf_exempt
def verify_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        otp = data.get('otp')
        
        try:
            user = User.objects.get(id = user_id, otp_code = otp)
            # If OTP is correct, mark email as verified and delete the OTP record
            user.email_verified = True
            user.otp_code = ''
            user.save()
            
            # Generate access token
            access_token = AccessToken.for_user(user)
            access_token.set_exp(lifetime=timedelta(days=1))
            token_user = TokenUser.objects.create(user=user, token=access_token)
            
            # Set access token in response and cookie
            response = JsonResponse({'message': 'Email verified successfully.', 'user_id': user.pk, 'access_token': str(access_token)}, status=200)
            response.set_cookie('access_token', access_token, httponly=True, expires=timezone.now() + timedelta(days=1))
            return response
        
        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid OTP"}, status=404)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_protect
@csrf_exempt    
def create_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        if not username or not password or not email:
            return JsonResponse({'error': 'Please provide username, password and email.'}, status=400)
        
        # Create user
        try:
            validate_email(email)
            user = User.objects.create(email = email, username=username, password=password)
            
            # Generate OTP and save it in the database
            setOTP(email=email)
            return JsonResponse({'message': 'User created successfully','user_id':user.pk}, status=200)
        
        except ValidationError:
            return JsonResponse({"error": "Email not valid"}, status=400) 
        except IntegrityError:
            return JsonResponse({"error": "User already exists"}, status=406)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_protect
@csrf_exempt
def create_user_(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        if not username or not password or not email:
            return JsonResponse({'error': 'Please provide username, password and email.'}, status=400)
        
        # Create user
        try:
            validate_email(email)
            user = User.objects.create(email = email, username=username, password=password)
            access_token = AccessToken.for_user(user)
            access_token.set_exp(lifetime = timedelta(days=1))
            token_user = TokenUser.objects.create(user = user, token = access_token)
            response = JsonResponse({'message': 'User created successfully','user_id':user.pk, 'access_token':str(access_token)},status = 200)
            response.set_cookie('access_token', access_token, httponly=True, expires= timezone.now() + timedelta(days=1))
            return response
        except ValidationError:
            return JsonResponse({"error":"Email not valid"}, status = 400) 
        except IntegrityError:
            return JsonResponse({"error": "User already exists"}, status = 406)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def is_token_valid(user_id,token):
    try:
        AccessToken(token)
        token_user = TokenUser.objects.get(user_id = user_id,token = token)
        if token_user:  # Attempt to parse the token
            return True
        else: return False
    except TokenError:
        return False
    
def check_token(request):
    token = request.headers.get('Authorization', '').split(' ')[1]
    data = json.loads(request.body)
    user_id = data.get('user_id')  # Extract token from Authorization header

    if is_token_valid(user_id,token):
        # Token is valid, allow access to the view
        return JsonResponse({'message': 'Token is valid'}, status = 200)
    else:
        # Token is invalid or expired, deny access
        return JsonResponse({'error': 'Invalid or expired token'}, status=401)

@csrf_protect
@csrf_exempt    
def get_user_data(request):
    if request.method == 'POST':
        token_status = check_token(request=request).status_code
        if token_status == 200:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            user = User.objects.get(id = user_id)
            return JsonResponse({'username': user.username}, status = 200)
        else: return JsonResponse({'error':'Invalid token'}, status = 401)
    else: return JsonResponse({'error':'Invalid request method'},status = 402)     

@csrf_protect
@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        try:
            user = User.objects.get(email=email)
            reset_token = get_random_string(length=32)
            user.reset_token = reset_token  # Save plain reset token
            user.save()


            reset_link = f"http://localhost:3000/users/auth/reset_password/?reset_token={reset_token}"  # Replace with your actual reset link logic
            email_body = f"Click the following link to reset your password: {reset_link}"

            subject = 'Password Reset Request'
            send_mail(subject, email_body, 'from@example.com', [email])

            return JsonResponse({'message': 'Password reset link sent successfully'}, status=200)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_protect
@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        # Retrieve reset_token from query parameters
        reset_token = request.GET.get('reset_token')
        if not reset_token:
            return JsonResponse({'error': 'Reset token not provided'}, status=400)

        # Add your reset password logic using the reset_token parameter
        data = json.loads(request.body)
        new_password = data.get('new_password')

        try:
            # Find the user by plain reset token
            user = User.objects.get(reset_token=reset_token)

            # Validate the reset token
            if reset_token == user.reset_token:
                # Set the new password directly on the existing user instance
                user.password=new_password
                user.reset_token = ""  # Clear the reset token after successful password reset
                user.save()

                return JsonResponse({'message': 'Password reset successfully'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid reset token'}, status=400)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)