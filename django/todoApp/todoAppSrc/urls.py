from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.loginView, name="login"),
    path("addItem", views.addItem, name="addItem"),
    path("register", views.register, name="register")
]
