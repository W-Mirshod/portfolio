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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request from {self.ip_address} on {self.request_time}"

    class Meta:
        verbose_name_plural = "Requests Logs"
        ordering = ['-created_at']


class Skills(models.Model):
    title = models.CharField(max_length=100)
    percent = models.PositiveIntegerField(default=100)
    title_color = models.CharField(max_length=100)
    background_color = models.CharField(max_length=100)
    index = models.IntegerField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.title_color = self.title_color.lower()
        self.background_color = self.background_color.lower()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Skills"


class Projects(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=225)
    project_link = models.URLField()
    picture = models.URLField()
    is_active = models.BooleanField(default=True)
    index = models.IntegerField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Projects"
        ordering = ['created_at']

    def __str__(self):
        return self.title


class Contacts(models.Model):
    name = models.TextField()
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Contacts"

    def __str__(self):
        return self.name
