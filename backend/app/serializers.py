from rest_framework import serializers
from .models import Project, Experience, SkillCategory, Organization, TechStackItem

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class TechStackItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStackItem
        fields = '__all__' 