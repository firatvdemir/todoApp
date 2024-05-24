from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.loginView, name="login"),
    path("logout", views.logoutView, name="logout"),
    path("addItem", views.addItem, name="addItem"),
    path("getUserItems", views.getUserItems, name="getUserItems"),
    path("register", views.register, name="register")
]
