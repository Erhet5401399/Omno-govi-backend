from rest_framework import serializers
from .models import ReportViolation

class ReportViolationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportViolation
        fields = ['id', 'image', 'description','description2', 'coordinate_x', 'coordinate_y']