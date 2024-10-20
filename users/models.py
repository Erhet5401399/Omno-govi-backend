from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class BlacklistedToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token for {self.user.username} blacklisted at {self.created_at}"
    

class ReportViolation(models.Model):
    image = models.ImageField(upload_to='uploads/')  
    description = models.TextField() 
    description2 = models.TextField(blank=True) 
    coordinate_x = models.TextField(blank=True) 
    coordinate_y = models.TextField(blank=True) 

    def __str__(self):
        return self.description