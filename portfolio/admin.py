from django.contrib import admin
from django.contrib.auth.models import User, Group
from import_export.admin import ImportExportModelAdmin

from portfolio.models import RequestsLog, Skills, Projects, Contacts
from portfolio.resources import RequestsResource, SkillsResource, ProjectsResource, ContactsResource

admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(RequestsLog)
class RequestsLogAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = RequestsResource

    list_display = ['ip_address', 'request_time', 'device_type', 'referred_to', 'browser', 'os', 'is_mobile',
                    'is_tablet', 'is_pc']
    list_filter = ['request_time', 'ip_address']
    search_fields = ['device_type', 'ip_address']


@admin.register(Skills)
class SkillsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = SkillsResource

    list_display = ['title', 'percent', 'title_color', 'index', 'created_at', 'created_at']
    list_filter = ['title', 'percent', 'created_at', 'updated_at']
    search_fields = ['title']
    prepopulated_fields = {'background_color': ('title_color',)}
    list_editable = ['index']


@admin.register(Projects)
class ProjectsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProjectsResource

    list_display = ['title', 'description', 'is_active', 'index', 'created_at', 'updated_at']
    list_filter = ['title', 'created_at', 'updated_at']
    search_fields = ['title']
    list_editable = ['index']


@admin.register(Contacts)
class ContactsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ContactsResource

    list_display = ['name', 'email', 'message', 'created_at', 'updated_at']
    list_filter = ['name', 'email', 'message', 'created_at', 'updated_at']
    search_fields = ['name', 'email']
