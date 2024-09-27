from django.contrib import admin
from django.contrib.auth.models import User, Group
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from portfolio.models import RequestsLog, Skills, Projects, Contacts

admin.site.unregister(User)
admin.site.unregister(Group)


class RequestsResource(resources.ModelResource):
    class Meta:
        model = RequestsLog
        fields = '__all__'


class SkillsResource(resources.ModelResource):
    class Meta:
        model = Skills
        fields = '__all__'


class ProjectsResource(resources.ModelResource):
    class Meta:
        model = Projects
        fields = '__all__'


class ContactsResource(resources.ModelResource):
    class Meta:
        model = Contacts
        fields = '__all__'


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

    list_display = ['title', 'percent', 'title_color', 'created_at', 'created_at']
    list_filter = ['title', 'percent', 'created_at', 'updated_at']
    search_fields = ['title']
    prepopulated_fields = {'background_color': ('title_color',)}


@admin.register(Projects)
class ProjectsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ProjectsResource

    list_display = ['title', 'description', 'is_active', 'created_at', 'updated_at']
    list_filter = ['title', 'created_at', 'updated_at']
    search_fields = ['title']


@admin.register(Contacts)
class ContactsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ContactsResource

    list_display = ['name', 'email', 'message', 'created_at', 'updated_at']
    list_filter = ['name', 'email', 'message', 'created_at', 'updated_at']
    search_fields = ['name', 'email']
