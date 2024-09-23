from rest_framework.generics import ListAPIView
from .models import Tulbur
from .serializer import TulburSerializer
from rest_framework.permissions import IsAuthenticated

class TulburDetailAPIView(ListAPIView):
    # queryset = Tulbur.objects.filter(gid=id)
    # serializer_class = TulburSerializer
    # lookup_field = 'gid'  # URL-аас ID-аар хайна
    # permission_classes = [IsAuthenticated]
    serializer_class = TulburSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        gid = self.kwargs.get('gid')
        return Tulbur.objects.filter(gid=gid)

    

