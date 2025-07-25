from django.shortcuts import render
from rest_framework import viewsets
from .models import Project, Experience, SkillCategory, Organization, TechStackItem
from .serializers import (
    ProjectSerializer, ExperienceSerializer, SkillCategorySerializer,
    OrganizationSerializer, TechStackItemSerializer
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('order')
    serializer_class = ExperienceSerializer

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class TechStackItemViewSet(viewsets.ModelViewSet):
    queryset = TechStackItem.objects.all()
    serializer_class = TechStackItemSerializer
