from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class todoItems(models.Model):
    username = models.CharField(max_length=16)
    todoTag = models.CharField(max_length=16)
    todoUniqueId = models.CharField(max_length=32)
    todoBody = models.CharField(max_length=100)
    todoIsChecked = models.BooleanField(default=False)
    todoImage = models.ImageField()
    todoFile = models.FileField()
    def serialize(self):
        return {
            "username": self.username,
            "todoTag": self.todoTag,
            "todoUniqueId": self.todoUniqueId,
            "todoBody": self.todoBody,
            "todoIsChecked": self.todoIsChecked,
            "todoImage": self.todoImage,
            "todoFile": self.todoFile,
        }