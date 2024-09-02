from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class RequestsLog(BaseModel):
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

    class Meta:
        verbose_name_plural = "Requests Logs"


class Skills(BaseModel):
    title = models.CharField(max_length=100)
    percent = models.PositiveIntegerField(default=100)
    title_color = models.CharField(max_length=100)
    background_color = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.title_color = self.title_color.lower()
        self.background_color = self.background_color.lower()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.title


class Projects(BaseModel):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=225)
    project_link = models.URLField()
    picture = models.ImageField(upload_to="projects/")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title


class Contacts(BaseModel):
    name = models.TextField()
    email = models.EmailField()
    message = models.TextField()

    class Meta:
        verbose_name_plural = "Contacts"

    def __str__(self):
        return self.name
