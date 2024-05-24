from django.contrib import admin
from .models import todoItems, User

# Register your models here.
admin.site.register(todoItems)
admin.site.register(User)