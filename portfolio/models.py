from django.db import models


class RequestsLog(models.Model):
    ip_address = models.GenericIPAddressField()
    browser = models.CharField(max_length=255, blank=True, null=True)
    os = models.CharField(max_length=255, blank=True, null=True)
    device_type = models.CharField(max_length=255, blank=True, null=True)
    is_mobile = models.BooleanField(default=False)
    is_tablet = models.BooleanField(default=False)
    is_pc = models.BooleanField(default=False)
    referred_to = models.TextField(blank=True, null=True)
    request_time = models.DateTimeField()

    def __str__(self):
        return f"Request from {self.ip_address} on {self.request_time}"
