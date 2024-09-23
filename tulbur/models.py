from django.db import models

# Create your models here.

class Tulbur(models.Model):
        gid                  = models.CharField(max_length=200, null=True)  
        is_calculated        = models.CharField(max_length=200, null=True)              
        zone_id              = models.CharField(max_length=200, null=True)      
        zone_type            = models.CharField(max_length=200, null=True)          
        zone_no              = models.CharField(max_length=200, null=True)      
        zone_name            = models.CharField(max_length=200, null=True)          
        area                 = models.CharField(max_length=200, null=True)      
        landuse_area         = models.CharField(max_length=200, null=True)              
        zone_area            = models.CharField(max_length=200, null=True)          
        base_fee_id          = models.CharField(max_length=200, null=True)          
        resolution_id        = models.CharField(max_length=200, null=True)              
        confidence_percent   = models.CharField(max_length=200, null=True)                  
        subsidized_area      = models.CharField(max_length=200, null=True)              
        subsidized_fee_rate  = models.CharField(max_length=200, null=True)                  
        base_price_m2        = models.CharField(max_length=200, null=True)              
        base_fee_per_m2      = models.CharField(max_length=200, null=True)              
        landuses             = models.CharField(max_length=200, null=True)          
        value                = models.CharField(max_length=200, null=True)      
        payment              = models.CharField(max_length=200, null=True)      
        sort_num             = models.CharField(max_length=200, null=True)          
        error                = models.CharField(max_length=200, null=True)      