from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def index(request):
    return JsonResponse({"status": "hi"})

def loginView(request):
    return JsonResponse({"status": "deneme"})

def addItem(request):
    return JsonResponse({'status': 'add item'})

def register(request):
    return JsonResponse({'status': 'register'})