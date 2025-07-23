from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)
    technologies = models.JSONField(default=list)
    url = models.URLField(blank=True)

class Experience(models.Model):
    period = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    skills = models.JSONField(default=list)

class SkillCategory(models.Model):
    title = models.CharField(max_length=100)
    skills = models.JSONField(default=list)

class Organization(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

class TechStackItem(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()

class TerminalLine(models.Model):
    line = models.CharField(max_length=300)
