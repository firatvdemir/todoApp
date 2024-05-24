from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
import json
from .models import User, todoItems
from django.db import IntegrityError

# Create your views here.
def index(request):
    return JsonResponse({"status": "hi"})

@csrf_exempt
def loginView(request):
    if request.method == "POST":
        # checks user's credential for log in process
        requestJson = json.loads(request.body)['loginInputs']
        username = requestJson['username']
        password = requestJson['password']
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({
                'status': True,
                'username': username,
                'message': 'You have succesfully logged in!'
            })
        else:
            return JsonResponse({
                'status': False,
                'username': 'unknown',
                'message': "Something's wrong try again!"
            })
    else:
        return JsonResponse({
            "message": "unknown request",
            "status": False
        })

@csrf_exempt
def logoutView(request):
    logout(request)
    return JsonResponse({"status": "logged out!"})

@csrf_exempt
def addItem(request):
    return JsonResponse({'status': 'add item'})

@csrf_exempt
def register(request):
    if request.method == "POST":
        requestJson = json.loads(request.body)["userInputs"]

        username = requestJson['username']
        email = requestJson['email']
        password = requestJson['password']
        confirmation = requestJson['confirmPassword']

        # Ensure password matches confirmation
        if password != confirmation:
            return JsonResponse({
                "message": "Passwords must match.",
                "status": False
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username.lower(), email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({
                "message": "Username already taken.",
                "status": False
            })
        login(request, user)
        return JsonResponse({
            "message": "You have successfully registered",
            "status": True
        })
    else:
        return JsonResponse({
            "message": "unknown request",
            "status": False
        })