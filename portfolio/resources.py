from import_export import resources
from portfolio.models import RequestsLog, Skills, Projects, Contacts



class RequestsResource(resources.ModelResource):
    class Meta:
        model = RequestsLog
        fields = (
            'ip_address',
            'browser',
            'os',
            'device_type',
            'is_mobile',
            'is_tablet',
            'is_pc',
            'referred_to',
            'request_time',
            'created_at',
            'updated_at',
        )
        export_order = (
            'ip_address',
            'browser',
            'os',
            'device_type',
            'is_mobile',
            'is_tablet',
            'is_pc',
            'referred_to',
            'request_time',
            'created_at',
            'updated_at',
        )


class SkillsResource(resources.ModelResource):
    class Meta:
        model = Skills
        fields = (
            'title',
            'percent',
            'title_color',
            'background_color',
            'index',
            'created_at',
            'updated_at',
        )
        export_order = (
            'title',
            'percent',
            'title_color',
            'background_color',
            'index',
            'created_at',
            'updated_at',
        )


class ProjectsResource(resources.ModelResource):
    class Meta:
        model = Projects
        fields = (
            'title',
            'description',
            'project_link',
            'picture',
            'is_active',
            'index',
            'created_at',
            'updated_at',
        )
        export_order = (
            'title',
            'description',
            'project_link',
            'picture',
            'is_active',
            'index',
            'created_at',
            'updated_at',
        )


class ContactsResource(resources.ModelResource):
    class Meta:
        model = Contacts
        fields = (
            'name',
            'email',
            'message',
            'created_at',
            'updated_at',
        )
        export_order = (
            'name',
            'email',
            'message',
            'created_at',
            'updated_at',
        )
