from rest_framework import serializers
from .models import Tulbur

class TulburSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tulbur
        fields = '__all__'


        