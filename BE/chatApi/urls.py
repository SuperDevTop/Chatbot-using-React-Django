from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.ChatbotView_004.as_view(), name='chatbot'),
    path('chat02/', views.ChatbotView_002.as_view(), name='chatbot'),
]
