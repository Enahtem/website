from django.urls import path
from .views import Project1View
from .views import Project2View
from .views import Project3View

urlpatterns = [
    path('project1/', Project1View.as_view(), name='project-1'),
    path('project2/', Project2View.as_view(), name='project-2'),
    path('project3/', Project3View.as_view(), name='project-3'),
]
