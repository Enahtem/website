from django.urls import path
from .views import Project1View

urlpatterns = [
    path('project1/', Project1View.as_view(), name='project-1'),
]
