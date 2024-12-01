from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import math

class Project1View(APIView):
    def post(self, request):
        # Check if the request contains points or a number
        points = request.data.get("points", [])
        if points:
            # Handle points and calculate average
            try:
                # Calculate average x and y
                avg_x = sum(point['x'] for point in points) / len(points)
                avg_y = sum(point['y'] for point in points) / len(points)
                return Response({"average": {"x": avg_x, "y": avg_y}}, status=status.HTTP_200_OK)
            except (ValueError, TypeError):
                return Response({"error": "Invalid point data. Ensure each point has x and y values."}, status=status.HTTP_400_BAD_REQUEST)

class Project2View(APIView):
    def post(self, request):
        try:
            number = int(request.data.get("number", 0))
            number = math.pow(number, 1/3)
            return Response({"result": number}, status=status.HTTP_200_OK)
        except (ValueError, TypeError):
            return Response({"error": "Invalid Input"}, status=status.HTTP_400_BAD_REQUEST)

class Project3View(APIView):
    def post(self, request):
        try:
            number = int(request.data.get("number", 0))
            number = math.pow(number, 1/3)
            return Response({"result": number}, status=status.HTTP_200_OK)
        except (ValueError, TypeError):
            return Response({"error": "Invalid Input"}, status=status.HTTP_400_BAD_REQUEST)
