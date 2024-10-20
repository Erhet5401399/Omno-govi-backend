from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from rest_framework.exceptions import NotAuthenticated
from .models import BlacklistedToken, ReportViolation
from .authentication import CustomJWTAuthentication
from rest_framework import status
from .serializer import ReportViolationSerializer



class UserAPI(APIView):
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [AllowAny]

    
    def get(self, request):
        user = request.user
        if not request.user.is_authenticated:
            raise NotAuthenticated()
        return Response({
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
        })
    

    def post(self, request):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        
        if (username and password):
            if User.objects.filter(username=username).exists():
                return Response({
                    "error": "Ийм хэрэглэгчийн нэртэй хэрэглэгч байна",
                }, status=401)
            user = User.objects.create(username=username, password=password)
            refresh = RefreshToken.for_user(user)     
            return Response({
                "refresh": str(refresh),
                'access': str(refresh.access_token),
            }, status=201)
        
        return Response({ "status": "false",
            "msg": "Хэрэглэгчийн нэр болон нууц үг 2ланг нь өгөх ёстой"
        }, status=401)
    

    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        access_token = auth_header.split(' ')[1]

        # Blacklist the token
        BlacklistedToken.objects.create(user=request.user, token=access_token)

        return Response({{"status":"true" ,"msg": "Амжилттай системээс гарлаа"}}, status=200)
    
    return Response({"status": "false", "msg": "Токен байхгүй байна"}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_all(request):
    print(request.user)
    user = request.user
    tokens = OutstandingToken.objects.filter(user=user)
    for token in tokens:
        token.blacklist()
    return Response({'message': 'Successfully logged out from all sessions.'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_upload_view(request):
    if request.method == 'POST':
        serializer = ReportViolationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)