
from django.urls import path
from .views import TulburDetailAPIView

urlpatterns = [
    path('api/tulbur/<int:gid>/', TulburDetailAPIView.as_view(), name='tulbur_detail_api'),
]