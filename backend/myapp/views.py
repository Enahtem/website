from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import math

class Project1View(APIView):
    def post(self, request):
        try:
            number = int(request.data.get("number", 0))
            number = math.pow(number, 1/3)
            return Response({"result": number}, status=status.HTTP_200_OK)
        except (ValueError, TypeError):
            return Response({"error": "Invalid Input"}, status=status.HTTP_400_BAD_REQUEST)
