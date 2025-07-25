from django.contrib import admin
from django.contrib.auth.models import Group
from import_export.admin import ImportExportModelAdmin
from .models import Project, Experience, SkillCategory, Organization, TechStackItem

admin.site.unregister(Group)

@admin.register(Project)
class ProjectAdmin(ImportExportModelAdmin):
    list_display = ('title', 'icon', 'url')
    search_fields = ('title', 'description', 'technologies')
    list_filter = ('icon',)

@admin.register(Experience)
class ExperienceAdmin(ImportExportModelAdmin):
    list_display = ('period', 'title', 'company', 'order')
    search_fields = ('title', 'company', 'description', 'skills')
    list_filter = ('company',)

@admin.register(SkillCategory)
class SkillCategoryAdmin(ImportExportModelAdmin):
    list_display = ('title',)
    search_fields = ('title', 'skills')

@admin.register(Organization)
class OrganizationAdmin(ImportExportModelAdmin):
    list_display = ('name', 'link')
    search_fields = ('name', 'description')
    list_filter = ('name',)

@admin.register(TechStackItem)
class TechStackItemAdmin(ImportExportModelAdmin):
    list_display = ('name', 'img')
    search_fields = ('name',)
