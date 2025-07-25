from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)
    technologies = models.JSONField(default=list)
    url = models.URLField(blank=True)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

class Experience(models.Model):
    period = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    skills = models.JSONField(default=list)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'

class SkillCategory(models.Model):
    title = models.CharField(max_length=100)
    skills = models.JSONField(default=list)

    class Meta:
        verbose_name = 'Skill category'
        verbose_name_plural = 'Skill categorys'

class Organization(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = 'Organization'
        verbose_name_plural = 'Organizations'

class TechStackItem(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Tech stack item'
        verbose_name_plural = 'Tech stack items'
        ordering = ['order']
