from django.db import models
from django.contrib.auth.models import AbstractUser
import base64

# Create your models here.
class User(AbstractUser):
    pass

class todoItems(models.Model):
    username = models.CharField(max_length=16)
    todoTag = models.CharField(max_length=16)
    todoUniqueId = models.CharField(max_length=32)
    todoBody = models.CharField(max_length=100)
    todoIsChecked = models.BooleanField(default=False)
    todoImage = models.ImageField(default=None)
    def serialize(self):
        return {
            "username": self.username,
            "todoTag": self.todoTag,
            "todoUniqueId": self.todoUniqueId,
            "todoBody": self.todoBody,
            "todoIsChecked": self.todoIsChecked,
            "todoImage": image_to_base64(self.todoImage),
        }

def image_to_base64(image_field_file):
    if not image_field_file:
        return None
    with image_field_file.open('rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')