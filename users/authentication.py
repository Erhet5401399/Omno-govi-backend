from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import BlacklistedToken

class CustomJWTAuthentication(JWTAuthentication):
    
    def get_validated_token(self, raw_token):
        try:
            token = super().get_validated_token(raw_token)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        # Check if the token is blacklisted
        raw_token_str = raw_token.decode('utf-8') if isinstance(raw_token, bytes) else raw_token
        if BlacklistedToken.objects.filter(token=raw_token_str).exists():
            raise InvalidToken("Token хүчингүй байна")
        
        return token