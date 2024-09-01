from django.contrib import admin
from django.contrib.auth.models import User, Group
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from portfolio.models import RequestsLog, Skills, Projects

admin.site.unregister(User)
admin.site.unregister(Group)


class RequestsResource(resources.ModelResource):
    class Meta:
        model = RequestsLog
        exclude = ()


class SkillsResource(resources.ModelResource):
    class Meta:
        model = Skills
        exclude = ()


class ProjectsResource(resources.ModelResource):
    class Meta:
        model = Projects
        exclude = ()


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


@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    resource_class = ProjectsResource

    list_display = ['title', 'description', 'picture_link', 'created_at', 'updated_at']
    list_filter = ['title', 'created_at', 'updated_at']
    search_fields = ['title']
